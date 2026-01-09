"use client";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import CartProvider from "./CartProvider";

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CartProvider>
          {children}
        </CartProvider>
      </Provider>
    </SessionProvider>
  );
}