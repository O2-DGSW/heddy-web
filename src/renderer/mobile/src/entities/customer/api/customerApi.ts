import { api } from "@/shared/api";
import type { ApiResponse } from "@heddy/api";
import type { TreatmentRecord } from "@/entities/qr/model/qr.types";

export const customerApi = {
  getMyTreatmentRecords: async () => {
    const result = await api.get<ApiResponse<TreatmentRecord[]>>("/my/treatment-records");
    return result.data.data;
  },
};
