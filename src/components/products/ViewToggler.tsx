import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ViewToggler({ viewMode }: { viewMode: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
      <Link 
        href="/products?view=grid" 
        className={cn("p-2 rounded-md transition-all", viewMode === "grid" ? "bg-white shadow-sm" : "text-slate-500 hover:text-slate-700")}
      >
        <LayoutGrid className="h-5 w-5" />
      </Link>
      <Link 
        href="/products?view=list" 
        className={cn("p-2 rounded-md transition-all", viewMode === "list" ? "bg-white shadow-sm" : "text-slate-500 hover:text-slate-700")}
      >
        <List className="h-5 w-5" />
      </Link>
    </div>
  );
}