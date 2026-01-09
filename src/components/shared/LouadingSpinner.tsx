export function LoadingSpinner() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute w-16 h-16 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
      
      <div className="absolute w-12 h-12 border-4 border-slate-100 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}