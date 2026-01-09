"use client"
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Banknote, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { LoadingSpinner } from '../shared/LouadingSpinner2'
import CartItem from './cartItem'
import { CartResponse } from '@/interfaces'
import CheckoutModal from './ChaeckoutModal'
import { useDispatch } from 'react-redux'
import { updateNumOfCartItems } from '@/redux/cartSlice'

type CartWrapperProps = {
  cartResponse: CartResponse;
  token: string;
};

export default function CartWrapper({ cartResponse, token }: CartWrapperProps) {
  const [innerCartResponse, setInnerCartResponse] = useState(cartResponse)
  const [isClearing, setIsClearing] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const dispatch = useDispatch();

  async function clearCart() {
    try {
      setIsClearing(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
        method: "DELETE", 
      });
      const response = await res.json();
      
      if (response.message === "success") {
        dispatch(updateNumOfCartItems(0));
        
        setInnerCartResponse({
          status: "success",
          numOfCartItems: 0,
          cartId: "",
          data: { 
            products: [], 
            totalCartPrice: 0, 
            _id: "", 
            cartOwner: "" 
          }
        });
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setIsClearing(false);
    }
  }

  async function removeSecificCartItem(cartItemId: string) {
    const response: CartResponse = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + cartItemId,
      {
        headers: { token },
        method: "delete",
      }
    ).then((res) => res.json());
    
    if (response.status === "success") {
      dispatch(updateNumOfCartItems(response.numOfCartItems));
      setInnerCartResponse(response);
    }
  }

  async function updateCartCount(cartItemId: string, count: number) {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + cartItemId,
      {
        headers: { token, "content-type": "application/json" },
        method: "put",
        body: JSON.stringify({ count }),
      }
    ).then((res) => res.json());

    if (response.status === "success") {
      dispatch(updateNumOfCartItems(response.numOfCartItems));
      setInnerCartResponse(response);
    }
  }

  if (!innerCartResponse.data || innerCartResponse.data?.products?.length === 0) {
    return (
      <div className="text-center py-32">
        <ShoppingBag className="h-20 w-20 text-zinc-100 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-6">Your cart is empty</h2>
        <Button asChild className="rounded-full bg-black px-8 h-12 font-bold"><Link href="/products">Start Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-zinc-400 text-sm font-medium">
          {innerCartResponse.numOfCartItems} items in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-4">
            {innerCartResponse.data.products.map((item) => (
              <CartItem 
                key={item._id} 
                item={item} 
                removeSecificCartItem={removeSecificCartItem}
                updateCartCount={updateCartCount}
              />
            ))}
          </div>
          <div className="flex justify-end pr-4">
            <button 
              onClick={clearCart}
              disabled={isClearing}
              className="flex items-center gap-2 text-red-500 text-sm font-bold hover:underline"
            >
              {isClearing ? <LoadingSpinner size='sm' /> : <Trash2 className="h-4 w-4" />}
              clear cart
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-zinc-100 rounded-[32px] p-8 sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Subtotal ({innerCartResponse.numOfCartItems} items)</span>
                <span className="font-bold">{formatPrice(innerCartResponse.data.totalCartPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Shipping</span>
                <span className="text-green-500 font-bold text-sm">Free</span>
              </div>
            </div>

            <div className="border-t border-zinc-50 pt-6 flex justify-between items-center mb-10">
              <span className="font-bold text-lg">Total</span>
              <span className="text-2xl font-black tracking-tight">{innerCartResponse.data.totalCartPrice}</span>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline"
                asChild
                className="w-full h-14 cursor-pointer rounded-2xl border-zinc-100 text-zinc-600 font-bold hover:bg-zinc-50"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>

              <Button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full h-14 cursor-pointer rounded-2xl bg-zinc-900 text-white font-bold hover:bg-black transition-all"
              >
                Proceed to Checkout
              </Button>

              <Button 
                variant="outline"
                onClick={() => window.location.href = "/allorders"}
                className="w-full cursor-pointer h-14 rounded-2xl border-zinc-100 text-zinc-900 font-bold hover:bg-zinc-50 flex items-center justify-center gap-2"
              >
                <Banknote className="w-5 h-5" /> Cash Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cartId={innerCartResponse.cartId} 
        token={token}
      />
    </div>
  )
}