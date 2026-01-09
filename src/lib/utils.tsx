import { clsx, type ClassValue } from "clsx"
import { Star, StarHalf } from "lucide-react" // ضفنا StarHalf هون
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`f-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    );
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`e-${i}`} className="h-4 w-4 text-gray-300" />
    );
  }

  return stars;
};