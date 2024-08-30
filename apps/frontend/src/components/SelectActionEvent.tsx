import { useNodeId, useNodes, useNodesData } from "@xyflow/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

import { Action } from "./React-Flow/ActionNode";
import EmailSelector from "./EmailSelector";
import SolanaSelector from "./SolanaSelector";

const SelectActionEvent = () => {
  const nodeId = useNodeId();
  const actionNode = useNodesData<Action>(nodeId as string);

  return (
    <Sheet>
      <SheetTrigger disabled={!actionNode?.data.actionId}>
        {actionNode?.data?.metadata.length === 0 ? (
          <Button
            variant={"ghost"}
            className="w-full justify-start text-destructive text-center"
          >
            Select the event to perform
          </Button>
        ) : (
          <Label className="text-base">Event configured</Label>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select the event details</SheetTitle>
          <SheetDescription>
            Provide the specific details of the event
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {actionNode?.data.actionName === "Send Email" ? (
            <EmailSelector />
          ) : (
            <SolanaSelector />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SelectActionEvent;
