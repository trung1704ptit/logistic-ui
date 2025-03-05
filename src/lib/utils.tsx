import { AxiosError } from "axios";
import { toast } from "sonner";
import { DAYJS_DATE_FORMAT, TIME_FORMAT, UNIT_TYPES } from "@/constants";
import { IOrder } from "@/interfaces/order";
import * as XLSX from "xlsx";
import http from "./http";
import { apiRoutes } from "@/routes/api";
import dayjs from "dayjs";
import moment from "moment";

export enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
}

export const setPageTitle = (title: string) => {
  window.document.title = title;
};

export const showNotification = (
  message = "Something went wrong",
  type: NotificationType = NotificationType.ERROR,
  description?: string
) => {
  toast[type](message, {
    description: description,
  });
};

export const handleErrorResponse = (
  error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  callback?: () => void,
  errorMessage?: string
) => {
  console.error(error);

  if (!errorMessage) {
    errorMessage = "Something went wrong";

    if (typeof error === "string") {
      try {
        error = JSON.parse(error);
      } catch (error) {
        // do nothing
      }
    }

    if (error instanceof AxiosError && error?.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }
  }

  showNotification(
    errorMessage &&
      errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1),
    NotificationType.ERROR
  );

  if (callback) {
    return callback();
  }
};

// Function to normalize and remove diacritics
export const removeVietnameseTones = (str: string): string => {
  // Normalize the string and remove diacritics
  return str
    .normalize("NFD") // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics using regex
};

export const searchByLabel = (input: string, option: any) => {
  if (option && option.children) {
    return `${option.children}`.toLowerCase().includes(input.toLowerCase());
  }
  return false;
};

export const removeKeysInPrice = () => {
  const list = [
    "Ghi chú",
    "Huyện trả hàng",
    "Huyện đóng hàng",
    "STT",
    "Tỉnh trả hàng",
    "Tỉnh đóng hàng",
  ];
};

export function findPrice(data: any, keyInput: string) {
  if (data && keyInput) {
    const lastChar = keyInput.slice(-1);

    const value = parseFloat(keyInput.replace(lastChar, ""));

    // Iterate through the data to find the matching range
    for (const range of Object.keys(data)) {
      if (range.includes(lastChar)) {
        const [min, max] = range
          .split("-")
          .map((str) => parseFloat(str.replace(lastChar, "")));
        if (value >= min && value <= max) {
          return data[range]; // Return the price for the matching range
        }
      }
    }
  }

  return 0;
}

export function getTotalOrder(data: IOrder) {
  if (data) {
    return (
      data.price_for_contractor +
      data.trip_salary +
      data.daily_salary +
      data.point_salary +
      data.loading_salary +
      data.recovery_fee +
      data.other_salary +
      data.meal_fee +
      data.standby_fee +
      data.parking_fee +
      data.outside_oil_fee
    );
  }
  return 0;
}

export function getUnitLabel(unit: string) {
  if (!unit) return "";
  if (unit === UNIT_TYPES.trip) {
    return "Theo chuyến";
  } else if (unit === UNIT_TYPES.weight) {
    return "Theo tấn";
  } else {
    return "Theo khối";
  }
}

// Utility function to parse Excel file locally
export const parseExcelFile = (file: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });
        if (wb.SheetNames.length === 0) {
          reject(new Error("No sheets found in the Excel file"));
          return;
        }
        const firstSheetName = wb.SheetNames[0];
        const ws = wb.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const normalizeText = (text: string) => {
  return text.normalize("NFC").trim().toLowerCase();
};

export const findSheetByName = (
  workbook: Record<string, any[]>,
  targetName: string
) => {
  return Object.keys(workbook).find(
    (sheetName) => normalizeText(sheetName) === normalizeText(targetName)
  );
};

export const parseExcelFileMultipleSheets = (
  file: any
): Promise<Record<string, any[]>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });

        // Ensure we return an object with all sheets mapped correctly
        const sheetsData: Record<string, any[]> = {};
        wb.SheetNames.forEach((sheetName) => {
          sheetsData[sheetName] = XLSX.utils.sheet_to_json(
            wb.Sheets[sheetName]
          );
        });

        resolve(sheetsData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

function cleanKeys(data: any) {
  if (!data) return data;
  return data.map((obj: any) => {
    let newObj: any = {};
    Object.keys(obj).forEach((key) => {
      newObj[key.trim()] = obj[key];
    });
    return newObj;
  });
}

const excelDateToJSDate = (serial: number): Date => {
  const excelEpoch = new Date(1900, 0, 1); // Excel's epoch: January 1, 1900
  return new Date(excelEpoch.getTime() + (serial - 2) * 86400000); // Convert to JS Date
};

// Hàm chuẩn hóa ngày tháng về định dạng "DD/MM/YYYY"
const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Hàm xử lý đầu vào ngày tháng (chuỗi ngày hoặc số Excel)
const processDate = (dateStr: any): string => {
  let date: Date;

  // Kiểm tra nếu dateStr là số Excel hợp lệ (serial number)
  if (!isNaN(dateStr) && dateStr !== "") {
    date = excelDateToJSDate(parseInt(dateStr, 10)); // Chuyển đổi số serial thành JS Date
  } else {
    const dateParts = dateStr.split("/");

    // Thêm số không nếu ngày hoặc tháng có một chữ số
    if (dateParts.length === 3) {
      const day = dateParts[0].padStart(2, "0");
      const month = dateParts[1].padStart(2, "0");
      const year = dateParts[2];

      date = new Date(`${year}-${month}-${day}`); // Chuyển đổi thành đối tượng Date
    } else {
      return "Invalid date";
    }
  }

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDate(date);
};

export const extractDateVal = (dateStr: any, defaultVal: any = "") => {
  if (!dateStr) return defaultVal;

  if (dateStr) {
    dateStr = processDate(dateStr?.toString());

    return dateStr
      ? dayjs(dateStr, DAYJS_DATE_FORMAT).format(TIME_FORMAT)
      : null;
  }
};

export const handleUploadDriverAndTruck = async (
  file: File,
  contractorId: string
) => {
  try {
    const workbook = await parseExcelFileMultipleSheets(file);

    // Extract sheets correctly
    const driverSheet = findSheetByName(workbook, "Tài xế");
    const truckSheet = findSheetByName(workbook, "Xe tải");

    const driverData = cleanKeys(driverSheet ? workbook[driverSheet] : []);
    const truckData = cleanKeys(truckSheet ? workbook[truckSheet] : []);

    try {
      // Collect all the promises for driver and truck POST requests
      const driverPromises = driverData.map(async (payload: any) => {
        return await http.post(apiRoutes.drivers, {
          full_name: payload["Họ và tên"] ? payload["Họ và tên"] : "",
          phone: payload["Số điện thoại"]?.toString() || "",
          cccd: payload["Số căn cước"]?.toString() || "",
          issue_date: extractDateVal(payload["Ngày cấp"], null),
          date_of_birth: extractDateVal(payload["Ngày sinh"], null),
          address: payload["Quê quán"] || "",
          license_number: payload["Số bằng lái"]?.toString() || "",
          license_expiry: extractDateVal(payload["Ngày hết hạn"], null),
          fixed_salary: payload["Lương cứng"] || 0,
          note: payload["Ghi chú"] || "",
          contractor_id: contractorId,
        });
      });

      const truckPromises = truckData.map(async (payload: any) => {
        return await http.post(apiRoutes.trucks, {
          license_plate: payload["Biển kiểm soát"] || "",
          capacity: payload["Trọng tải xe"] || 0.0,
          volumn: payload["Mét khối"] || 0.0,
          length: payload["Dài"] || 0.0,
          width: payload["Rộng"] || 0.0,
          height: payload["Cao"] || 0.0,
          brand: payload["Thương hiệu xe"] || "",
          note: payload["Ghi chú"] || "",
          contractor_id: contractorId,
        });
      });

      // Combine both promises into a single array
      const allPromises = [...driverPromises, ...truckPromises];

      // Wait for all promises to settle (either resolve or reject)
      const results = await Promise.allSettled(allPromises);

      // Optionally handle the results for success/failure of each request
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`Request ${index + 1} succeeded:`, result.value);
        } else {
          console.error(`Request ${index + 1} failed:`, result.reason);
        }
      });

      // After all requests are processed, reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error while processing requests:", error);
    }
  } catch (error) {
    console.error("Error parsing file:", error);
    // setLoading(false);
    throw error;
  }
};
