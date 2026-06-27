import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";

const USER_TYPE_LABEL: Record<string, string> = {
  DESIGNER: "디자이너",
  CUSTOMER: "고객",
  OWNER: "원장",
};

export const useDefaultProfile = () => {
  const { data, isLoading, isError } = useGetMyProfileQuery();

  const profile = data
    ? {
        name: data.name,
        role: USER_TYPE_LABEL[data.userType] ?? data.userType,
        reservationCount: data.reservationCount,
        treatmentRecordCount: data.treatmentRecordCount,
        savedStyleCount: data.savedStyleCount,
      }
    : undefined;

  return { data: profile, isLoading, isError };
};
