"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/interfaces";
import { cn } from "@/lib/utils";

type BrandDetailsWrapperProps = {
  products: Product[];
  brandName: string;
};

export default function BrandDetailsWrapper({ products, brandName }: BrandDetailsWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">{brandName}</h1>

      <div className={cn(
        "grid gap-6",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      )}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
