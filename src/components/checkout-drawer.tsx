
"use client"

import * as React from "react"
import { X, ChevronLeft, Utensils, ShoppingBag, Truck, Users, Coffee, Pizza, Beef, Pencil, Check } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface CheckoutDrawerProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  subtotal: number
}

export function CheckoutDrawer({ isOpen, onClose, onBack, subtotal }: CheckoutDrawerProps) {
  const [orderType, setOrderType] = React.useState<'dine-in' | 'take-out' | 'delivery'>('dine-in')
  const [selectedTip, setSelectedTip] = React.useState<number | 'custom' | null>(4)
  
  const tax = subtotal * 0.08
  const tipAmount = typeof selectedTip === 'number' ? selectedTip : 0
  const total = subtotal + tax + tipAmount

  const orderTypes = [
    { id: 'dine-in', name: 'Dine In', icon: <Utensils className="w-6 h-6" /> },
    { id: 'take-out', name: 'Take Out', icon: <ShoppingBag className="w-6 h-6" /> },
    { id: 'delivery', name: 'Delivery', icon: <Truck className="w-6 h-6" /> },
  ] as const

  const tips = [
    { amount: 2, label: 'AED 2', icon: <Coffee className="w-5 h-5" /> },
    { amount: 4, label: 'AED 4', icon: <Pizza className="w-5 h-5" />, popular: true },
    { amount: 8, label: 'AED 8', icon: <Beef className="w-5 h-5" /> },
    { amount: 'custom', label: 'Custom', icon: <Pencil className="w-5 h-5" /> },
  ] as const

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[95vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FA] overflow-hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>Payment</SheetTitle>
          <SheetDescription>Complete your order and payment.</SheetDescription>
        </SheetHeader>

        {/* Header */}
        <div className="bg-white px-6 pt-8 pb-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10 hover:bg-slate-50"
            onClick={onBack}
          >
            <ChevronLeft className="h-6 w-6 text-slate-800" />
          </Button>
          <h2 className="text-xl font-black text-[#1E2B4D]">Payment</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10 hover:bg-slate-50"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-slate-400" />
          </Button>
        </div>

        <ScrollArea className="h-full pb-32">
          <div className="p-6 space-y-8">
            {/* Order Type */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-[#1E2B4D]">Order Type</h3>
              <div className="grid grid-cols-3 gap-3">
                {orderTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                      orderType === type.id 
                        ? "bg-[#E9FBF9] border-[#12B4A3] text-[#12B4A3]" 
                        : "bg-white border-transparent text-slate-400 shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-1",
                      orderType === type.id ? "bg-[#12B4A3]/10" : "bg-slate-50"
                    )}>
                      {type.icon}
                    </div>
                    <span className="text-xs font-black">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-400">Subtotal</span>
                <span className="font-black text-[#1E2B4D]">AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-400">Taxes & Fees</span>
                <span className="font-black text-[#1E2B4D]">AED {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-400">Tip</span>
                <span className="font-black text-[#1E2B4D]">AED {tipAmount.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-xl font-black text-[#1E2B4D]">Total</span>
                <span className="text-2xl font-black text-[#1E2B4D]">AED {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Tipping Section */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
                👋
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#1E2B4D]">Thank your server?</h3>
                <p className="text-xs font-bold text-slate-400 max-w-[240px] leading-relaxed mx-auto">
                  Your small act of kindness goes a long way. 100% of tips go to the staff.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 w-full">
                {tips.map((tip) => (
                  <button
                    key={tip.label}
                    onClick={() => setSelectedTip(tip.amount === 'custom' ? 'custom' : tip.amount)}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 h-24",
                      selectedTip === tip.amount 
                        ? "bg-[#E9FBF9] border-[#12B4A3] text-[#12B4A3]" 
                        : "bg-white border-transparent text-slate-400 shadow-sm"
                    )}
                  >
                    {tip.amount !== 'custom' && tip.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#12B4A3] text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                        Popular
                      </div>
                    )}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                      selectedTip === tip.amount ? "bg-[#12B4A3]/10" : "bg-slate-50"
                    )}>
                      {tip.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase">{tip.label}</span>
                  </button>
                ))}
              </div>

              <Button 
                variant="outline"
                className={cn(
                  "w-full h-14 rounded-2xl border-slate-200 text-slate-400 font-black text-sm transition-all",
                  selectedTip === null && "border-[#FF5C5C] text-[#FF5C5C] bg-red-50"
                )}
                onClick={() => setSelectedTip(null)}
              >
                <X className="w-4 h-4 mr-2" />
                No Tip
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="absolute bottom-0 w-full bg-white p-6 border-t border-slate-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex gap-4">
          <Button 
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-2 border-[#12B4A3] text-[#12B4A3] font-black text-sm"
          >
            <Users className="w-4 h-4 mr-2" />
            Split Bill
          </Button>
          <Button 
            className="flex-1 h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-black text-sm shadow-xl shadow-[#12B4A3]/20"
            onClick={onClose}
          >
            Pay AED {total.toFixed(2)}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
