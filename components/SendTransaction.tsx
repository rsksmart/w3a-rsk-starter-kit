"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import RPC from "@/app/viemRPC";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { web3auth } from "@/app/page";
import { useToast } from "@/hooks/use-toast";
import Button from "./ui/Button";

const formSchema = z
  .object({
    token: z.string().min(1, { message: "Please select a token" }),
    tokenAddress: z.string().optional(),
    amount: z.string().refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than zero",
    }),
    recipient: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Recipient must be a valid 0x address"),
  })
  .superRefine((data, ctx) => {
    if (
      data.token === "custom" &&
      (!data.tokenAddress || data.tokenAddress === "")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["tokenAddress"],
        message: "Token address is required for custom tokens",
      });
    }
  });

export function SendTransaction() {
  const { toast } = useToast();
  const [showTokenAddress, setShowTokenAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      tokenAddress: "",
      amount: "",
      recipient: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!web3auth.provider) return;

    setLoading(true);

    try {
      const response = await RPC.sendTransaction(
        web3auth.provider,
        values.amount,
        values.recipient as `0x${string}`,
        values.token as "doc" | "trif" | "usdrif" | "trbtc" | "custom",
        values.tokenAddress as `0x${string}`
      );
      toast({
        title: "Transaction Successful",
        description: "Tokens sent successfully",
        action: (
          <Button
            onClick={() => {
              window.open(
                `https://explorer.testnet.rootstock.io/tx/${response}`,
                "_blank"
              );
            }}
          >
            View on explorer
          </Button>
        ),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="rounded-2xl border border-white w-full py-4 px-6 flex flex-col gap-8 items-start"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <header className="space-y-3">
          <h1 className="*:bg-[#E57F2C] text-black flex flex-col text-2xl *:px-1 gap-1 font-semibold">
            <span className="w-fit">Send a</span>
            <span className="w-fit">transaction</span>
          </h1>
          <p>Send tokens in Rootstock using Web3Auth</p>
        </header>
        <div className="grid md:grid-cols-2 w-full gap-x-5 gap-y-2">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setShowTokenAddress(value === "custom");
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trbtc">tRBTC</SelectItem>
                    <SelectItem value="trif">tRIF</SelectItem>
                    <SelectItem value="usdrif">USDRIF</SelectItem>
                    <SelectItem value="doc">DoC</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {showTokenAddress && (
            <FormField
              control={form.control}
              name="tokenAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x183...a32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0.231" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="0x183...a32" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? "Sending..." : "Send Transaction"}
        </Button>
      </form>
    </Form>
  );
}
