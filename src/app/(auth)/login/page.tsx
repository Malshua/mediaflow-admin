"use client";

import { Routes } from "@/utilities/routes";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { media_logo } from "../../../../public/images";
import { Button, Input } from "@/components/elements";
import { useLogin } from "@/hooks/authHooks";
import { useAuthActions } from "@/hooks/useAuthActions";

interface LoginTypes {
  email: string;
  password: string;
}

const Page = () => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: loginUser } = useLogin();
  const { login } = useAuthActions();
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>();

  const handleLogin = handleSubmit((data) => {
    const payload: any = {
      email: data?.email,
      password: data?.password,
    };

    setIsSubmitting(true);
    loginUser(payload, {
      onSuccess: (response) => {
        setIsSubmitting(false);
        const token = response.data.data?.token;
        const user = response.data.data?.userDetails;
        const details: any = token ? jwtDecode(token) : {};

        const login_data = {
          token: response.data.data?.token,
          user: {
            id: details?.id,
            email: details?.email,
            role: user?.role,
          },
          isAuthenticated: true,
        };

        login(login_data);
        push(Routes?.DASHBOARD);
      },

      onError: (error: any) => {
        setIsSubmitting(false);
        toast.error(error?.response?.data?.message);
      },
    });
  });

  return (
    <>
      <section className="h-full flex items-center justify-center ">
        <div className="w-11/12">
          <div className="text-center">
            <div className={`flex items-center justify-center `}>
              <Image src={media_logo} alt="logo" height={100} width={100} />
            </div>
            <p className="text-gray-800 text-sm md:text-base font-medium mt-1">
              AI-Powered Campaign Management
            </p>
          </div>
          <h2 className="md:text-xl text-[#A1238E] font-bold text-center mt-5">
            Admin Account
          </h2>

          <div className="mt-5 flex flex-col gap-6">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  label="Email"
                  type="email"
                  placeholder="email address..."
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />

            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    label="Password"
                    type={show ? "text" : "password"}
                    placeholder="Enter your password here"
                    error={errors.password?.message}
                    right_icon={
                      show ? (
                        <BsEyeSlashFill onClick={() => setShow(!show)} />
                      ) : (
                        <BsEyeFill onClick={() => setShow(!show)} />
                      )
                    }
                    {...field}
                  />
                )}
              />
              {/* <Link
                href={Routes.FORGOT_PASSWORD}
                className="text-sm ml-auto justify-self-end hover:underline font-medium text-[#A1238E] hover:text-[#59044c] cursor-default"
              >
                Forgot password?
              </Link> */}
            </div>

            <Button
              className="w-full bg-[#A1238E] hover:bg-[#59044c] capitalize py-2.5 font-medium text-white"
              loading={isSubmitting}
              onClick={handleLogin}
              text="Login"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
