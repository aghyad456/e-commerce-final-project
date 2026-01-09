"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces";
import { formatPrice, renderStars, cn } from "@/lib/utils";
import AddToCartBtn from "./addProductToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/redux/wishlistSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";

export function ProductCard({ product, viewMode = "grid" }: { product: Product; viewMode?: "grid" | "list" }) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.wishlist);
  const isFav = items.includes(product._id);
  const token = session?.user?.token;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) return;
    dispatch(toggleWishlist({ productId: product._id, token, isExist: isFav }));
  };

  const heartBtnContent = (
    <Button 
      onClick={handleWishlist}
      variant="ghost" 
      size="icon" 
      className={cn(
        "transition-all duration-300",
        isFav ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-zinc-300 hover:text-red-500 hover:bg-red-50",
        viewMode === "grid" && "absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/80"
      )}
    >
      <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
    </Button>
  );

  if (viewMode === "list") {
    return (
      <div className="group flex gap-6 p-4 border border-zinc-100 rounded-[24px] hover:border-zinc-300 hover:shadow-md transition-all bg-white items-center">
        <div className="relative w-40 h-40 shrink-0 overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100">
          <Link href={`/products/${product._id}`}>
            <Image src={product.imageCover} alt={product.title} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" sizes="160px" />
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-between min-w-0 h-40 py-2">
          <div>
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                  <Link href={`/brands/${product.brand._id}`} className="hover:text-black transition-colors">{product.brand.name}</Link>
                </p>
                <h3 className="font-bold text-lg truncate pr-4 text-zinc-900">
                  <Link href={`/products/${product._id}`}>{product.title}</Link>
                </h3>
              </div>
              {heartBtnContent}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">{renderStars(product.ratingsAverage)}</div>
              <span className="text-xs font-medium text-zinc-400">({product.ratingsQuantity})</span>
              <span className="text-zinc-200">|</span>
              <span className="text-[11px] font-bold text-zinc-500 uppercase">{product.sold > 1000 ? "1000+" : product.sold} sold</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-50">
            <span className="font-black text-2xl text-zinc-900 tracking-tighter">{formatPrice(product.price)}</span>
            <div className="w-48"><AddToCartBtn productId={product._id} className="w-full bg-black text-white hover:bg-zinc-800 rounded-xl h-11 shadow-sm transition-all" /></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square w-full overflow-hidden shrink-0">
        <Link href={`/products/${product._id}`}>
          <Image src={product.imageCover} alt={product.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" width={500} height={500} />
        </Link>
        {heartBtnContent}
      </div>
      <div className="p-4 flex flex-col grow">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          <Link href={`/brands/${product.brand._id}`} className="hover:text-primary transition-colors">{product.brand.name}</Link>
        </p>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/products/${product._id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(product.ratingsAverage)}</div>
          <span className="text-xs text-muted-foreground">({product.ratingsQuantity})</span>
        </div>
        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted-foreground">{product.sold > 1000 ? "1000+" : product.sold} sold</span>
        </div>
        <AddToCartBtn productId={product._id} className="w-full bg-black text-white hover:bg-zinc-800 rounded-full h-10 shadow-sm" />
      </div>
    </div>
  );
}