import CategoriesWrapper from "@/components/categories/CategoriesWrapper";

async function getCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  if (!res.ok) return null;
  return res.json();
}

export default async function CategoriesPage() {
  const data = await getCategories();
  if (!data) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-zinc-900 mb-10 tracking-tight text-left">Categories</h1>
      <CategoriesWrapper categories={data.data} currentPage={1} 
      totalPages={data.metadata?.numberOfPages || 1} />
    </div>
  );
}