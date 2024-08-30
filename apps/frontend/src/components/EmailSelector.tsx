import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { type EmailSelector, emailSelectorSchema } from "@repo/zod-schemas";

import { Button } from "./ui/button";
import { SheetClose } from "./ui/sheet";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Input } from "./Input";
import { z } from "zod";

const EmailSelector = () => {
  const nodeId = useNodeId();
  const { updateNodeData }: any = useReactFlow();

  const form = useForm<EmailSelector>({
    resolver: zodResolver(emailSelectorSchema),
    defaultValues: {
      email: "",
      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof emailSelectorSchema>) {
    updateNodeData(nodeId as string, {
      metadata: JSON.stringify(values),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="body"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
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

export default EmailSelector;
