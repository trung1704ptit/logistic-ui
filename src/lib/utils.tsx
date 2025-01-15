import { AxiosError } from "axios";
import { toast } from "sonner";
import dayjs from "dayjs";
import { SHORT_KEYS } from "@/constants";
import { pick } from "lodash";

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
  console.log(data, keyInput);
  if (data && keyInput) {
    // Parse the weight key input
    const weight = parseFloat(keyInput.replace(SHORT_KEYS.ton, ""));

    // Iterate through the data to find the matching range
    for (const range of Object.keys(data)) {
      const [min, max] = range
        .split("-")
        .map((str) => parseFloat(str.replace(SHORT_KEYS.ton, "")));
      if (weight >= min && weight <= max) {
        return data[range]; // Return the price for the matching range
      }
    }
  }

  return 0;
}

export function getTotalOrder(data: any) {
  if (data) {
    console.log(data);
    return (
      (data.trip_salary ?? 0) +
      (data.daily_salary ?? 0) +
      (data.point_salary ?? 0) +
      (data.recovery_fee ?? 0) +
      (data.loading_fee ?? 0) +
      (data.meal_fee ?? 0) +
      (data.standby_fee ?? 0) +
      (data.parking_fee ?? 0) +
      (data.outside_oil_fee ?? 0)
    );
  }
  return 0;
}