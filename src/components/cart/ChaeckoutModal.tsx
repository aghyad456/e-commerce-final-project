"use client"
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartId: string;
  token: string;
};

export default function CheckoutModal({ isOpen, onClose, cartId, token }: CheckoutModalProps) {
  const [shippingAddress, setShippingAddress] = useState({
    details: "",
    phone: "",
    city: ""
  })

  if (!isOpen) return null;

  async function handleOnlinePayment() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress })
    }).then(res => res.json())

    if (res.status === "success") {
      window.location.href = res.session.url
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[32px] p-10 relative shadow-2xl">
        <Button onClick={onClose} variant="ghost" className="absolute right-6 top-6 text-zinc-400 hover:text-black transition-colors p-0">
          <X size={24} />
        </Button>
        <h2 className="text-2xl font-bold mb-1">Add Address</h2>
        <p className="text-sm text-zinc-500 mb-8">Enter details for Online Card Payment.</p>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-400 ml-1">City :</label>
            <Input className="rounded-xl h-12 border-zinc-200 focus-visible:ring-black" placeholder="Damascus" onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-400 ml-1">Details :</label>
            <Input className="rounded-xl h-12 border-zinc-200 focus-visible:ring-black" placeholder="Street..." onChange={(e) => setShippingAddress({...shippingAddress, details: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-400 ml-1">Phone :</label>
            <Input className="rounded-xl h-12 border-zinc-200 focus-visible:ring-black" placeholder="09xxxxxxxx" onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 rounded-xl h-12" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 rounded-xl h-12 bg-black text-white font-bold" onClick={handleOnlinePayment}>Go to Pay</Button>
          </div>
        </div>
      </div>
    </div>
  )
}