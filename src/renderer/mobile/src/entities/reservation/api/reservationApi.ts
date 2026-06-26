import { api, type ApiResponse } from "@heddy/api";

export const reservationApi = {
  postReservaition: async () => {
    const result = await api.post<ApiResponse<>>();
  },
};
