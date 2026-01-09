"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared/LouadingSpinner2";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push("/products");
      router.refresh();
    }
  }

  return (
    <div className="container mx-auto max-w-112.5 py-20 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold italic uppercase tracking-tighter">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Enter your details to sign in</p>
        </div>
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md text-center">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[11px] font-bold tracking-widest text-zinc-500">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <div className="flex justify-end">
                  <Link 
                    href="/auth/forgotpassword" 
                    className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-black font-bold uppercase tracking-widest text-xs"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-black font-bold underline underline-offset-4">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}