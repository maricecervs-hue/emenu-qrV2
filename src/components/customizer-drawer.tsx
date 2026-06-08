
"use client"

import * as React from "react"
import Image from "next/image"
import { X, Flame, Beef, Wheat, Droplets, Minus, Plus, MessageSquare } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CustomizerDrawerProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    imageHint?: string
  }
}

export function CustomizerDrawer({ isOpen, onClose, item }: CustomizerDrawerProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [variation, setVariation] = React.useState("var1")

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[92vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FA] overflow-hidden">
        <ScrollArea className="h-full">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              data-ai-hint={item.imageHint || "food dish"}
            />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
              1 / 5
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full h-8 w-8 hover:bg-white"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-slate-900" />
            </Button>
          </div>

          <div className="p-6 space-y-6 pb-32">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#1E2B4D] leading-tight">
                {item.name}
              </h2>
              <p className="text-sm text-[#8E9AAF] font-medium leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-2xl font-black text-[#1E2B4D]">฿ {item.price.toFixed(2)}</span>
                <span className="text-xs font-bold text-[#8E9AAF]">(Base Price)</span>
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="bg-white rounded-[1.5rem] p-4 flex justify-between items-center shadow-sm border border-slate-100">
              <div className="flex flex-col items-center gap-1 flex-1 border-r border-slate-100">
                <span className="text-sm font-black text-[#1E2B4D]">892</span>
                <span className="text-[10px] font-bold text-[#8E9AAF]">Kcal</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1 border-r border-slate-100">
                <span className="text-sm font-black text-[#1E2B4D]">32g</span>
                <span className="text-[10px] font-bold text-[#8E9AAF]">Protein</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1 border-r border-slate-100">
                <span className="text-sm font-black text-[#1E2B4D]">98g</span>
                <span className="text-[10px] font-bold text-[#8E9AAF]">Carbs</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1">
                <span className="text-sm font-black text-[#1E2B4D]">38g</span>
                <span className="text-[10px] font-bold text-[#8E9AAF]">Fat</span>
              </div>
            </div>

            {/* Allergen Info */}
            <div className="bg-[#FFF9E7] rounded-[1.5rem] p-5 space-y-3 border border-[#FFE8A3]/30">
              <div className="flex items-center gap-2 text-[#856404] font-bold text-sm">
                <span className="w-5 h-5 flex items-center justify-center bg-white rounded-full text-xs">!</span>
                Allergen Information
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-white border-none py-1.5 px-3 flex items-center gap-2 rounded-xl text-[#856404] font-bold shadow-sm">
                  <Wheat className="w-3.5 h-3.5" /> Gluten
                </Badge>
                <Badge variant="outline" className="bg-white border-none py-1.5 px-3 flex items-center gap-2 rounded-xl text-[#856404] font-bold shadow-sm">
                  <Droplets className="w-3.5 h-3.5" /> Dairy
                </Badge>
              </div>
            </div>

            {/* Flavor Selection */}
            <div className="bg-white rounded-[1.5rem] p-6 space-y-4 shadow-sm border border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#1E2B4D]">Flavor</h3>
                <p className="text-xs font-bold text-[#8E9AAF]">Select one option <span className="text-red-500">(Required)</span></p>
              </div>
              
              <RadioGroup value={variation} onValueChange={setVariation} className="space-y-0">
                {["Variation / Condiments 1", "Variation / Condiments 2", "Variation / Condiments 3", "Variation / Condiments 4"].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                    <Label htmlFor={`v${i}`} className="text-sm font-bold text-[#1E2B4D] cursor-pointer flex-1">
                      {v}
                    </Label>
                    <RadioGroupItem value={`var${i+1}`} id={`v${i}`} className="text-[#12B4A3] border-slate-200" />
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-[1.5rem] p-6 space-y-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#8E9AAF]" />
                <h3 className="text-lg font-black text-[#1E2B4D]">Special requests</h3>
              </div>
              <p className="text-xs text-[#8E9AAF] font-medium leading-relaxed">
                We'll pass your special request to the restaurant, and they'll do their best to follow it.
              </p>
              <div className="relative">
                <Textarea 
                  placeholder="For example: less spicy, no sugar, etc."
                  className="min-h-[100px] rounded-2xl border-slate-100 bg-[#F8F9FA] focus:ring-[#12B4A3] p-4 text-sm font-medium"
                  maxLength={150}
                />
                <span className="absolute bottom-3 right-3 text-[10px] font-bold text-[#8E9AAF]">0/150</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 w-full bg-white p-6 border-t border-slate-50 flex items-center gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-6 bg-[#F8F9FA] px-4 py-3 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-[#1E2B4D] hover:text-[#12B4A3] transition-colors"
            >
              <Minus className="w-4 h-4" strokeWidth={3} />
            </button>
            <span className="text-lg font-black text-[#1E2B4D] min-w-[20px] text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#1E2B4D] hover:text-[#12B4A3] transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
          <Button 
            className="flex-1 h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-black text-lg shadow-xl shadow-[#12B4A3]/20 transition-all active:scale-[0.98]"
            onClick={onClose}
          >
            Add • ฿ {(item.price * quantity).toFixed(2)}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
