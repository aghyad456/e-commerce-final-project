import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { LoadingSpinner } from '../shared/LouadingSpinner2'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartProduct } from '@/interfaces'

type cartItemProps = {
    item: CartProduct;
    removeSecificCartItem: (cartItemId: string) => Promise<void>;
    updateCartCount:(cartItemId: string, count: number) => Promise<void>;

}
export default function CartItem({ item, removeSecificCartItem, updateCartCount }: cartItemProps) {
    const[isDeleting, setIsDeleting ] = useState(false)
    const[isInCreasing, setIsInCreasing ] = useState(false)
    const[isDeCreasing, setIsDeCreasing ] = useState(false)

    async function handleDeleteCartItem(){
        setIsDeleting(true);
        await removeSecificCartItem(item.product._id);
        setIsDeleting(false);

    }
    async function handleUpdateCartItem(productCount: number){
       if (productCount > item.count) {
        setIsInCreasing(true); 
    } else {
        setIsDeCreasing(true); 
    }
    
    await updateCartCount(item.product._id, productCount);
    
    setIsInCreasing(false);
    setIsDeCreasing(false);
}


   

  return (
     <div key={item._id} className="flex gap-4 p-4 border rounded-lg">
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="object-cover rounded-md"
                    fill
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-2">
                    <Link href={`/products/${item.product.id}`} className="hover:text-primary transition-colors">
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.product.brand?.name}</p>
                  <p className="font-semibold text-primary mt-2">{formatPrice (item.price)}</p>
                </div>
              {/* remove */}
                <div className="flex flex-col items-end gap-2">
                  <Button className='cursor-pointer' variant="ghost" size="sm"
                   onClick={() => handleDeleteCartItem()}  
                   disabled={isDeleting} 
                    >
                      {isDeleting ? <LoadingSpinner size='sm' /> :  <Trash2 className="h-4 w-4 text-red-900" />}
                  </Button>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={item.count === 1 || isDeCreasing || isInCreasing} 
                        className="disabled:cursor-not-allowed disabled:pointer-events-auto"
                        onClick={() => handleUpdateCartItem(item.count - 1)} 
                    >
                        {isDeCreasing ? <LoadingSpinner size='sm' /> : <Minus className="h-4 w-4" />}
                    </Button>

                    <span className="w-8 text-center">{item.count}</span>

                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={isInCreasing || isDeCreasing}
                        className="disabled:cursor-not-allowed disabled:pointer-events-auto"
                        onClick={() => handleUpdateCartItem(item.count + 1)} 
                    >
                        {isInCreasing ? <LoadingSpinner size='sm' /> : <Plus className="h-4 w-4" />}
                    </Button>
                </div>
                </div>
              </div>
  )
}
