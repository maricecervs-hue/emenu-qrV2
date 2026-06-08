
import Image from "next/image"
import { MapPin, Bell, Utensils, ReceiptText, List, Globe, ChevronDown } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"

export default function Home() {
  const heroImage = PlaceHolderImages.find(i => i.id === 'hero-food')?.imageUrl || ""

  return (
    <main className="relative min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Hero Background Image */}
      <div className="absolute top-0 w-full h-[40vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Restaurant Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Header Controls */}
      <div className="relative w-full max-w-md px-6 pt-6 flex justify-between items-start z-10">
        <Button 
          variant="outline" 
          className="bg-white/90 backdrop-blur-sm border-none rounded-full h-10 px-4 flex items-center gap-2 shadow-sm text-slate-700 font-bold"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span>EN</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </Button>

        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/90 backdrop-blur-sm border-none rounded-full h-11 w-11 shadow-sm"
          >
            <Bell className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="relative w-full max-w-md px-6 mt-16 z-20">
        {/* Floating Circular Icon */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl border-4 border-white z-30">
          <List className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>

        {/* The Card */}
        <div className="bg-white rounded-[3rem] pt-20 pb-12 px-8 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-[#1E2B4D] tracking-tight">Blue Plate</h1>
          
          {/* Table Indicator Pill */}
          <div className="bg-slate-100 px-5 py-2 rounded-full flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-slate-700 font-bold text-sm">Table 12</span>
          </div>

          <div className="w-full border-t border-dashed border-slate-200" />

          <p className="text-slate-400 font-medium text-lg leading-relaxed px-4">
            Welcome! We're<br />delighted to have you.
          </p>

          <div className="w-full space-y-4 pt-4">
            <Button 
              variant="outline" 
              className="w-full h-16 rounded-2xl border-2 border-primary text-primary font-bold text-xl flex items-center justify-center gap-3 hover:bg-primary/5 transition-all"
            >
              <Utensils className="w-6 h-6" />
              View Menu
            </Button>

            <Button 
              className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ReceiptText className="w-6 h-6" />
              Pay my Bill
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-auto py-12 flex flex-col items-center gap-1 opacity-80">
        <div className="flex items-center gap-1">
          <div className="flex flex-col gap-0.5 scale-75">
            <div className="w-4 h-1 bg-primary rounded-full" />
            <div className="w-6 h-1 bg-primary rounded-full" />
            <div className="w-4 h-1 bg-primary rounded-full" />
          </div>
          <span className="text-2xl font-black text-primary tracking-tight">eMenu</span>
        </div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Powered by</p>
      </footer>
    </main>
  )
}
