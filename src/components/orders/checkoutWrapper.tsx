"use client";
import { AddressResponse } from "@/interfaces";
import { useState } from "react";
import { Button } from "../ui/button";
import { CreditCard, Banknote } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CheckoutWrapper({ response, cartId }: { response: AddressResponse; cartId: string }) {
  const [ineerResponse] = useState<AddressResponse>(response);
  const [selectedAddressIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  async function handleOrder(type: 'visa' | 'cash') {
    if (!session?.user?.token || ineerResponse.data.length === 0) return;
    setIsLoading(true);
    
    const addr = ineerResponse.data[selectedAddressIndex];
    const url = type === 'visa' 
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { 
        token: session.user.token, 
        "content-type": "application/json" 
      },
      body: JSON.stringify({ 
        shippingAddress: { 
          details: addr.details, 
          phone: addr.phone, 
          city: addr.city 
        } 
      }),
    }).then((res) => res.json());

    if (res.status === "success") {
      window.location.href = type === 'visa' ? res.session.url : "/allorders";
    }
    setIsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-12 bg-white">
      <h1 className="text-4xl font-bold mb-12 tracking-tight text-zinc-900">Checkout</h1>
      <div className="space-y-8">
        <div className="p-8 border border-zinc-100 rounded-[32px] bg-zinc-50/50">
           <p className="text-zinc-500 font-medium">Select your shipping destination to complete the order.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            disabled={isLoading} 
            onClick={() => handleOrder('visa')} 
            className="h-20 rounded-2xl bg-zinc-900 text-white font-bold hover:bg-black transition-all flex items-center justify-center gap-3"
          >
            <CreditCard className="w-6 h-6" /> Online Payment
          </Button>
          <Button 
            disabled={isLoading} 
            onClick={() => handleOrder('cash')} 
            className="h-20 rounded-2xl bg-white border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
          >
            <Banknote className="w-6 h-6" /> Cash on Delivery
          </Button>
        </div>
      </div>
    </div>
  );
}