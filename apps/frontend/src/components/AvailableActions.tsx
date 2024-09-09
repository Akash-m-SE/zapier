import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { DialogClose } from "./ui/dialog";
import { AvailableAction } from "@repo/zod-schemas";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";

const AvailableActions = () => {
  const nodeId = useNodeId();
  const { updateNodeData }: any = useReactFlow();
  const [actions, setActions] = useState<AvailableAction[]>([]);

  const fetchAvailableActions = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/action/available");

      setActions(res.data.data);
    } catch (error) {
      console.log("Error while fetching the available actions = ", error);
    }
  };

  const setActionData = (action: AvailableAction) => {
    updateNodeData(nodeId as string, {
      actionId: action.id,
      actionName: action.name,
      actionImg: action.image,
    });
  };

  useEffect(() => {
    fetchAvailableActions();
  }, [setActions]);

  return (
    <div className="flex flex-col gap-4">
      {actions.length > 0 ? (
        <>
          {actions.map((action) => (
            <DialogClose asChild key={action.id}>
              <Button
                variant={"link"}
                className="w-full flex items-center justify-start gap-4 border-2 py-6"
                key={action.id}
                onClick={() => setActionData(action)}
              >
                <Image
                  src={action.image}
                  className="w-8 h-8"
                  alt=""
                  height={100}
                  width={100}
                />
                <h1 className="font-bold">{action.name}</h1>
              </Button>
            </DialogClose>
          ))}
        </>
      ) : (
        <h1>No available actions</h1>
      )}
    </div>
  );
};

export default AvailableActions;
