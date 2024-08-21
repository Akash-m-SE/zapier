"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import { Button } from "./ui/button";
import LinkButton from "./buttons/LinkButton";

const MobileNavbar = ({
  router,
  logoutHandler,
}: {
  router: ReturnType<typeof useRouter>;
  logoutHandler: () => void;
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 p-5"
      id="sheet-navbar-links"
    >
      <LinkButton
        className="w-full h-full text-center font-medium bg-slate-200"
        onClick={() => {}}
      >
        Contact Sales
      </LinkButton>

      <Button
        className="h-10 w-full font-medium"
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>

      <PrimaryButton
        className="h-10 w-full font-medium"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Signup
      </PrimaryButton>

      <Button
        className="h-10 w-full font-medium"
        variant="destructive"
        onClick={() => logoutHandler()}
      >
        Logout
      </Button>
    </div>
  );
};

export default MobileNavbar;
