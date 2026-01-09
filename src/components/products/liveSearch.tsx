"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";

export function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      setIsOpen(true);
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
        const data = await res.json();
        
        const filtered = data.data.filter((product: Product) => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.name.toLowerCase().includes(query.toLowerCase()) ||
          product.subcategory?.some((sub) => sub.name.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, brands..."
          className="pl-10 h-10 bg-zinc-50 border-zinc-200 rounded-full focus-visible:ring-black"
        />
        {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-zinc-400" />}
      </div>

      {isOpen && (query.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-white border border-zinc-100 rounded-2xl shadow-xl z-[100] overflow-hidden">
          {results.length > 0 ? (
            <div className="max-h-100 overflow-y-auto p-2">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-xl transition-colors group"
                >
                  <div className="relative h-12 w-12 rounded-lg border border-zinc-100 overflow-hidden bg-white shrink-0">
                    <Image src={product.imageCover} alt={product.title} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-800 truncate">{product.title}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-black tracking-tighter">
                      {product.brand.name} • {product.category.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : !isSearching && (
            <div className="p-4 text-center text-zinc-400 text-sm italic">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}