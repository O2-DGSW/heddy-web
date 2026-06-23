import { api } from "@/shared/api";
import type { IssueQrResponse, VerifyQrResponse } from "@/entities/qr/model/qr.types";

type QrApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: { code: string; message: string } | null;
};

export const issueQr = async (): Promise<IssueQrResponse> => {
  const res = await api.post<QrApiResponse<IssueQrResponse>>("/qr/issue");
  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "QR 코드를 발급받지 못했습니다.");
  }
  return res.data.data;
};

export const verifyQr = async (qrToken: string): Promise<VerifyQrResponse> => {
  const res = await api.post<QrApiResponse<VerifyQrResponse>>("/qr/verify", { qr_token: qrToken });
  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "QR 코드를 확인하지 못했습니다.");
  }
  return res.data.data;
};
