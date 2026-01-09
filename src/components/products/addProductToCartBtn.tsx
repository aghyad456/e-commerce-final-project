"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { updateNumOfCartItems } from "@/redux/cartSlice";
import { AppDispatch } from "@/redux/store";

type AddToCartBtnProps = {
  productId: string;
  className?: string;
};

export default function AddToCartBtn({ productId, className }: AddToCartBtnProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const token = session?.user?.token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
      });
      const data = await res.json();

      if (data.status === "success") {
        dispatch(updateNumOfCartItems(data.numOfCartItems));
        toast.success(data.message, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to add product", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Network error", {
        position: "top-center",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading}
      className={`cursor-pointer transition-transform active:scale-95 ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}