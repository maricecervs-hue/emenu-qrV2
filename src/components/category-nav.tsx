
"use client"

import * as React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const categories = [
  { id: 'all', name: 'All' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'salad', name: 'Salads' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'drinks', name: 'Drinks' },
]

export function CategoryNav() {
  const [active, setActive] = React.useState('all')

  return (
    <div className="relative -mx-6 px-6 py-2 overflow-hidden">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm",
                active === cat.id 
                  ? "bg-primary text-white shadow-primary/20 scale-105" 
                  : "bg-white text-muted-foreground border border-border/50 hover:bg-secondary"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  )
}
