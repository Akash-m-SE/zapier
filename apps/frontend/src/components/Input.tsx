"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        {label && (
          <div className="text-sm pb-1 pt-2">
            <label htmlFor={label}>{label}</label>
          </div>
        )}
        <input
          ref={ref}
          className="border rounded px-4 py-2 w-full border-black"
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
