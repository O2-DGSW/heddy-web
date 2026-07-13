import { api } from "@/shared/api";

type ApiError = { code: string; message: string } | null;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: ApiError;
};

export type RegisterTreatmentRecordRequest = {
  shopId: number;
  phoneNumber: string;
  treatmentDate: string;
  price: number;
  title?: string;
  serviceTags?: string[];
  memo?: string;
  beforeImage?: File | null;
  afterImage?: File | null;
};

export type RegisterTreatmentRecordResponse = {
  record_id: number;
  customer_id: number;
  title?: string;
  service_tags?: string[];
  treatment_date: string;
  created_at: string;
  next_visit_date?: string;
  price: number;
};

export const registerTreatmentRecord = async ({
  shopId,
  phoneNumber,
  treatmentDate,
  price,
  title,
  serviceTags,
  memo,
  beforeImage,
  afterImage,
}: RegisterTreatmentRecordRequest) => {
  const formData = new FormData();

  if (beforeImage) {
    formData.append("before_image", beforeImage);
  }

  if (afterImage) {
    formData.append("after_image", afterImage);
  }

  const res = await api.post<ApiResponse<RegisterTreatmentRecordResponse>>(
    "/treatment-records/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        shop_id: shopId,
        phone_number: phoneNumber,
        title,
        treatment_date: treatmentDate,
        service_tags: serviceTags,
        memo,
        price,
      },
      paramsSerializer: {
        indexes: null,
      },
    }
  );

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "시술 기록을 등록하지 못했습니다."
    );
  }

  return res.data.data;
};
