'use client';

import * as React from "react"
import Image from "next/image"
import { Search, ChevronLeft, XCircle, Wheat, Egg, Fish } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Custom Milk icon since Lucide doesn't have a perfect one
const MilkIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2c-4 0-4 4-4 4s1 2 1 5-1 5-1 5c0 4 8 4 8 0 0 0-1-2-1-5s1-2 1-5-1-4-4-4z" />
    <path d="M9 11h6" />
  </svg>
)

interface SearchDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

const ALLERGENS = [
  { id: 'gluten', name: 'Gluten', icon: <Wheat className="w-3 h-3" /> },
  { id: 'dairy', name: 'Dairy', icon: <MilkIcon className="w-3 h-3" /> },
  { id: 'eggs', name: 'Eggs', icon: <Egg className="w-3 h-3" /> },
  { id: 'fish', name: 'Fish', icon: <Fish className="w-3 h-3" /> },
]

export function SearchDrawer({ isOpen, onClose, items }: SearchDrawerProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeAllergen, setActiveAllergen] = React.useState<string | null>(null)

  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // For demo purposes, we'll assign random allergens to items if they don't have them
      const itemAllergen = item.id % 2 === 0 ? 'gluten' : (item.id % 3 === 0 ? 'dairy' : (item.id % 5 === 0 ? 'eggs' : 'fish'));
      const matchesAllergen = !activeAllergen || itemAllergen === activeAllergen;

      return matchesSearch && matchesAllergen;
    })
  }, [items, searchQuery, activeAllergen])

  const getItemAllergenLabel = (id: string) => {
    const aid = Number(id) % 2 === 0 ? 'Gluten' : (Number(id) % 3 === 0 ? 'Dairy' : (Number(id) % 5 === 0 ? 'Eggs' : 'Fish'));
    return `Contains ${aid}`;
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-screen w-full p-0 border-none bg-[#F9F9F9] flex flex-col">
        <SheetHeader className="sr-only">
          <SheetTitle>Search Menu</SheetTitle>
        </SheetHeader>

        {/* Search Header */}
        <div className="bg-white px-4 pt-6 pb-4 space-y-4 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-[#F4F5F7] flex items-center justify-center transition-active active:scale-90"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="h-11 pl-10 pr-10 bg-[#F4F5F7] border-none rounded-2xl text-sm font-medium placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#12B4A3]/20"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <XCircle className="w-4 h-4 fill-slate-200 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
            <button
              onClick={() => setActiveAllergen(null)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-semibold transition-all border",
                !activeAllergen 
                  ? "bg-[#12B4A3] border-[#12B4A3] text-white" 
                  : "bg-white border-slate-100 text-slate-500"
              )}
            >
              All
            </button>
            {ALLERGENS.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveAllergen(a.id === activeAllergen ? null : a.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border whitespace-nowrap",
                  activeAllergen === a.id 
                    ? "bg-[#12B4A3] border-[#12B4A3] text-white" 
                    : "bg-white border-slate-100 text-slate-500"
                )}
              >
                {a.icon}
                {a.name}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 pt-6">
          <div className="space-y-6 pb-24">
            <h3 className="text-sm font-semibold text-[#8E9AAF] px-1">
              {filteredItems.length} items found
            </h3>

            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-3 rounded-[1.5rem] border border-slate-100 flex gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                  onClick={onClose}
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-bold text-[#1E2B4D] leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] font-medium text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-[#1E2B4D]">${item.price.toFixed(2)}</span>
                      <Badge variant="outline" className="rounded-full h-5 border-[#FEF08A] bg-[#FEF9C3]/10 text-[#B45309] font-medium text-[9px] px-2.5">
                        {getItemAllergenLabel(item.id)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-20 space-y-4 opacity-50">
                <Search className="w-12 h-12 text-slate-200" />
                <p className="text-sm font-medium text-slate-400">No items match your search</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
