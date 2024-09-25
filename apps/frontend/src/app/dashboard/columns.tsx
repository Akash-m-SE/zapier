"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HOOKS_URL } from "../config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "@/types/types";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStore from "@/store";

interface DeleteZapButtonProps {
  zapId: string;
}

const DeleteZapButton: React.FC<DeleteZapButtonProps> = ({ zapId }) => {
  const [loading, setLoading] = useState(false);

  const deleteZapFromStore = useStore((state) => state.deleteZap);

  const deleteZap = async (zapId: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/api/v1/zap/${zapId}`);

      deleteZapFromStore(zapId);
      toast({
        description: res.data.message,
        className: "bg-green-400 font-semibold",
      });
    } catch (error) {
      console.log("Error while deleting the zap = ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete project.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuItem disabled={loading} onClick={() => deleteZap(zapId)}>
          Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Zap>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          Trigger and Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const triggerImageUrl = row.original?.trigger?.type?.image;
      const actionsImageUrl = row.original.actions.map(
        (action: any) => action.type.image,
      );

      const imagesUrl = [triggerImageUrl, ...actionsImageUrl];

      return (
        <div className="flex flex-col sm:flex-row md:flex-row items-center justify-center gap-2 p-2">
          {imagesUrl.map((imageUrl: string, index: number) => (
            <Image
              src={imageUrl}
              alt="image"
              key={index}
              height={25}
              width={25}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="flex items-center justify-center">Zap Id</div>;
    },
    cell: ({ row }) => {
      const zapId = row.original.id;
      return <div className="text-justify">{zapId}</div>;
    },
  },
  {
    accessorKey: "webhookurl",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">Webhook Url</div>
      );
    },
    cell: ({ row }) => {
      const zapId = row.original.id;
      const userId = row.original.userId;
      // const webhookurl = `${HOOKS_URL}/hooks/catch/1/${zapId}`;
      const webhookurl = `${HOOKS_URL}/hooks/catch/${userId}/${zapId}`;

      const handleCopyWebhookUrl = async () => {
        try {
          await navigator.clipboard.writeText(webhookurl);
          toast({
            description: "Webhook URL copied to clipboard!",
            className: "bg-green-400 font-semibold",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Failed to copy.",
            description: "Unable to copy webhook URL to clipboard.",
          });
        }
      };

      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="cursor-pointer underline"
                  onClick={handleCopyWebhookUrl}
                >
                  {webhookurl}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  Copy WebhookUrl
                </h4>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(createdAt));

      return <div className="text-start">{formattedDate}</div>;
    },
  },
  // {
  //   accessorKey: "view",
  //   header: ({ column }) => {
  //     return <div className="flex items-center justify-center">View</div>;
  //   },
  //   cell: ({ row }) => {
  //     const redirectLink = row.original.id;
  //     return (
  //       <div className="flex items-center justify-center">
  //         <Button>
  //           <Link href={`/zap/${redirectLink}`}>View Zap</Link>
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div className="font-bold flex items-center justify-center">
          Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const zapId = row.original.id;

      return (
        <div className="flex items-center justify-center">
          <DeleteZapButton zapId={zapId} />
        </div>
      );
    },
  },
];
