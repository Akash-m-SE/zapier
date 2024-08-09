"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import LinkButton from "@/components/buttons/LinkButton";
import { BACKEND_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const clickHandler = async () => {
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      email,
      password,
    });

    console.log("Response from backend = ", res);

    const token = res.data.data.token;
    localStorage.setItem("token", token);
    router.push("/dashboard");
  };

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

            <LinkButton
              onClick={() => {
                router.push("/enterprise");
              }}
              className="text-base font-semibold text-white bg-blue-800 w-full sm:w-[30vw] md:w-[30vw] lg:w-[20vw] h-[44px] flex justify-center items-center hover:bg-blue-600 duration-500"
            >
              Explore Zapier Enterprise
            </LinkButton>
          </div>

          <div
            className="flex flex-col justify-center w-auto sm:w-[40vw] md:w-[40vw] lg:w-[30vw] p-1"
            id="login-right-content"
          >
            <h2 className="text-center font-bold text-2xl">
              Log into your account
            </h2>
            <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label={"Email"}
                type="text"
                placeholder="Your Email"
              ></Input>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label={"Password"}
                type="password"
                placeholder="Password"
              ></Input>
              <div className="pt-4">
                <PrimaryButton onClick={() => clickHandler()} size="big">
                  Login
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
