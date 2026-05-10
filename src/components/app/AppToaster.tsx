"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      closeButton
      duration={3600}
      gap={10}
      mobileOffset={16}
      position="top-center"
      richColors={false}
      toastOptions={{
        classNames: {
          closeButton: "!bg-[#121214] !border-[#29292E] !text-[#C4C4CC]",
          description: "!text-[#C4C4CC]",
          error: "!border-[#F75A68]/70 !bg-[#24191B] !text-white",
          success: "!border-[#00B37E]/70 !bg-[#13231E] !text-white",
          toast: "!rounded-xl !border !border-[#29292E] !bg-[#202024] !text-white !shadow-2xl !shadow-black/40",
          title: "!font-black",
        },
      }}
    />
  );
}
