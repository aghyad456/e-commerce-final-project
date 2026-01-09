import { cn } from "@/lib/utils";

type Size="sm"| "md"| "lg";
type LoadingSpinnerProps={
  size?: Size;
}
export function LoadingSpinner({size = "md"}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center ">
      <div className={cn("w-8 h-8 border-b-2 border-primary rounded-full animate-spin",
         size == "sm" && "size-4",
         size == "md" && "size-6",
         size == "lg" && "size-8"
         )}></div> 
    </div>
  );
}