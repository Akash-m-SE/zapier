"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { otpFormSchema } from "@repo/zod-schemas";

const OtpVerification = () => {
  const params = useParams();
  const userId = params.userId;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof otpFormSchema>) {
    const parsedOtp: number = parseInt(data.otp, 10);

    try {
      setLoading(true);
      const res = await axiosInstance.post(`/api/v1/user/verify/${userId}`, {
        otp: parsedOtp,
      });

      toast({
        description: res.data.message,
        className: "bg-green-400 font-semibold",
      });

      form.reset();
      router.push("/dashboard");
    } catch (error) {
      console.log("Error while verifying the user = ", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Otp does not match!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  const resendOtpHandler = async () => {
    try {
      setLoading(true);
      form.reset();
      const res = await axiosInstance.post(`api/v1/user/re-generate-otp`);

      toast({
        description: res.data.message,
        className: "bg-blue-400 font-semibold",
      });
    } catch (error) {
      console.log("Error while resending the otp = ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-[90vw] sm:w-[60vw] md:w-[60vw] lg:w-[30vw] xl:w-[30vw] space-y-6 h-[70vh]"
        >
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl mb-5">
            Verify your email
          </h1>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-md">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-sm font-semibold justify-evenly">
                  Please enter the one-time password sent to your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between w-[90vw] sm:w-[50vw] md:w-[53vw] lg:w-[30vw] xl:w-[22.5vw]">
            <Button disabled={loading} type="submit">
              Submit
            </Button>
            <Button
              type="button"
              disabled={loading}
              className="bg-blue-600"
              onClick={() => resendOtpHandler()}
            >
              Resend Otp
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OtpVerification;
