import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuthActions";
import {
  serverRequest,
  serverRequestFormData,
} from "@/utilities/serverRequest";

export const useGetUsers = ({
  status,
  page_no,
  limit,
  searchText,
}: {
  page_no?: number;
  limit?: number;
  searchText?: string;
  status?: string;
}) => {
  const { token } = useAuth();
  const endpoint = `${process.env.BASE_URL}/api/admin/users?page_no=${
    page_no || 1
  }&no_of_requests=${limit || 40}${searchText ? `&search=${searchText}` : ""}${
    status ? `&status=${status}` : ""
  }`;
  const query = useQuery({
    queryKey: ["users", page_no, status],
    queryFn: () => serverRequest(token).get(endpoint),
  });

  return query;
};
