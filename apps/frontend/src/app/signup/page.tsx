"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupSchema } from "@repo/zod-schemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/Input";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signupForm = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    try {
      setLoading(true);
      const { email, password, name } = values;

      const res = await axiosInstance.post(`/api/v1/user/signup`, {
        email,
        password,
        name,
      });

      signupForm.reset();
      router.push("/login");
      toast({
        description: res.data.message,
        className: "bg-green-400 font-semibold",
      });
    } catch (error: any) {
      console.log("Error while creating the user = ", error);
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
    <div>
      <div className="flex justify-center p-10">
        <div
          className="flex flex-col sm:flex-row pt-8 max-w-4xl gap-5"
          id="signup-container"
        >
          <div className="flex-1 pt-20 px-4" id="signup-left-content">
            <div className="font-semibold text-3xl pb-4">
              Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label={"Easy setup, no coding required"} />
            </div>
            <div className="pb-6">
              <CheckFeature label={"Free forever for core features"} />
            </div>
            <CheckFeature label={"14-day trial of premium features & apps"} />
          </div>

          <div
            className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded"
            id="signup-right-content"
          >
            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={signupForm.control}
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
                  control={signupForm.control}
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
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PrimaryButton
                  size="big"
                  type="submit"
                  className="h-15 min-w-full"
                >
                  Submit
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
    </div>
  );
};

export default Signup;
