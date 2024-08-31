import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { type SolanaSelector, solanaSelectorSchema } from "@repo/zod-schemas";
import { Input } from "./Input";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { z } from "zod";
import { SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";

const SolanaSelector = () => {
  const nodeId = useNodeId();
  const { updateNodeData }: any = useReactFlow();

  const form = useForm<SolanaSelector>({
    resolver: zodResolver(solanaSelectorSchema),
    defaultValues: {
      address: "",
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof solanaSelectorSchema>) {
    updateNodeData(nodeId as string, {
      metadata: JSON.stringify(values),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
        </div>
        <SheetClose asChild>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
};

export default SolanaSelector;
