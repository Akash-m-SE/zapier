import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AvailableTriggers from "../AvailableTriggers";

type Trigger = Node<
  { triggerId: string; triggerName: string; triggerImg: string },
  "trigger"
>;

const TriggerNode = ({ data }: NodeProps<Trigger>) => {
  return (
    <>
      <div className="w-[326px] p-2.5 border-2 border-dashed border-secondary rounded-md bg-white h-[90px]">
        <div className="flex flex-col gap-4">
          <Dialog>
            <DialogTrigger asChild>
              {data.triggerId.length === 0 ? (
                <Button variant={"secondary"} className="w-min">
                  Trigger
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={data.triggerImg}
                    className="w-6 h-6"
                    alt="image"
                    height={100}
                    width={100}
                  />
                  <Label className="text-base font-bold">
                    {data.triggerName}
                  </Label>
                </div>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Available Triggers</DialogTitle>
                <DialogDescription>
                  Choose a trigger to get started
                </DialogDescription>
              </DialogHeader>
              <AvailableTriggers />
            </DialogContent>
          </Dialog>
          {data.triggerName === "Webhook" && (
            <span className="font-medium">Catch Webhook</span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default TriggerNode;
