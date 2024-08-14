"use client";

import axios from "axios";
import { useState } from "react";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axiosInstance from "@/utils/axiosInstance";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <Input
              label={"Name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            ></Input>
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
              <PrimaryButton
                onClick={async () => {
                  const res = await axiosInstance.post(`/api/v1/user/signup`, {
                    email,
                    password,
                    name,
                  });

                  router.push("/login");
                }}
                size="big"
                className="h-10 rounded-lg"
              >
                Get started free
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
