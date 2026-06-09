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
import { Check } from "lucide-react"

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
      <SheetContent side="bottom" className="h-[60vh] rounded-t-[2.5rem] p-0 border-none bg-white overflow-hidden z-[150]">
        <SheetHeader className="px-6 pt-8 pb-4 border-b border-slate-50">
          <SheetTitle className="text-xl font-bold text-[#1E2B4D] tracking-tight text-left">Menu Sections</SheetTitle>
          <SheetDescription className="text-xs font-medium text-[#8E9AAF] text-left">Select a category to jump directly to it.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full px-2 pt-2 pb-24">
          <div className="space-y-0.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelect(category.id)
                  onClose()
                }}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 active:bg-slate-100 group",
                  activeId === category.id ? "bg-slate-50" : "bg-transparent"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    activeId === category.id ? "bg-[#12B4A3] text-white" : "bg-slate-50 text-slate-400 group-hover:text-[#12B4A3]"
                  )}>
                    <div className="scale-110">
                      {category.icon}
                    </div>
                  </div>
                  <span className={cn(
                    "font-semibold text-base transition-colors",
                    activeId === category.id ? "text-[#12B4A3]" : "text-[#1E2B4D]"
                  )}>
                    {category.name}
                  </span>
                </div>
                {activeId === category.id && (
                  <div className="w-6 h-6 rounded-full bg-[#12B4A3]/10 flex items-center justify-center animate-in zoom-in-75 duration-300">
                    <Check className="w-3.5 h-3.5 text-[#12B4A3]" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
