import { formatPrice } from '@/lib/utils'

export default function AllOrdersPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Invoices</h1>
      <div className="space-y-6">
        {[1, 2].map((order) => (
          <div key={order} className="bg-white rounded-[24px] p-8 shadow-sm border border-zinc-50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Order ID</p>
                <p className="font-mono text-sm text-zinc-600">#67890-ABCDE</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Status</p>
                <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">Paid</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-50 pt-6 flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-500">2 Items purchased</p>
                <p className="text-2xl font-black mt-1">{formatPrice(298)}</p>
              </div>
              <button className="text-sm font-bold text-black underline underline-offset-4">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}