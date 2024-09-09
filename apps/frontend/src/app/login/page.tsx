"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import useStore from "@/store";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninSchema } from "@repo/zod-schemas";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signinForm = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const updateUserDetails = useStore((state) => state.updateUserDetails);

  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    try {
      setLoading(true);
      const { email, password } = values;
      const res = await axiosInstance.post(`/api/v1/user/signin`, {
        email,
        password,
      });
      signinForm.reset();
      const userId = res.data.data.userId;
      const accessToken = res.data.data.accessToken;
      updateUserDetails(userId, accessToken);

      if (res.data.data.verify === false) {
        router.push(`/verify/${userId}`);
      } else {
        router.push("/dashboard");
        toast({
          description: res.data.message,
          className: "bg-green-400 font-semibold",
        });
      }
    } catch (error: any) {
      console.log("Error while signing in = ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex justify-center h-[60vh]">
        <div
          className="flex flex-col sm:flex-row md:flex-row pt-8 max-w-8xl m-5 gap-5"
          id="login-container"
        >
          <div
            className="flex flex-col pt-20 px-4 w-auto sm:w-[40vw] md:w-[40vw] lg:w-[30vw] gap-3"
            id="login-left-content"
          >
            <h2 className="font-semibold text-3xl pb-4">
              Automate across your teams
            </h2>

            <h3 className="text-lg mb-2">
              Zapier Enterprise empowers everyone in your business to securely
              automate their work in minutes, not months—no coding required.
            </h3>

            <Button
              onClick={() => {
                router.push("/enterprise");
              }}
              className="text-base font-semibold text-white bg-blue-800 w-full sm:w-[30vw] md:w-[30vw] lg:w-[20vw] h-[44px] flex justify-center items-center hover:bg-blue-600 duration-500"
            >
              Explore Zapier Enterprise
            </Button>
          </div>

          <div
            className="flex flex-col justify-center w-auto sm:w-[40vw] md:w-[40vw] lg:w-[30vw] p-1"
            id="login-right-content"
          >
            <Form {...signinForm}>
              <form
                onSubmit={signinForm.handleSubmit(onSubmit)}
                className="space-y-8 flex-1 pt-6 pb-6 mt-12 px-4 border rounded"
              >
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
                  Log into your account
                </h2>
                <FormField
                  control={signinForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signinForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PrimaryButton type="submit" size="big" className="min-w-full">
                  Login
                </PrimaryButton>
                <Link
                  href={"/forgot-password"}
                  className="flex justify-end font-semibold text-blue-500 underline hover:text-black duration-500"
                >
                  Forgot Password?
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
