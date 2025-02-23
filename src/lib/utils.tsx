import { AxiosError } from "axios";
import { toast } from "sonner";
import { UNIT_TYPES } from "@/constants";
import { IOrder } from "@/interfaces/order";
import * as XLSX from "xlsx";
import http from "./http";
import { apiRoutes } from "@/routes/api";
import dayjs from "dayjs";

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
        const ws = wb.Sheets[wb.SheetNames[0]];
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

export const findSheetByName = (workbook: Record<string, any[]>, targetName: string) => {
  return Object.keys(workbook).find(
    (sheetName) => normalizeText(sheetName) === normalizeText(targetName)
  );
};


export const parseExcelFileMultipleSheets = (file: any): Promise<Record<string, any[]>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });

        // Ensure we return an object with all sheets mapped correctly
        const sheetsData: Record<string, any[]> = {};
        wb.SheetNames.forEach((sheetName) => {
          sheetsData[sheetName] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
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


export const handleUploadDriverAndTruck = async (file: File, contractorId: string) => {
  try {
    const workbook = await parseExcelFileMultipleSheets(file);

    // Extract sheets correctly
    const driverSheet = findSheetByName(workbook, "Tài xế");
    const truckSheet = findSheetByName(workbook, "Xe tải");

    const driverData = driverSheet ? workbook[driverSheet] : [];
    const truckData = truckSheet ? workbook[truckSheet] : [];

    // setLoading(true);
    driverData.forEach(async (payload) => {
      await http.post(apiRoutes.drivers, {
        full_name: payload["Họ và tên"] || "",
        phone: payload["Số điện thoại"].toString() || "",
        cccd: payload["Số căn cước"] || "",
        issue_date: payload["Ngày cấp"]
          ? dayjs(payload["Ngày cấp"], "DD-MM-YYYY").format(
              "YYYY-MM-DDT00:00:00+07:00"
            )
          : "",
        date_of_birth: payload["Ngày sinh"]
          ? dayjs(payload["Ngày sinh"], "DD-MM-YYYY").format(
              "YYYY-MM-DDT00:00:00+07:00"
            )
          : "",
        address: payload["Quê quán"] || "",
        license_number: payload["Số bằng lái"].toString(),
        license_expiry: payload["Ngày hết hạn"]
          ? dayjs(payload["Ngày hết hạn"], "DD-MM-YYYY").format(
              "YYYY-MM-DDT00:00:00+07:00"
            )
          : "",
        fixed_salary: payload["Lương cứng"] || 0,
        note: payload["Ghi chú"] || "",
        contractor_id: contractorId,
      });
    });

    truckData.forEach(async (payload) => {
      await http.post(apiRoutes.trucks, {
        license_plate: payload["Biển kiểm soát"] || "",
        capacity: payload["Trọng tải xe"] || 0,
        volumn: payload["Mét khối"] || 0,
        length: payload["Dài"] || 0,
        width: payload["Rộng"] || 0,
        height: payload["Cao"] || 0,
        brand: payload["Thương hiệu xe"] || "",
        note: payload["Ghi chú"] || "",
        contractor_id: contractorId,
      });
    });
    setTimeout(() => {
      // setLoading(false);
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Error parsing file:", error);
    // setLoading(false);
    throw error;
  }
};