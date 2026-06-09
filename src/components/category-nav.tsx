"use client"

import * as React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { List } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
}

interface CategoryNavProps {
  categories: Category[]
  active: string
  onChange: (id: string) => void
  onOpenList?: () => void
}

export function CategoryNav({ categories, active, onChange, onOpenList }: CategoryNavProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!active) return;
    
    // Find the active button within the scrollable container
    const activeButton = containerRef.current?.querySelector(`[data-category-id="${active}"]`)
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [active])

  return (
    <div className="w-full border-t border-b border-slate-200 bg-white flex items-center">
      <button 
        onClick={onOpenList}
        className="h-[60px] px-5 border-r border-slate-100 flex items-center justify-center shrink-0 active:bg-slate-50 transition-colors group"
        aria-label="Open categories list"
      >
        <List className="w-6 h-6 text-[#1E2B4D] transition-transform group-active:scale-90" />
      </button>
      
      <ScrollArea className="flex-1 whitespace-nowrap">
        <div ref={containerRef} className="flex gap-8 py-1 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-category-id={cat.id}
              onClick={() => onChange(cat.id)}
              className={cn(
                "flex items-center gap-2 py-4 px-1 relative transition-all duration-300",
                active === cat.id 
                  ? "text-[#12B4A3]" 
                  : "text-slate-400"
              )}
            >
              <span className={cn(
                "transition-transform",
                active === cat.id ? "scale-110" : "scale-100"
              )}>
                {cat.icon}
              </span>
              <span className="font-bold text-sm tracking-tight">{cat.name}</span>
              {active === cat.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#12B4A3] rounded-full" />
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  )
}
