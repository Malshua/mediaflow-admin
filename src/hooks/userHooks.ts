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
  const endpoint = `${process.env.BASE_URL}/api/admin/users?page=${
    page_no || 1
  }&limit=${limit || 40}${searchText ? `&search=${searchText}` : ""}${
    status ? `&status=${status}` : ""
  }`;
  const query = useQuery({
    queryKey: ["users", page_no, status],
    queryFn: () => serverRequest(token).get(endpoint),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return query;
};

export const useGetSingleUser = ({
  user_id,
}: {
  user_id: string | string[] | undefined;
}) => {
  const { token } = useAuth();

  const endpoint = `${process.env.BASE_URL}/api/admin/users/${user_id}`;
  const query = useQuery({
    queryKey: ["single-user"],
    queryFn: () => serverRequest(token).get(endpoint),
    enabled: !!user_id,
  });

  return query;
};
