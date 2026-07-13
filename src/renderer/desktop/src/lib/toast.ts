import { toast, type ToastOptions } from "react-toastify";

const ERROR_TOAST_ID = "desktop-error-toast";
const SUCCESS_TOAST_ID = "desktop-success-toast";
const DUPLICATE_TOAST_WINDOW_MS = 2500;

let recentErrorMessage = "";
let recentErrorShownAt = 0;

const TOAST_HANDLED_KEY = "__desktopToastHandled";

const baseToastOptions: ToastOptions = {
  autoClose: 4000,
  closeOnClick: true,
  draggable: false,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
};

type ShowToastOptions = ToastOptions & {
  toastId?: string;
};

export const markErrorToastHandled = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    (error as Record<string, boolean>)[TOAST_HANDLED_KEY] = true;
  }
};

export const isErrorToastHandled = (error: unknown) => {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as Record<string, boolean>)[TOAST_HANDLED_KEY] === true
  );
};

export const showErrorToast = (message: string, options: ShowToastOptions = {}) => {
  const normalizedMessage = message.trim() || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  const now = Date.now();
  const toastId = options.toastId ?? ERROR_TOAST_ID;

  if (
    normalizedMessage === recentErrorMessage &&
    now - recentErrorShownAt < DUPLICATE_TOAST_WINDOW_MS
  ) {
    return;
  }

  recentErrorMessage = normalizedMessage;
  recentErrorShownAt = now;

  if (toast.isActive(toastId)) {
    toast.update(toastId, {
      ...baseToastOptions,
      ...options,
      render: normalizedMessage,
      type: "error",
    });
    return;
  }

  toast.error(normalizedMessage, {
    ...baseToastOptions,
    ...options,
    toastId,
  });
};

export const showErrorToastFromError = (
  error: unknown,
  fallbackMessage: string,
  options: ShowToastOptions = {}
) => {
  if (isErrorToastHandled(error)) {
    return;
  }

  const message = error instanceof Error && error.message.trim() ? error.message : fallbackMessage;

  showErrorToast(message, options);
};

export const showSuccessToast = (message: string, options: ShowToastOptions = {}) => {
  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    return;
  }

  toast.success(normalizedMessage, {
    ...baseToastOptions,
    ...options,
    toastId: options.toastId ?? SUCCESS_TOAST_ID,
  });
};
