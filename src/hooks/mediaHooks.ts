import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuthActions";
import {
  serverRequest,
  serverRequestFormData,
} from "@/utilities/serverRequest";

export const useApproveMediaPlan = ({
  mediaPlanId,
}: {
  mediaPlanId: string | string[] | undefined;
}) => {
  const { token } = useAuth();
  const endpoint = `${process.env.BASE_URL}/api/admin/media-plans/${mediaPlanId}/approve`;
  const mutation = useMutation({
    mutationFn: (data) => serverRequest(token).post(endpoint, data),
  });

  return mutation;
};

export const useRejectMediaPlan = ({
  mediaPlanId,
}: {
  mediaPlanId: string | string[] | undefined;
}) => {
  const { token } = useAuth();
  const endpoint = `${process.env.BASE_URL}/api/admin/media-plans/${mediaPlanId}/reject`;
  const mutation = useMutation({
    mutationFn: (data) => serverRequest(token).post(endpoint, data),
  });

  return mutation;
};

export const useRepromptMediaPlan = ({
  mediaPlanId,
}: {
  mediaPlanId: string | string[] | undefined;
}) => {
  const { token } = useAuth();
  const endpoint = `${process.env.BASE_URL}/api/admin/media-plans/${mediaPlanId}/reprompt`;
  const mutation = useMutation({
    mutationFn: (data) => serverRequest(token).post(endpoint, data),
  });

  return mutation;
};

export const useGetMediaPlans = ({
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
  const endpoint = `${process.env.BASE_URL}/api/admin/media-plans?page=${
    page_no || 1
  }&limit=${limit || 40}${searchText ? `&search=${searchText}` : ""}${
    status ? `&status=${status}` : ""
  }`;
  const query = useQuery({
    queryKey: ["media-plans", page_no, status],
    queryFn: () => serverRequest(token).get(endpoint),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return query;
};
