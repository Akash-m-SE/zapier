"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LinkButton from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";
import Image from "next/image";
import useStore from "@/store";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "./ui/button";
import Hamburger from "hamburger-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileNavbar from "./MobileAppbar";

const Appbar = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const deleteUserDetails = useStore((state) => state.deleteUserDetails);

  const logoutHandler = async () => {
    try {
      await axiosInstance.post(`/api/v1/user/signout`);
      deleteUserDetails(); //deleting the access token and userId from the store
    } catch (error) {
      // console.log("Error while logging out = ", error);
    } finally {
      deleteUserDetails();
      router.push("/login");
    }
  };

  return (
    <div className="flex border-b justify-between p-4">
      <div
        className="flex flex-col justify-center text-2xl font-extrabold"
        id="navbar-logo"
      >
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

      <div
        className="hidden sm:flex md:flex items-center justify-center gap-3"
        id="navbar-links"
      >
        <LinkButton className="w-full h-auto text-center" onClick={() => {}}>
          Contact Sales
        </LinkButton>

        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>

        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </PrimaryButton>
        <Button variant="destructive" onClick={() => logoutHandler()}>
          Logout
        </Button>
      </div>

      <div
        className="flex sm:hidden md:hidden items-center justify-center"
        id="mobile-navbar"
      >
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu Bar</SheetTitle>
              <SheetDescription>Where do you want to go?</SheetDescription>
              <MobileNavbar router={router} logoutHandler={logoutHandler} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default Appbar;
