import { LoadingSpinner } from '../shared/LouadingSpinner'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-lg">
          <span className="text-xl font-bold italic">S</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">ShopMart</h1>
      </div>

      <LoadingSpinner />
    </div>
  )
}