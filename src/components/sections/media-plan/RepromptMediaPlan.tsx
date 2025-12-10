import { Button, Modal, TextArea } from "@/components/elements";
import { useRepromptMediaPlan } from "@/hooks/mediaHooks";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  note: string;
};

function RepromptMediaPlan({ openModal, setOpenModal, data }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: RepromptPlan } = useRepromptMediaPlan({
    mediaPlanId: data?.mediaPlanId,
  });

  const handleReprompt = handleSubmit((data) => {
    const payload: any = {
      repromptInstructions: data?.note,
    };

    setIsSubmitting(true);
    RepromptPlan(payload, {
      onSuccess: (response) => {
        setIsSubmitting(false);
        toast?.success(response?.data?.message);
        setOpenModal(false);
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
          <h2 className="text-lg font-bold text-red-600">
            Reprompt Media Plan
          </h2>

          <Controller
            control={control}
            name="note"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextArea
                label=""
                placeholder="Enter reprompt instructions"
                error={errors.note && "Give instructions to be effected"}
                {...field}
              />
            )}
          />

          <Button
            className="w-full bg-fuchsia-900 hover:bg-[#59044c] capitalize py-2.5 font-medium text-white"
            text="Reprompt"
            loading={isSubmitting}
            onClick={handleReprompt}
          />
        </div>
      </Modal>
    </>
  );
}

export default RepromptMediaPlan;
