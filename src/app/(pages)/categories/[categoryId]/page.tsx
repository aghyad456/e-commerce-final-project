import { ProductCard } from "@/components";
import { Product, SubCategory } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

async function getData(id: string) {
  const [catRes, prodRes, subRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`),
    fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`),
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  ]);
  return {
    category: (await catRes.json()).data,
    products: (await prodRes.json()).data,
    subCategories: (await subRes.json()).data as SubCategory[]
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params; 
  const { category, products, subCategories } = await getData(categoryId);

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen bg-white text-left">
      <div className="flex flex-col items-center mb-12 space-y-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border border-zinc-100 shadow-sm bg-zinc-50">
            <Image src={category.image} alt={category.name} fill className="object-cover" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900">{category.name}</h1>
      </div>

      <div className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 text-center">Sub Categories</h2>
        <div className="flex justify-center flex-wrap gap-3">
            {subCategories.map((sub: SubCategory) => (
              <Link key={sub._id} href={`/subcategories/${sub._id}`} className="px-5 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-[12px] font-bold text-zinc-600 hover:border-black hover:text-black transition-all">
                {sub.name}
              </Link>
            ))}
        </div>
      </div>
      
      { products.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
     </div> : (
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