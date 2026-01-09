"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoadingSpinner } from "@/components/shared/LouadingSpinner2";

const schema = z.object({
  newPassword: z.string().min(6, "Must be at least 6 characters"),
});

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "" }
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        newPassword: values.newPassword
      }),
    }).then(r => r.json());

    if (res.token) {
      router.push("/auth/login");
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto max-w-md py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold uppercase italic tracking-tighter">New Password</h1>
        <p className="text-zinc-500 text-sm mt-2">Set your new password for {email}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-[11px] font-bold tracking-widest text-zinc-500">New Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} className="rounded-xl h-12" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full h-12 rounded-xl bg-black font-bold uppercase tracking-widest text-xs" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="sm" /> : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}