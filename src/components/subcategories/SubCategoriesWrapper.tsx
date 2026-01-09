"use client";
import { SubCategory } from "@/interfaces";

export default function SubCategoriesWrapper({ subcategories }: { subcategories: SubCategory[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {subcategories.map((sub) => (
        <div 
          key={sub._id}
          className="px-6 py-3 bg-white border border-zinc-200 rounded-full text-sm font-bold text-zinc-700 hover:border-black hover:text-black transition-all cursor-pointer shadow-sm"
        >
          {sub.name}
        </div>
      ))}
    </div>
  );
}