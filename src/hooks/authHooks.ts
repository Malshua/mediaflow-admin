import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuthActions";
import {
  serverRequest,
  serverRequestFormData,
} from "@/utilities/serverRequest";

// login
export const useLogin = () => {
  const endpoint = `${process.env.BASE_URL}/api/login`;
  const mutation = useMutation({
    mutationFn: (data) => serverRequest().post(endpoint, data),
  });

  return mutation;
};
