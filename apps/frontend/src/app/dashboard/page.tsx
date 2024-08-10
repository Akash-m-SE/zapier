"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import DarkButton from "@/components/buttons/DarkButton";
import LinkButton from "@/components/buttons/LinkButton";
import Image from "next/image";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

const useZaps = () => {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  const fetchZaps = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/zap`, {
        withCredentials: true,
      });

      setZaps(res.data.zaps);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching zaps = ", error);
    }
  };

  useEffect(() => {
    fetchZaps();
  }, []);

  return {
    loading,
    zaps,
  };
};

const Dashboard = () => {
  const { loading, zaps } = useZaps();
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg	 w-full">
          <div className="flex justify-between pr-8 ">
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
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
};

const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
  const router = useRouter();

  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">ID</div>
        <div className="flex-1">Created at</div>
        <div className="flex-1">Webhook URL</div>
        <div className="flex-1">Go</div>
      </div>
      {zaps.map((z) => (
        <div className="flex border-b border-t py-4" key={z.id}>
          <div className="flex-1 flex">
            <Image
              src={z.trigger.type.image}
              width={100}
              height={100}
              className="w-[30px] h-[30px]"
              alt="image"
            />
            {z.actions.map((x) => (
              <Image
                src={x.type.image}
                className="w-[30px] h-[30px]"
                width={100}
                height={100}
                alt="image"
                key={x.id}
              />
            ))}
          </div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Nov 13, 2023</div>
          <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
          <div className="flex-1">
            <LinkButton
              onClick={() => {
                router.push("/zap/" + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
