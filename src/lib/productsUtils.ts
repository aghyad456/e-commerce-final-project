export async function addProductToCart(productId: string, token: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      "token": token,
      "Content-Type": "application/json",
    },
  });
  
  return await res.json();
}