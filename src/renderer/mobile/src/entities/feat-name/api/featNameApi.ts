import { api, ApiResponse } from '@/shared/api'

import type { FeatNameResponse } from '../model/featName.types'

export const featNameApi = {
  getFeatName: async () => {
    const result = await api.get<ApiResponse<FeatNameResponse>>('/user/name')
    return result.data
  },
}
