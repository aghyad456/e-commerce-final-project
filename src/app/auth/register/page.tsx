"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rePassword: z.string(),
  phone: z.string().min(10, "Invalid phone number"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-112.5 py-10 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold italic uppercase tracking-tighter">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join ShopMart today</p>
        </div>
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md text-center">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[10px] font-bold text-zinc-500">Full Name</FormLabel>
                  <FormControl><Input placeholder="Aghyad Al.." {...field} className="rounded-xl h-11" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[10px] font-bold text-zinc-500">Email</FormLabel>
                  <FormControl><Input placeholder="name@example.com" {...field} className="rounded-xl h-11" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[10px] font-bold text-zinc-500">Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••" {...field} className="rounded-xl h-11" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[10px] font-bold text-zinc-500">Confirm</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••" {...field} className="rounded-xl h-11" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[10px] font-bold text-zinc-500">Phone</FormLabel>
                  <FormControl><Input placeholder="0123456789" {...field} className="rounded-xl h-11" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-black font-bold uppercase tracking-widest text-xs mt-4"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : "Register"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-bold underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}