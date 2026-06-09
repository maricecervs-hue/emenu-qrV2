'use client';

import * as React from "react"
import { X, ChevronLeft, Package, Coffee, Pizza, Beef, Pencil, Users } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CartItem {
  id: string
  cartId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  customizations?: string
}

interface CheckoutDrawerProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  subtotal: number
  items: CartItem[]
}

export function CheckoutDrawer({ isOpen, onClose, onBack, subtotal, items }: CheckoutDrawerProps) {
  const [selectedTip, setSelectedTip] = React.useState<number | 'custom' | null>(4)
  const [customTipValue, setCustomTipValue] = React.useState<string>("")
  
  const tax = subtotal * 0.18 // Matching the 18% approx in the screenshot
  
  const tipAmount = React.useMemo(() => {
    if (selectedTip === 'custom') {
      return parseFloat(customTipValue) || 0
    }
    return typeof selectedTip === 'number' ? selectedTip : 0
  }, [selectedTip, customTipValue])

  const total = subtotal + tax + tipAmount

  const tips = [
    { amount: 2, label: 'AED 2', icon: <Coffee className="w-5 h-5" /> },
    { amount: 4, label: 'AED 4', icon: <Pizza className="w-5 h-5" />, popular: true },
    { amount: 8, label: 'AED 8', icon: <Beef className="w-5 h-5" /> },
    { amount: 'custom', label: 'Custom', icon: <Pencil className="w-5 h-5" /> },
  ] as const

  const handleClearTip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTip(null)
    setCustomTipValue("")
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[95vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FA] overflow-hidden shadow-2xl flex flex-col">
        <SheetHeader className="sr-only">
          <SheetTitle>Payment</SheetTitle>
          <SheetDescription>Complete your order and payment.</SheetDescription>
        </SheetHeader>

        {/* Header */}
        <div className="bg-white px-6 pt-8 pb-4 flex items-center justify-between shrink-0 border-b border-slate-50">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10 hover:bg-slate-50 transition-colors"
            onClick={onBack}
          >
            <ChevronLeft className="h-6 w-6 text-slate-800" />
          </Button>
          <h2 className="text-xl font-bold text-[#1E2B4D] tracking-tight">Payment</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10 hover:bg-slate-50 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-slate-400" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 pb-40 space-y-10">
            
            {/* Order Items Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Package className="w-4 h-4 text-[#12B4A3]" />
                </div>
                <h3 className="text-lg font-bold text-[#1E2B4D]">Review Order</h3>
              </div>
              
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.cartId} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#12B4A3] bg-[#E9FBF9] px-2 py-0.5 rounded-md">{item.quantity}x</span>
                        <h4 className="font-bold text-[#1E2B4D] text-sm">{item.name}</h4>
                      </div>
                      {item.customizations && (
                        <p className="text-[10px] font-medium text-[#8E9AAF] leading-relaxed pl-8 italic">
                          {item.customizations}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-[#1E2B4D] text-sm whitespace-nowrap">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-white p-7 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 space-y-5">
              <div className="flex justify-between items-center text-base">
                <span className="font-normal text-slate-400">Subtotal</span>
                <span className="font-semibold text-[#1E2B4D]">$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="font-normal text-slate-400">Taxes & Fees</span>
                <span className="font-semibold text-[#1E2B4D]">$ {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="font-normal text-slate-400">Tip</span>
                <span className="font-semibold text-[#1E2B4D]">AED {tipAmount.toFixed(2)}</span>
              </div>
              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-2xl font-bold text-[#1E2B4D]">Total</span>
                <span className="text-2xl font-bold text-[#1E2B4D]">$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Tipping Section */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-pink-50 rounded-full flex items-center justify-center shadow-inner border border-white">
                <span className="text-5xl animate-wave origin-[70%_70%]">👋</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1E2B4D]">Thank your server?</h3>
                <p className="text-sm font-semibold text-slate-400 max-w-[280px] leading-relaxed mx-auto">
                  Your small act of kindness goes a long way. 100% of tips go to the staff.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 w-full pt-4">
                {tips.map((tip) => {
                  const isSelected = selectedTip === tip.amount
                  const isCustom = tip.amount === 'custom'

                  return (
                    <button
                      key={tip.label}
                      onClick={() => setSelectedTip(isCustom ? 'custom' : tip.amount)}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 h-28",
                        isSelected 
                          ? "bg-[#E9FBF9] border-[#12B4A3] text-[#12B4A3]" 
                          : "bg-white border-slate-100 text-slate-400 shadow-sm hover:border-slate-200"
                      )}
                    >
                      {/* Popular Badge */}
                      {!isCustom && tip.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#12B4A3] text-white text-[8px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10">
                          Popular
                        </div>
                      )}

                      {/* Remove Tip Button */}
                      {isSelected && (
                        <div 
                          onClick={handleClearTip}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF5C5C] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-transform z-20"
                        >
                          <X className="w-3 h-3" strokeWidth={3} />
                        </div>
                      )}

                      {isCustom && isSelected ? (
                        <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                          <span className="text-[10px] font-bold text-[#12B4A3] mb-1">Enter Tip</span>
                          <div className="flex items-center gap-1 border-b border-[#12B4A3] pb-1">
                            <span className="text-xs font-bold text-[#1E2B4D]">AED</span>
                            <Input 
                              type="number" 
                              value={customTipValue}
                              onChange={(e) => setCustomTipValue(e.target.value)}
                              className="border-none bg-transparent h-auto p-0 text-sm font-bold text-[#1E2B4D] w-12 focus-visible:ring-0 text-center"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mb-1",
                            isSelected ? "bg-[#12B4A3]/10" : "bg-slate-50"
                          )}>
                            {tip.icon}
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-tight">{tip.label}</span>
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="bg-white p-6 border-t border-slate-100 flex gap-4 shadow-[0_-20px_60px_rgba(0,0,0,0.05)] shrink-0">
          <Button 
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-2 border-[#12B4A3] text-[#12B4A3] font-bold text-base hover:bg-[#12B4A3]/5"
          >
            <Users className="w-5 h-5 mr-2" />
            Split Bill
          </Button>
          <Button 
            className="flex-1 h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-bold text-base shadow-xl shadow-[#12B4A3]/20 transition-transform active:scale-95"
            onClick={onClose}
          >
            Pay $ {total.toFixed(2)}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
