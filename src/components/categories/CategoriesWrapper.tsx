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
import { Category } from "@/interfaces";

export default function CategoriesWrapper({ 
  categories, 
  currentPage, 
  totalPages 
}: { 
  categories: Category[], 
  currentPage: number, 
  totalPages: number 
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: Category) => (
          <Link 
            key={category._id} 
            href={`/categories/${category._id}`} 
            className="group block bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="aspect-square relative flex items-center justify-center p-6">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-5 text-center bg-white border-t border-zinc-50">
              <h3 className="text-sm font-semibold text-zinc-800 transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={`?page=${currentPage - 1}`}
                className={currentPage <= 1 ? "pointer-events-none opacity-50 border-zinc-200" : "border-zinc-200"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href={`?page=${i + 1}`}
                  isActive={currentPage === i + 1}
                  className="border-zinc-200 aria-[current]:bg-black aria-[current]:text-white aria-[current]:border-black"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href={`?page=${currentPage + 1}`}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50 border-zinc-200" : "border-zinc-200"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}