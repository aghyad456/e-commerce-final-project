"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative w-full aspect-square bg-[#f2f2f2] rounded-2xl overflow-hidden shadow-inner border border-zinc-100">
        <div 
          className="flex h-full transition-transform duration-1000 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-full h-full relative">
              <Image 
                src={img} 
                alt="product" 
                fill 
                className="object-contain p-8" 
                sizes="1000px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {images.map((_, i) => (
          <div key={i} className={`h-1.5 transition-all ${currentIndex === i ? "w-8 bg-black" : "w-2 bg-zinc-200"} rounded-full`} />
        ))}
      </div>
    </div>
  );
}