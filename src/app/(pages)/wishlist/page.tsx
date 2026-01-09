"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { getWishlist } from "@/redux/wishlistSlice";
import { Product, WishlistResponse } from "@/interfaces";
import { ProductCard } from "@/components";

export default function WishlistPage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]>([]);
  const { items } = useSelector((state: RootState) => state.wishlist);
  const token = session?.user?.token;

  useEffect(() => {
    if (token) {
      const fetchWish = async () => {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: { "token": token }
        });
        const data: WishlistResponse = await res.json();
        setProducts(data.data);
      };
      fetchWish();
    }
  }, [token, items]);

  useEffect(() => {
    if (token) dispatch(getWishlist(token));
  }, [token, dispatch]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">My Wishlist</h1>
        <p className="text-zinc-500 text-sm">You have {items.length} items saved</p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
          <p className="text-zinc-400 font-medium">No products found in your wishlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}