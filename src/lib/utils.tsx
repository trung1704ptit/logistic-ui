import { AxiosError } from "axios";
import { toast } from "sonner";
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
