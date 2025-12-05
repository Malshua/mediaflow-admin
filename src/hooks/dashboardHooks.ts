import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuthActions";
import {
  serverRequest,
  serverRequestFormData,
} from "@/utilities/serverRequest";

export const useGetDashboard = () => {
  const { token } = useAuth();

  const endpoint = `${process.env.BASE_URL}/api/admin/dashboard/stats`;
  const query = useQuery({
    queryKey: ["dash-stats"],
    queryFn: () => serverRequest(token).get(endpoint),
  });

  return query;
};
