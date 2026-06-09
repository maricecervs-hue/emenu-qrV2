'use client';

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
}

interface CategoryListDrawerProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryListDrawer({ isOpen, onClose, categories, activeId, onSelect }: CategoryListDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-[2.5rem] p-0 border-none bg-[#FCFBF5] overflow-hidden z-[150]">
        <SheetHeader className="px-6 pt-8 pb-4 bg-white border-b border-slate-50">
          <SheetTitle className="text-2xl font-bold text-[#1E2B4D] tracking-tight">Full Menu</SheetTitle>
          <SheetDescription className="text-sm font-medium text-[#8E9AAF]">Select a category to jump directly to it.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full px-6 pt-6 pb-24">
          <div className="grid gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelect(category.id)
                  onClose()
                }}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-[1.5rem] transition-all duration-200 active:scale-[0.97] group",
                  activeId === category.id 
                    ? "bg-[#12B4A3] text-white shadow-lg shadow-[#12B4A3]/20" 
                    : "bg-white text-slate-600 border border-slate-100 hover:border-slate-200"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  activeId === category.id ? "bg-white/20" : "bg-slate-50 group-hover:bg-slate-100"
                )}>
                  <div className={cn(
                    "transition-transform group-active:scale-90",
                    activeId === category.id ? "text-white" : "text-[#12B4A3]"
                  )}>
                    {category.icon}
                  </div>
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-bold text-lg tracking-tight">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
