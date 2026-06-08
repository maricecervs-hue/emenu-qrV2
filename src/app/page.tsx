
'use client';

import Image from "next/image"
import Link from "next/link"
import { MapPin, Bell, Utensils, ReceiptText, List, Globe, ChevronDown } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"

export default function Home() {
  const heroImage = PlaceHolderImages.find(i => i.id === 'hero-food')?.imageUrl || "https://picsum.photos/seed/menu-hero/1200/800"

  return (
    <main className="relative min-h-screen bg-slate-50 flex flex-col items-center overflow-x-hidden">
      {/* Hero Background Image */}
      <div className="absolute top-0 w-full h-[45vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Restaurant Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          data-ai-hint="gourmet restaurant"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header Controls */}
      <div className="relative w-full max-w-md px-6 pt-8 flex justify-between items-start z-10">
        <LanguageSelector />

        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/90 backdrop-blur-sm border-none rounded-full h-12 w-12 shadow-lg"
          >
            <Bell className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="relative w-full max-w-md px-6 mt-24 z-20 flex-1 flex flex-col">
        {/* Floating Circular Icon */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-primary rounded-full flex items-center justify-center shadow-2xl border-[6px] border-white z-30">
          <List className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>

        {/* The Card */}
        <div className="bg-white rounded-[3.5rem] pt-20 pb-12 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center text-center space-y-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-[#1E2B4D] tracking-tight">Blue Plate</h1>
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Gourmet Experience</p>
          </div>
          
          {/* Table Indicator Pill */}
          <div className="bg-slate-100 px-6 py-2.5 rounded-full flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary fill-primary" />
            <span className="text-slate-700 font-bold text-sm">Table 12</span>
          </div>

          <div className="w-full border-t border-dashed border-slate-200" />

          <p className="text-slate-400 font-medium text-xl leading-relaxed px-4">
            Welcome! We're<br />delighted to have you.
          </p>

          <div className="w-full space-y-4 pt-4">
            <Link href="/menu" className="block w-full">
              <Button 
                variant="outline" 
                className="w-full h-18 py-8 rounded-2xl border-2 border-primary text-primary font-bold text-xl flex items-center justify-center gap-3 hover:bg-primary/5 transition-all active:scale-95"
              >
                <Utensils className="w-6 h-6" />
                View Menu
              </Button>
            </Link>

            <Button 
              className="w-full h-18 py-8 rounded-2xl bg-primary text-white font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ReceiptText className="w-6 h-6" />
              Pay my Bill
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full py-10 flex flex-col items-center gap-1.5 opacity-60">
        <div className="flex items-center gap-1.5">
          <div className="flex flex-col gap-1 scale-75">
            <div className="w-5 h-1.5 bg-primary rounded-full" />
            <div className="w-8 h-1.5 bg-primary rounded-full" />
            <div className="w-5 h-1.5 bg-primary rounded-full" />
          </div>
          <span className="text-2xl font-black text-primary tracking-tight">eMenu</span>
        </div>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Crafted for Excellence</p>
      </footer>
    </main>
  )
}
