'use client';

import * as React from "react"
import Image from "next/image"
import { Search, ChevronLeft, Wheat, Egg, Fish } from "lucide-react"
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
  { id: 'gluten', name: 'Gluten', icon: <Wheat className="w-3.5 h-3.5" /> },
  { id: 'dairy', name: 'Dairy', icon: <MilkIcon className="w-3.5 h-3.5" /> },
  { id: 'eggs', name: 'Eggs', icon: <Egg className="w-3.5 h-3.5" /> },
  { id: 'fish', name: 'Fish', icon: <Fish className="w-3.5 h-3.5" /> },
]

export function SearchDrawer({ isOpen, onClose, items }: SearchDrawerProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeAllergens, setActiveAllergens] = React.useState<string[]>([])

  const filteredItems = React.useMemo(() => {
    if (!searchQuery && activeAllergens.length === 0) return [];
    
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // For demo purposes, we'll assign random allergens to items
      const itemAllergen = item.id % 2 === 0 ? 'gluten' : (item.id % 3 === 0 ? 'dairy' : (item.id % 5 === 0 ? 'eggs' : 'fish'));
      const matchesAllergen = activeAllergens.length === 0 || activeAllergens.includes(itemAllergen);

      return matchesSearch && matchesAllergen;
    })
  }, [items, searchQuery, activeAllergens])

  const getItemAllergenLabel = (id: string) => {
    const aid = Number(id) % 2 === 0 ? 'Gluten' : (Number(id) % 3 === 0 ? 'Dairy' : (Number(id) % 5 === 0 ? 'Eggs' : 'Fish'));
    return `Contains ${aid}`;
  }

  const toggleAllergen = (id: string) => {
    setActiveAllergens(prev => 
      prev.includes(id) 
        ? prev.filter(a => a !== id) 
        : [...prev, id]
    )
  }

  const handleReset = () => {
    setSearchQuery("")
    setActiveAllergens([])
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="top" 
        className="h-auto max-h-[90vh] w-full max-w-md mx-auto p-0 border-none bg-white flex flex-col [&>button]:hidden shadow-2xl rounded-b-[2rem]"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Search Menu</SheetTitle>
        </SheetHeader>

        {/* Search Header - Slide down design */}
        <div className="px-5 pt-8 pb-5 space-y-5">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center transition-active active:scale-90 shadow-sm border border-slate-100"
            >
              <ChevronLeft className="w-6 h-6 text-[#1E2B4D]" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="h-12 pl-11 pr-4 bg-white border-2 border-[#F1F3F5] rounded-2xl text-sm font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#12B4A3]/10 focus-visible:border-[#12B4A3]/30"
              />
            </div>
          </div>

          {/* Filter Chips - Exact match to screenshot 1 */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveAllergens([])}
              className={cn(
                "h-10 px-5 rounded-2xl text-[13px] font-semibold transition-all border-2",
                activeAllergens.length === 0 
                  ? "bg-[#12B4A3] border-[#12B4A3] text-white shadow-md shadow-[#12B4A3]/20" 
                  : "bg-white border-[#F1F3F5] text-[#8E9AAF] hover:border-slate-200"
              )}
            >
              All
            </button>
            {ALLERGENS.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleAllergen(a.id)}
                className={cn(
                  "h-10 px-4 rounded-2xl text-[13px] font-semibold flex items-center gap-2.5 transition-all border-2 whitespace-nowrap",
                  activeAllergens.includes(a.id) 
                    ? "bg-[#12B4A3] border-[#12B4A3] text-white shadow-md shadow-[#12B4A3]/20" 
                    : "bg-white border-[#F1F3F5] text-[#8E9AAF] hover:border-slate-200"
                )}
              >
                <span className={cn(activeAllergens.includes(a.id) ? "text-white" : "text-[#12B4A3]")}>
                  {a.icon}
                </span>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <ScrollArea className="flex-1 bg-[#F8F9FB] rounded-b-[2rem]">
          <div className="px-5 py-6 space-y-6 pb-12">
            {(searchQuery || activeAllergens.length > 0) && (
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[13px] font-semibold text-[#8E9AAF]">
                  {filteredItems.length} items found
                </h3>
                <button 
                  onClick={handleReset}
                  className="text-[13px] font-semibold text-[#12B4A3] underline decoration-dotted underline-offset-4"
                >
                  Reset
                </button>
              </div>
            )}

            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-4 rounded-[1.8rem] border border-slate-50 flex gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] group active:scale-[0.98] transition-transform"
                  onClick={onClose}
                >
                  <div className="relative w-24 h-24 rounded-[1.2rem] overflow-hidden shrink-0 border border-slate-100">
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
                      <p className="text-[11px] font-medium text-[#8E9AAF] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[17px] font-bold text-[#1E2B4D]">${item.price.toFixed(2)}</span>
                      <Badge variant="outline" className="rounded-full h-5 border-[#FEF08A] bg-[#FEF9C3]/20 text-[#B45309] font-semibold text-[9px] px-2.5 uppercase tracking-wider">
                        {getItemAllergenLabel(item.id)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (searchQuery || activeAllergens.length > 0) && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-50">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <Search className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-sm font-medium text-[#8E9AAF]">No items match your search</p>
              </div>
            )}

            {!searchQuery && activeAllergens.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <p className="text-sm font-medium text-[#8E9AAF] text-center max-w-[200px]">
                  Start typing or select a filter to find your favorite dishes
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
