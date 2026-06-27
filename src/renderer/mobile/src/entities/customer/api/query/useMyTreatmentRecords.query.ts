import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/entities/customer/api/customerApi";

export const useMyTreatmentRecordsQuery = () => {
  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["myTreatmentRecords"],
    queryFn: () => customerApi.getMyTreatmentRecords(),
  });

  return { data, isError, isFetching, isLoading };
};
