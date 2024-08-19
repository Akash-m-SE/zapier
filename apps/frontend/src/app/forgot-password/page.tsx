"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/Input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import {
  emailFormSchema,
  otpFormSchema,
  passwordFormSchema,
} from "@repo/zod-schemas";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitEmailForm = (values: z.infer<typeof emailFormSchema>) => {
    try {
      // TODO:- send a post axios request to generate otp for resetting password
      // const res = await axiosInstance.post()
      // toast({
      //   description: res.data.message,
      //   className: "bg-green-400 font-semibold",
      // });
      console.log("values = ", values);
    } catch (error) {
      console.log("Error while sending the otp = ", error);
    }
  };

  const onSubmitOtpForm = async (data: z.infer<typeof otpFormSchema>) => {
    const parsedOtp: number = parseInt(data.pin, 10);

    try {
      setLoading(true);
      // const res = await axiosInstance.post(`/api/v1/user/verify/${userId}`, {
      //   otp: parsedOtp,
      // });

      // toast({
      //   description: res.data.message,
      //   className: "bg-green-400 font-semibold",
      // });

      otpForm.reset();

      // Todo:- after verification redirect to login page
      // router.push("/dashboard");
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
  };

  const onSubmitPasswordForm = async (
    data: z.infer<typeof passwordFormSchema>,
  ) => {
    try {
      // Todo: reset the password
    } catch (error) {
      console.log("Error while verifying the password = ", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Failed to update Password!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const resendOtpHandler = async () => {
    try {
      setLoading(true);
      otpForm.reset();
      // TODO: make and regenerate otp for resetting the password
      // const res = await axiosInstance.post(`api/v1/user/re-generate-otp`);

      // toast({
      //   description: res.data.message,
      //   className: "bg-blue-400 font-semibold",
      // });
    } catch (error) {
      console.log("Error while resending the otp = ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`${emailVerified ? "hidden" : "flex"} flex-col items-center justify-center p-2 h-auto xl:h-[80vh] w-auto`}
        id="email-otp-form"
      >
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl mt-5">
          Reset Your Password
        </h1>
        <Form {...emailForm}>
          <form
            id="form"
            onSubmit={emailForm.handleSubmit(onSubmitEmailForm)}
            className="w-[95vw] sm:w-[60vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] gap-3 p-2 m-5"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Email" placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription className="text-sm font-semibold justify-evenly">
                    Enter the registered email address where you want your otp
                    to reset the password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </form>
        </Form>

        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onSubmitOtpForm)}
            className="flex flex-col items-center justify-center w-[95vw] sm:w-[60vw] md:w-[60vw] lg:w-[30vw] xl:w-[30vw] space-y-6 h-auto p-2"
          >
            <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
              Verify your OTP
            </h2>
            <FormField
              control={otpForm.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
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
                    Please enter the one-time password sent to your email
                    address.
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
      <div
        className={`${!emailVerified ? "hidden" : "flex"} flex-col items-center justify-center h-auto xl:h-[70vh] w-auto mt-5`}
        id="password-confirm-form"
      >
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Reset your password
        </h2>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmitPasswordForm)}
            className="space-y-8 p-5 w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[60vw] xl:w-[30vw]"
          >
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" label="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your new password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm password"
                      label="confirm-password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Confirm your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
