'use client';

import * as React from "react"
import Image from "next/image"
import { Search, ChevronLeft, Wheat, Egg, Fish, XCircle } from "lucide-react"
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

// Custom Milk icon matching the screenshot design
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
  onItemClick?: (item: any) => void
}

const ALLERGENS = [
  { id: 'gluten', name: 'Gluten', icon: <Wheat className="w-3.5 h-3.5" /> },
  { id: 'dairy', name: 'Dairy', icon: <MilkIcon className="w-3.5 h-3.5" /> },
  { id: 'eggs', name: 'Eggs', icon: <Egg className="w-3.5 h-3.5" /> },
  { id: 'fish', name: 'Fish', icon: <Fish className="w-3.5 h-3.5" /> },
]

export function SearchDrawer({ isOpen, onClose, items, onItemClick }: SearchDrawerProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeAllergens, setActiveAllergens] = React.useState<string[]>([])

  const handleReset = React.useCallback(() => {
    setSearchQuery("")
    setActiveAllergens([])
  }, [])

  // Clear search state when drawer is closed (via Back button)
  React.useEffect(() => {
    if (!isOpen) {
      handleReset()
    }
  }, [isOpen, handleReset])

  const filteredItems = React.useMemo(() => {
    if (!searchQuery && activeAllergens.length === 0) return [];
    
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
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

  const hasInteraction = searchQuery.length > 0 || activeAllergens.length > 0

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="top" 
        className={cn(
          "w-full max-w-md mx-auto p-0 border-none bg-white flex flex-col [&>button]:hidden shadow-2xl rounded-none transition-all duration-300 ease-in-out z-[95]",
          hasInteraction ? "h-screen" : "h-auto max-h-[90vh]"
        )}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Search Menu</SheetTitle>
        </SheetHeader>

        {/* Search Header - Straight Bottom Edge */}
        <div className="px-5 pt-6 pb-5 space-y-4 bg-white shrink-0 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="w-11 h-11 rounded-2xl bg-[#F1F3F5] flex items-center justify-center transition-all active:scale-90 border border-slate-100 shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-[#495057]" />
            </button>
            
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="h-11 pl-10 pr-10 bg-white border-2 border-[#E9FBF9] rounded-2xl text-[13px] font-medium placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#12B4A3]/20 focus-visible:border-[#12B4A3]/30"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 active:scale-90 transition-all"
                >
                  <XCircle className="w-5 h-5 fill-slate-200 text-white" />
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            <button
              onClick={() => setActiveAllergens([])}
              className={cn(
                "h-9 px-5 rounded-2xl text-[12px] font-bold transition-all border-2",
                activeAllergens.length === 0 
                  ? "bg-[#12B4A3] border-[#12B4A3] text-white" 
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
                  "h-9 px-4 rounded-2xl text-[12px] font-bold flex items-center gap-1.5 transition-all border-2 whitespace-nowrap",
                  activeAllergens.includes(a.id) 
                    ? "bg-[#12B4A3] border-[#12B4A3] text-white" 
                    : "bg-white border-[#F1F3F5] text-[#8E9AAF] hover:border-slate-200"
                )}
              >
                <span className={cn("transition-colors", activeAllergens.includes(a.id) ? "text-white" : "text-[#12B4A3]")}>
                  {a.icon}
                </span>
                <span>{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Area - Appears and fills height on interaction */}
        {hasInteraction && (
          <ScrollArea className="flex-1 bg-[#F8F9FB] animate-in fade-in duration-300">
            <div className="px-5 py-6 space-y-6 pb-24 min-h-full">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[13px] font-bold text-[#1E2B4D] tracking-tight">
                  <span className="text-[#1E2B4D]">{filteredItems.length}</span> items found
                </h3>
                <button 
                  onClick={handleReset}
                  className="text-[11px] font-bold text-[#12B4A3] underline decoration-dotted underline-offset-4"
                >
                  Clear All
                </button>
              </div>

              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-4 rounded-[1.8rem] border border-slate-50 flex gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform cursor-pointer"
                    onClick={() => {
                      if (onItemClick) onItemClick(item);
                      // Specifically NOT calling onClose() here to keep search drawer open behind Customizer
                    }}
                  >
                    <div className="relative w-24 h-24 rounded-[1.2rem] overflow-hidden shrink-0 border border-slate-50">
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

              {filteredItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-40">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-sm font-medium text-[#8E9AAF]">No matching items</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
