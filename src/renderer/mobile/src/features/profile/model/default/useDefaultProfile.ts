import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";

const USER_TYPE_LABEL: Record<string, string> = {
  DESIGNER: "디자이너",
  CUSTOMER: "고객",
  OWNER: "원장",
};

export const useDefaultProfile = () => {
  const { data, isLoading, isError } = useGetMyProfileQuery();

  const profile = {
    name: data?.name ?? "",
    role: data ? USER_TYPE_LABEL[data.userType] ?? data.userType : "",
    reservationCount: data?.reservationCount ?? 0,
    treatmentRecordCount: data?.treatmentRecordCount ?? 0,
    savedStyleCount: data?.savedStyleCount ?? 0,
  };

  return { data: profile, isLoading, isError };
};
