"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Brand } from "@/interfaces";

export default function BrandsWrapper({ 
  brands, 
  currentPage, 
  totalPages 
}: { 
  brands: Brand[], 
  currentPage: number, 
  totalPages: number 
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
        {brands.map((brand: Brand) => (
          <Link 
            key={brand._id} 
            href={`/brands/${brand._id}`} 
            className="group relative bg-white border border-zinc-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 flex flex-col h-full"
          >
            <div className="aspect-square relative flex items-center justify-center p-10 shrink-0">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="p-6 text-center border-t border-zinc-50 mt-auto bg-zinc-50/30">
              <h3 className="text-sm font-bold text-zinc-700 group-hover:text-black transition-colors uppercase tracking-widest">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={`?page=${currentPage - 1}`}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href={`?page=${i + 1}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href={`?page=${currentPage + 1}`}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}