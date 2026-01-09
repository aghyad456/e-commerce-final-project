import { ProductCard, ViewToggler } from "@/components";
import { Product } from "@/interfaces";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { LiveSearch } from "@/components";

export default async function Products(props: {
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const viewMode = searchParams.view === "list" ? "list" : "grid";
  const currentPage = Number(searchParams.page) || 1; 

  async function getProducts(): Promise<{ products: Product[], totalPages: number }> {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`
    ).then((res) => res.json());
    return { 
      products: res.data, 
      totalPages: res.metadata.numberOfPages 
    };
  }

  const { products, totalPages } = await getProducts();

  return (
    <div className="my-10 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <LiveSearch />
        <ViewToggler viewMode={viewMode} />
      </div>

      <div className={cn(
    "grid gap-6",
    viewMode === "grid" 
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch" 
      : "grid-cols-1"
  )}>
    {products.map((product) => (
      <div key={product._id} className="flex flex-col h-full"> 
        <ProductCard 
          product={product} 
          viewMode={viewMode} 
        />
      </div>
    ))}
  </div>

      <div className="mt-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={`?view=${viewMode}&page=${currentPage - 1}`}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href={`?view=${viewMode}&page=${i + 1}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href={`?view=${viewMode}&page=${currentPage + 1}`}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}