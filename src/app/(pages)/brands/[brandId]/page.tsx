import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/interfaces";
import Image from "next/image";

async function getBrandProducts(brandId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
  const data = await res.json();
  return data.data;
}

async function getBrandDetails(brandId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
  const data = await res.json();
  return data.data;
}

export default async function BrandPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params; 
  const products: Product[] = await getBrandProducts(brandId);
  const brand = await getBrandDetails(brandId);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="flex flex-col items-center mb-12">
        <Image src={brand.image} alt={brand.name} width={200} height={200} className="object-contain mb-4" />
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">{brand.name} Products</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}