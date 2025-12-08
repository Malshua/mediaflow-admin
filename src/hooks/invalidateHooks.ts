import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateMedia = () => {
  const queryClient = useQueryClient();

  const RefetchMediaPlan = () => {
    queryClient.invalidateQueries({ queryKey: ["media-plans"] });
  };

  return { RefetchMediaPlan };
};
