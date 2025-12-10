import { Button, Modal, TextArea } from "@/components/elements";
import { useInvalidateMedia } from "@/hooks/invalidateHooks";
import { useRejectMediaPlan } from "@/hooks/mediaHooks";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  note: string;
};

function RejectMediaPlan({ openModal, setOpenModal, data }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { RefetchMediaPlan } = useInvalidateMedia();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: RejectPlan } = useRejectMediaPlan({
    mediaPlanId: data?.mediaPlanId,
  });

  const handleReject = handleSubmit((data) => {
    const payload: any = {
      rejectionReason: data?.note,
    };
    setIsSubmitting(true);
    RejectPlan(payload, {
      onSuccess: (response) => {
        setIsSubmitting(false);
        toast?.success(response?.data?.message);
        setOpenModal(false);
        RefetchMediaPlan();
      },
      onError: (error: any) => {
        setIsSubmitting(false);
        toast.error(error?.response?.data?.message);
      },
    });
  });

  return (
    <>
      <Modal
        open={openModal}
        openModal={() => setOpenModal(false)}
        backgroundColor="bg-white"
      >
        <div className="flex sm:w-96 flex-col gap-5 p-3">
          <h2 className="text-lg font-bold text-red-600">Reject Media Plan</h2>

          <Controller
            control={control}
            name="note"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextArea
                label=""
                placeholder="Enter the rejection reason"
                error={errors.note && "Give reason for rejetcion"}
                {...field}
              />
            )}
          />

          <Button
            className="w-full bg-fuchsia-900 hover:bg-[#59044c] capitalize py-2.5 font-medium text-white"
            text="Reject Plan"
            loading={isSubmitting}
            onClick={handleReject}
          />
        </div>
      </Modal>
    </>
  );
}
export default RejectMediaPlan;
