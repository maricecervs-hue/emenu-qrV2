"use client"

import * as React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
}

interface CategoryNavProps {
  categories: Category[]
  active: string
  onChange: (id: string) => void
}

export function CategoryNav({ categories, active, onChange }: CategoryNavProps) {
  return (
    <div className="w-full border-t border-b border-slate-200 bg-white">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-8 py-1 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={cn(
                "flex items-center gap-2 py-3 px-1 relative transition-all duration-300",
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
