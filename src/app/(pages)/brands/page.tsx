import BrandsWrapper from "@/components/brands/BrandsWrapper";

async function getBrands(page = 1) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=20&page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function BrandsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const data = await getBrands(currentPage);

  if (!data) return <div className="text-center py-20 font-bold italic">Error loading brands...</div>;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 bg-white min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic border-b-4 border-black w-fit">
          Brands
        </h1>
      </div>

      <BrandsWrapper 
        brands={data.data} 
        currentPage={currentPage} 
        totalPages={data.metadata.numberOfPages} 
      />
    </div>
  );
}