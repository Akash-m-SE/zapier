import { TrashIcon } from "@radix-ui/react-icons";

import {
  Handle,
  Node,
  NodeProps,
  Position,
  useNodeId,
  useReactFlow,
} from "@xyflow/react";
import { Label } from "../ui/label";
import SelectActionEvent from "../SelectActionEvent";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import AvailableActions from "../AvailableActions";

export type Action = Node<
  { actionId: string; actionName: string; actionImg: string; metadata: string },
  "action"
>;

const ActionNode = ({ data }: NodeProps<Action>) => {
  const [clicked, setClicked] = useState<number>(0);
  const nodeId = useNodeId();
  const { setNodes, setEdges, getNodes } = useReactFlow();

  const nodes = getNodes();
  const deleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setClicked((prev) => prev + 1);
  };

  const adjustEdges = () => {
    setEdges((prevEdges) => {
      const index = prevEdges.findIndex(
        (edge) => edge.target === nodeId?.toString(),
      );
      if (index === prevEdges.length - 1) {
        prevEdges.splice(index, 1);
        return prevEdges;
      } else {
        prevEdges[index].target = prevEdges[index + 1].source;
        prevEdges[index + 1].source = prevEdges[index - 1].target;
        prevEdges.splice(index, 1);
        return prevEdges;
      }
    });
  };

  useEffect(() => {
    if (clicked !== 0) {
      adjustEdges();
    }
  }, [clicked]);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="w-[326px] p-2.5 border-black border border-secondary rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  {data.actionId.length === 0 ? (
                    <Button variant={"secondary"}>Action</Button>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <Image
                        src={data.actionImg}
                        className="w-6 h-6"
                        alt="image"
                        height={100}
                        width={100}
                      />
                      <Label className="text-base font-bold">
                        {data.actionName}
                      </Label>
                    </div>
                  )}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Available Actions</DialogTitle>
                    <DialogDescription>
                      Choose an action for your trigger
                    </DialogDescription>
                  </DialogHeader>
                  <AvailableActions />
                </DialogContent>
              </Dialog>
              {nodes.length > 2 && (
                <TrashIcon
                  className="h-5 w-5 cursor-pointer text-destructive"
                  onClick={deleteNode}
                />
              )}
            </div>
            <SelectActionEvent />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ActionNode;
