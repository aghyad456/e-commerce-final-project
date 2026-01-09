import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CartWrapper from "@/components/cart/cartWrapper";

async function getLoggedUserCart(token: string) {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token },
    next: { revalidate: 0 }
  });
  return response.json();
}

export default async function Cart() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.token) {
    return <div className="p-20 text-center font-bold italic text-zinc-400 uppercase tracking-widest">Please login to view your cart</div>;
  }

  const cartResponse = await getLoggedUserCart(session.user.token);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <CartWrapper cartResponse={cartResponse} token={session.user.token} />
    </div>
  );
}