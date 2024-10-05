"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { Zap } from "@/types/types";
import DarkButton from "@/components/buttons/DarkButton";
import { useRouter } from "next/navigation";
import useStore from "@/store";

const Dashboard = () => {
  // const { loading, zaps } = useZaps();
  // const [zaps, setZaps] = useState<Zap[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const zaps = useStore((state) => state.zaps);

  const fetchZaps = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/v1/zap`);

      useStore.setState({ zaps: res.data.data });
      // console.log("zaps = ", useStore.getState().zaps);
    } catch (error) {
      console.log("Error while fetching zaps = ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Something went wrong while fetching zaps.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZaps();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-screen-lg	 w-full">
          <div className="flex justify-between p-10">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={zaps} />
      </div>
    </>
  );
};

export default Dashboard;
