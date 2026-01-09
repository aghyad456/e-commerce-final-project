import SubCategoriesWrapper from "@/components/subcategories/SubCategoriesWrapper";

async function getSubCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories");
  if (!res.ok) return null;
  return res.json();
}

export default async function SubCategoriesPage() {
  const data = await getSubCategories();

  if (!data) return <div className="p-20 text-center opacity-50 font-bold">Error loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-zinc-900 mb-10 tracking-tight">All SubCategories</h1>
      <SubCategoriesWrapper subcategories={data.data} />
    </div>
  );
}