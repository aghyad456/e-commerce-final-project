import { Product } from "@/interfaces";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImageSlider from "@/components/products/ProductImageSlider";
import Link from "next/link";
import AddToCartBtn from "@/components/products/addProductToCartBtn";
import { formatPrice } from "@/lib/utils";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  const json = await res.json();
  return json.data;
}

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProduct(productId);
  const allImages = [product.imageCover, ...(product.images || [])];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-255 border border-zinc-300 rounded-4px p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <ProductImageSlider images={allImages} />

          <div className="flex flex-col h-full justify-center text-left">
            <div className="space-y-1">
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
                <Link href={`/brands/${product.brand?._id}`} className="hover:text-black transition-colors">{product.brand?.name}</Link>
              </p>
              <h1 className="text-3xl font-black italic uppercase text-black leading-tight">
                {product.title.split(" ").slice(0, 4).join(" ")}
              </h1>
            </div>

            <p className="mt-4 text-zinc-600 text-[15px] leading-relaxed line-clamp-4">
              {product.description}
            </p>

            <div className="mt-4 space-y-2 border-y border-zinc-50 py-4">
              <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">{product.category?.name}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.ratingsAverage) ? "fill-[#ffc107] text-[#ffc107]" : "text-zinc-200"}`} />
                ))}
                <span className="text-zinc-400 text-sm font-bold ml-1">({product.ratingsQuantity})</span>
              </div>
            </div>

            <div className="mt-6 text-3xl font-black italic text-black">
              {formatPrice(product.price)}
            </div>

            <div className="mt-8 flex gap-3">
              <AddToCartBtn 
                productId={product._id} 
                className="flex-4 h-12 bg-black hover:bg-zinc-800 text-white rounded-full font-black uppercase italic shadow-md" 
              />
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full h-12 w-12 border border-zinc-100">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}