"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared/LouadingSpinner2";

export default function VerifyCodePage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  async function handleVerify() {
    if (!code) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode: code }),
      });

      const data = await res.json();

      if (data.status === "Success") {
        router.push(`/auth/resetpassword?email=${email}`);
      } else {
        setError(data.message || "Invalid or expired code");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-20 px-4 text-center">
      <div className="space-y-4 mb-10">
        <h1 className="text-3xl font-bold uppercase italic tracking-tighter">Verify Code</h1>
        <p className="text-zinc-500 text-sm">Enter the 6-digit code sent to your email</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <Input 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Enter Code" 
          className="h-16 text-center text-2xl tracking-[0.5em] font-black rounded-2xl border-zinc-100 focus:border-black transition-all"
        />

        <Button 
          onClick={handleVerify} 
          className="w-full h-14 rounded-2xl bg-black font-bold uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all"
          disabled={isLoading || !code}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : "Verify Code"}
        </Button>
      </div>
    </div>
  );
}