"use client";

import { useRouter } from "next/navigation";
import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { Feature } from "./Feature";

const Hero = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center p-5">
        <h1 className="scroll-m-20 text-4xl text-center font-semibold tracking-tight lg:text-5xl">
          Automate as fast as you can type
        </h1>
      </div>
      <div className="flex justify-center pt-2">
        <div className="text-xl font-normal text-center pt-8 max-w-2xl">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>

      <div
        className="flex flex-col sm:flex-row items-center justify-center p-5 gap-5 w-full"
        id="hero-buttons"
      >
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
          size="big"
        >
          Get Started free
        </PrimaryButton>

        <SecondaryButton onClick={() => {}} size="big">
          Contact Sales
        </SecondaryButton>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center pt-4 gap-3">
        <Feature title={"Free Forever"} subtitle={"for core features"} />
        <Feature title={"More apps"} subtitle={"than any other platforms"} />
        <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
      </div>
    </>
  );
};
export default Hero;
