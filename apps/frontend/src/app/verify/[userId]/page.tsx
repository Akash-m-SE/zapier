"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

const OtpVerification = () => {
  const params = useParams();
  const userId = params.userId;
  const router = useRouter();
  const [otp, setOtp] = useState<any>(); //TODO: typecast

  const verifyHandler = async () => {
    try {
      await axiosInstance.post(`/api/v1/user/verify/${userId}`, {
        otp: otp,
      });

      router.push("/dashboard");
    } catch (error) {
      console.log("Error while verifying the user = ", error);
    }
  };

  return <div>OtpVerification TODOS: implement otp input</div>;
};

export default OtpVerification;
