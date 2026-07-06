import { api } from "@/shared/api";
import type { ApiResponse } from "@heddy/api";
import type { TreatmentRecord } from "@/entities/qr/model/qr.types";

export interface RegisterTreatmentRecordParams {
  shopId: number;
  phoneNumber: string;
  title?: string;
  treatmentDate: string;
  serviceTags?: string[];
  memo?: string;
  price: number;
  beforeImage?: File | null;
  afterImage?: File | null;
}

export const customerApi = {
  getMyTreatmentRecords: async () => {
    const result = await api.get<ApiResponse<TreatmentRecord[]>>("/my/treatment-records");
    return result.data.data;
  },

  registerTreatmentRecord: async (params: RegisterTreatmentRecordParams) => {
    const formData = new FormData();
    formData.append("shop_id", String(params.shopId));
    formData.append("phone_number", params.phoneNumber);
    formData.append("treatment_date", params.treatmentDate);
    formData.append("price", String(params.price));
    if (params.title) formData.append("title", params.title);
    if (params.memo) formData.append("memo", params.memo);
    params.serviceTags?.forEach(tag => formData.append("service_tags", tag));
    if (params.beforeImage) formData.append("before_image", params.beforeImage);
    if (params.afterImage) formData.append("after_image", params.afterImage);

    const result = await api.post<ApiResponse<unknown>>(
      "/treatment-records/register",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return result.data;
  },
};
