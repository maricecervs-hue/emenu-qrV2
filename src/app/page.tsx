'use client';

import Image from "next/image"
import Link from "next/link"
import { MapPin, Utensils, ReceiptText, List, ChevronDown, Globe, Crown } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"

export default function Home() {
  const heroImage = PlaceHolderImages.find(i => i.id === 'hero-restaurant')?.imageUrl || "https://picsum.photos/seed/menu-hero/1200/800"

  return (
    <main className="relative min-h-screen bg-[#F4F8FB] flex flex-col items-center overflow-x-hidden">
      {/* Hero Background Image */}
      <div className="absolute top-0 w-full h-[40vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Restaurant Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          data-ai-hint="gourmet restaurant"
        />
      </div>

      {/* Header Controls */}
      <div className="relative w-full max-w-md px-6 pt-8 flex justify-between items-start z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm border border-white/20">
          <Globe className="w-4 h-4 text-[#12B4A3]" />
          <span className="text-slate-800 font-medium text-sm">EN</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/95 backdrop-blur-sm border-none rounded-full h-11 w-11 shadow-lg"
          >
            <Crown className="w-5 h-5 text-slate-400" />
          </Button>
          <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="relative w-full max-w-md px-6 mt-20 z-20 flex-1 flex flex-col">
        {/* Floating Circular Icon */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#12B4A3] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(18,180,163,0.3)] border-[8px] border-white z-30">
          <List className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>

        {/* The Card */}
        <div className="bg-white rounded-[2.5rem] pt-20 pb-12 px-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex flex-col items-center text-center space-y-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-[2.5rem] font-bold text-[#1E2B4D] tracking-tight leading-none">Blue Plate</h1>
            
            {/* Table Indicator Pill */}
            <div className="inline-flex items-center gap-2 bg-[#E9F0F7] px-5 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-red-600 fill-red-600" />
              <span className="text-[#1E2B4D] font-medium text-sm">Table 12</span>
            </div>
          </div>

          <div className="w-full border-t border-dashed border-slate-200" />

          <p className="text-[#8E9AAF] font-normal text-lg leading-relaxed max-w-[200px]">
            Welcome! We're<br />delighted to have you.
          </p>

          <div className="w-full space-y-4 pt-4">
            <Link href="/menu" className="block w-full">
              <Button 
                variant="outline" 
                className="w-full h-16 rounded-2xl border-2 border-[#12B4A3] text-[#12B4A3] font-medium text-lg flex items-center justify-center gap-3 hover:bg-[#12B4A3]/5 transition-all active:scale-95"
              >
                <Utensils className="w-5 h-5" />
                View Menu
              </Button>
            </Link>

            <Button 
              className="w-full h-16 rounded-2xl bg-[#12B4A3] text-white font-medium text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#12B4A3]/20 hover:scale-[1.01] active:scale-95 transition-all"
            >
              <ReceiptText className="w-5 h-5" />
              Pay my Bill
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full pb-10 flex flex-col items-center gap-1 mt-auto">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 items-start">
            <div className="w-4 h-1 bg-[#12B4A3] rounded-full" />
            <div className="w-7 h-1 bg-[#12B4A3] rounded-full" />
            <div className="w-4 h-1 bg-[#12B4A3] rounded-full" />
          </div>
          <span className="text-3xl font-bold text-[#12B4A3] tracking-tight -ml-1">eMenu</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Powered by</p>
      </footer>
    </main>
  )
}
