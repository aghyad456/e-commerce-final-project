"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoadingSpinner } from "@/components/shared/LouadingSpinner2";

const schema = z.object({ 
  email: z.string().email("Invalid email address") 
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.statusMsg === "success") {
        router.push(`/auth/verifycode?email=${values.email}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold uppercase italic tracking-tighter">Reset Password</h1>
        <p className="text-zinc-500 text-sm mt-2">Enter your email to receive a reset code</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-[11px] font-bold tracking-widest text-zinc-500">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} className="rounded-xl h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 rounded-xl bg-black font-bold uppercase tracking-widest text-xs" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="sm" /> : "Send Reset Code"}
          </Button>
        </form>
      </Form>
    </div>
  );
}