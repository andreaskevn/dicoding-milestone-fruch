'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/20 bg-opacity-20 z-50">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          {/* Multiple spinner rings with different speeds */}
          <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <div className="absolute inset-[15%] border-4 border-emerald-100 border-b-emerald-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          <div className="absolute inset-[30%] border-4 border-emerald-50 border-l-emerald-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
          
          {/* Center dot */}
          <div className="absolute inset-[45%] bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
        <p className="mt-6 text-emerald-700 font-medium animate-pulse">Memuat...</p>
      </div>
    </div>
  );
}