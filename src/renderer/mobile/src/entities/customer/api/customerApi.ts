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
    const searchParams = new URLSearchParams();
    searchParams.set("shop_id", String(params.shopId));
    searchParams.set("phone_number", params.phoneNumber);
    searchParams.set("treatment_date", params.treatmentDate);
    searchParams.set("price", String(params.price));
    if (params.title) searchParams.set("title", params.title);
    if (params.memo) searchParams.set("memo", params.memo);
    params.serviceTags?.forEach(tag => searchParams.append("service_tags", tag));

    const formData = new FormData();
    if (params.beforeImage) formData.append("before_image", params.beforeImage);
    if (params.afterImage) formData.append("after_image", params.afterImage);

    const result = await api.post<ApiResponse<unknown>>(
      `/treatment-records/register?${searchParams.toString()}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return result.data;
  },
};
