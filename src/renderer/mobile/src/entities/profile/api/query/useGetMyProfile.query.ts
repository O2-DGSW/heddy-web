import { useQuery } from "@tanstack/react-query";
import { myProfileInfoApi } from "@/entities/profile/api/myProfileInfoApi.ts";

export const useGetMyProfileQuery = () => {
  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: () => {
      return myProfileInfoApi.getMyProfileInfo();
    },
  });

  return { data, isError, isFetching, isLoading };
};
