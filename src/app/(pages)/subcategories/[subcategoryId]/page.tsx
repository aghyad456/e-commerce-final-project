import { ProductCard } from "@/components";
import { Product } from "@/interfaces";
import Link from "next/link";

async function getSubData(id: string) {
  const [detailsRes, productsRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`),
    fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${id}&limit=40`)
  ]);
  return {
    subCategory: (await detailsRes.json()).data,
    products: (await productsRes.json()).data
  };
}

export default async function SubCategoryPage({ params }: { params: Promise<{ subcategoryId: string }> }) {
  const { subcategoryId } = await params;
  const { subCategory, products } = await getSubData(subcategoryId);

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen bg-white text-left">
      <div className="mb-16 border-b border-zinc-100 pb-8 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 italic uppercase tracking-tighter">{subCategory?.name}</h1>
        <p className="text-zinc-400 text-sm mt-2">{products.length} Products Found</p>
      </div>

      { products.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
           </div>: (
  <div className="flex flex-col items-center justify-center py-32 space-y-4">
    <div className="text-zinc-200">
      <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>
    <p className="text-zinc-400 font-bold italic uppercase tracking-widest text-sm">
      No items found in this section
    </p>
    <Link href="/products" className="text-xs font-black underline uppercase hover:text-blue-600 transition-colors">
      Continue Shopping
    </Link>
  </div>
)}
    </div>
  );
}