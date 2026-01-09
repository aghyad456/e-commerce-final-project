"use client";
import { updateNumOfCartItems } from "@/redux/cartSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data } = useSession();

  useEffect(() => {
    async function getLoggedUserCart() {
      if (!data?.user.token) return;

      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { token: data.user.token },
        });
        const response = await res.json();
        
        dispatch(updateNumOfCartItems(response?.numOfCartItems || 0));
      } catch (error) {
        console.error("Cart fetch error:", error);
      }
    }

    getLoggedUserCart();
  }, [data, dispatch]); 

  return <>{children}</>;
}