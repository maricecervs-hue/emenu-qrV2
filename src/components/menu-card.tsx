"use client"

import Image from "next/image"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface MenuCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  customisable?: boolean
}

export function MenuCard({ name, description, price, imageUrl, customisable }: MenuCardProps) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="flex bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.04)] border border-slate-50 min-h-[160px]">
      {/* Content Side */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-[#1E2B4D] leading-tight text-lg">
            {name}
          </h3>
          <p className="text-xs text-[#8E9AAF] font-medium line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 pt-2">
          <span className="text-[#1E2B4D] font-black text-xl">฿</span>
          <span className="text-[#1E2B4D] font-black text-xl">{price.toFixed(2)}</span>
        </div>
      </div>

      {/* Image Side */}
      <div className="w-[140px] relative">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="140px"
        />
        
        {/* Overlay Controls - Bottom Centered */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-4 bg-gradient-to-t from-black/40 to-transparent pt-12">
          {quantity > 0 ? (
            <div className="bg-white rounded-full flex items-center gap-4 px-3 py-2 shadow-xl animate-in zoom-in-75 duration-200">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full text-red-500 hover:bg-red-50 p-0"
                onClick={() => setQuantity(q => q - 1)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <span className="text-base font-bold text-[#1E2B4D]">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full text-[#12B4A3] hover:bg-[#12B4A3]/10 p-0"
                onClick={() => setQuantity(q => q + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 w-[85%]">
              <Button 
                className="w-full h-10 rounded-full bg-[#12B4A3] hover:bg-[#109e8f] text-white font-bold text-base shadow-lg transition-transform active:scale-95"
                onClick={() => setQuantity(1)}
              >
                Add
              </Button>
              {customisable && (
                <span className="text-[11px] font-bold text-white drop-shadow-lg tracking-wide">
                  Customisable
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
