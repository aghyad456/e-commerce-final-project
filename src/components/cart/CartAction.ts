"use server";

export async function addProductToCart(productId: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add product to cart");
  }

  const data = await res.json();
  return data;
}
