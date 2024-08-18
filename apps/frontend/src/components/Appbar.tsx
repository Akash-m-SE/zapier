"use client";

import { useRouter } from "next/navigation";
import React from "react";
import LinkButton from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";
import Image from "next/image";
import useStore from "@/store";
import axiosInstance from "@/utils/axiosInstance";

const Appbar = () => {
  const router = useRouter();

  const deleteUserDetails = useStore((state) => state.deleteUserDetails);

  const logoutHandler = async () => {
    try {
      await axiosInstance.post(`/api/v1/user/signout`);
      deleteUserDetails(); //deleting the access token and userId from the store

      router.push("/login");
    } catch (error) {
      console.log("Error while logging out = ", error);
    }
  };

  return (
    <div className="flex border-b justify-between p-4">
      <div className="flex flex-col justify-center text-2xl font-extrabold">
        <Image
          src="/zapier-logo_black.png"
          height={100}
          width={100}
          alt="logo"
          style={{ width: "auto", height: "auto" }}
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        <div className="pr-4">
          <LinkButton
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </LinkButton>
        </div>
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </PrimaryButton>
        <button onClick={() => logoutHandler()}>Logout</button>
      </div>
    </div>
  );
};
export default Appbar;
