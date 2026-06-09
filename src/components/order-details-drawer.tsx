'use client';

import * as React from "react"
import { ChevronLeft, Check, ConciergeBell, Utensils, CheckCircle2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Order {
  id: string
  orderNumber: string
  status: 'Preparing' | 'Served' | 'Completed'
  table: string
  date: string
  total: number
  items: any[]
}

interface OrderDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

export function OrderDetailsDrawer({ isOpen, onClose, order }: OrderDetailsDrawerProps) {
  if (!order) return null;

  // Calculate bill details (simulated since we only have total in localStorage)
  const total = Number(order.total);
  const tip = 0; // Default or could be stored
  const subtotal = total / 1.18; // Reverse calculation for demo
  const taxes = total - subtotal - tip;

  const steps = [
    { id: 'placed', label: 'Placed', icon: <Check className="w-5 h-5" />, active: true },
    { id: 'preparing', label: 'Preparing', icon: <ConciergeBell className="w-5 h-5" />, active: order.status === 'Preparing' || order.status === 'Served' || order.status === 'Completed' },
    { id: 'served', label: 'Served', icon: <Utensils className="w-5 h-5" />, active: order.status === 'Served' || order.status === 'Completed' },
    { id: 'completed', label: 'Completed', icon: <CheckCircle2 className="w-5 h-5" />, active: order.status === 'Completed' },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[95vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FB] overflow-hidden shadow-2xl flex flex-col">
        <SheetHeader className="sr-only">
          <SheetTitle>Order #{order.orderNumber}</SheetTitle>
          <SheetDescription>Status and bill summary for your order.</SheetDescription>
        </SheetHeader>

        {/* Header */}
        <header className="px-6 pt-8 pb-4 bg-white flex items-center justify-center relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute left-6 p-2 rounded-full hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-xl font-semibold text-[#1E2B4D]">Order #{order.orderNumber}</h1>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            
            {/* Order Status Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-slate-50 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#1E2B4D]">Order Status</h2>
                <Badge className="bg-[#E9FBF9] text-[#12B4A3] border-none rounded-full px-4 py-1.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#12B4A3] rounded-full" />
                  <span className="text-xs font-semibold">Paid</span>
                </Badge>
              </div>

              <div className="relative flex justify-between items-start px-2">
                {/* Connecting Lines */}
                <div className="absolute top-7 left-10 right-10 h-0.5 bg-slate-100 -z-0" />
                <div 
                  className="absolute top-7 left-10 h-0.5 bg-[#12B4A3] -z-0 transition-all duration-700" 
                  style={{ width: order.status === 'Preparing' ? '33%' : order.status === 'Served' ? '66%' : order.status === 'Completed' ? '100%' : '0%' }}
                />

                {steps.map((step) => (
                  <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 w-16">
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                      step.active 
                        ? "bg-[#12B4A3] border-white text-white shadow-lg shadow-[#12B4A3]/20" 
                        : "bg-[#F0FDF4] border-white text-[#B2F0E9] shadow-sm"
                    )}>
                      {step.icon}
                    </div>
                    <span className={cn(
                      "text-xs font-semibold transition-colors whitespace-nowrap",
                      step.active ? "text-[#1E2B4D]" : "text-[#8E9AAF]"
                    )}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-slate-50 space-y-6">
              <h2 className="text-2xl font-semibold text-[#1E2B4D]">Bill Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-normal text-[#8E9AAF]">Subtotal</span>
                  <span className="text-lg font-semibold text-[#8E9AAF]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-normal text-[#8E9AAF]">Taxes & Fees</span>
                  <span className="text-lg font-semibold text-[#8E9AAF]">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-normal text-[#8E9AAF]">Tip</span>
                  <span className="text-lg font-semibold text-[#8E9AAF]">${tip.toFixed(2)}</span>
                </div>
                
                <Separator className="bg-slate-50" />
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-2xl font-semibold text-[#1E2B4D]">Total</span>
                  <span className="text-2xl font-bold text-[#1E2B4D]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
