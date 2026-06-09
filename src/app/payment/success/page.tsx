'use client';

import * as React from "react"
import Link from "next/link"
import { Check, Mail, Clock, UtensilsCrossed, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function PaymentSuccessPage() {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const successCardRef = React.useRef<HTMLDivElement>(null)
  const headerTextRef = React.useRef<HTMLDivElement>(null)

  const ratings = [
    { label: "Poor", emoji: "😔" },
    { label: "Fair", emoji: "😐" },
    { label: "Good", emoji: "😊" },
    { label: "Great", emoji: "😃" },
    { label: "Excellent", emoji: "🤩" },
  ]

  const orderSteps = [
    { id: 1, label: "Confirmed", icon: <Check className="w-3.5 h-3.5" />, active: true },
    { id: 2, label: "Kitchen", icon: <UtensilsCrossed className="w-3.5 h-3.5" />, active: false },
    { id: 3, label: "Ready", icon: <Bell className="w-3.5 h-3.5" />, active: false },
  ]

  useGSAP(() => {
    if (selectedRating !== null) {
      const tl = gsap.timeline();

      // Fade out the current feedback header and the emoji grid
      tl.to([headerTextRef.current, gridRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (headerTextRef.current) headerTextRef.current.style.display = 'none';
          if (gridRef.current) gridRef.current.style.display = 'none';
        }
      });

      // Fade in the new "Thanks for your Rating" card
      tl.fromTo(successCardRef.current,
        { opacity: 0, y: 10, display: 'none' },
        { 
          opacity: 1, 
          y: 0, 
          display: 'flex', 
          duration: 0.6, 
          ease: "back.out(1.2)" 
        }
      );
    }
  }, { scope: containerRef, dependencies: [selectedRating] })

  return (
    <main className="min-h-screen bg-[#F4F8FB] flex items-center justify-center p-6 font-body" ref={containerRef}>
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center overflow-hidden">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#E9FBF9] rounded-full flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-[#12B4A3] rounded-full flex items-center justify-center shadow-lg shadow-[#12B4A3]/20">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-[1.75rem] font-bold text-[#1E2B4D] tracking-tight leading-none">Payment Successful!</h1>
          <p className="text-[#8E9AAF] font-medium text-sm">Your order #1284 is confirmed</p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-slate-200 mb-8" />

        {/* Order Status Timeline (Top Priority) */}
        <div className="w-full bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100/50 mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1E2B4D]">Order Status</h3>
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-slate-100 shadow-sm">
              <Clock className="w-3 h-3 text-[#12B4A3]" />
              <span className="text-[10px] font-bold text-[#1E2B4D]">Est. 15-20 min</span>
            </div>
          </div>

          <div className="relative flex justify-between items-center px-2">
            <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 rounded-full" />
            <div className="absolute top-5 left-8 w-[25%] h-1 bg-[#12B4A3] rounded-full transition-all duration-1000" />

            {orderSteps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-[3px] transition-all duration-500",
                  step.active 
                    ? "bg-[#12B4A3] border-white shadow-[0_0_15px_rgba(18,180,163,0.3)] scale-110" 
                    : "bg-white border-slate-100"
                )}>
                  <div className={cn(
                    "transition-colors",
                    step.active ? "text-white" : "text-slate-300"
                  )}>
                    {step.icon}
                  </div>
                  {step.active && (
                    <div className="absolute inset-0 rounded-full bg-[#12B4A3] animate-ping opacity-20" />
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-tight transition-colors",
                  step.active ? "text-[#1E2B4D]" : "text-slate-300"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="w-full text-center min-h-[160px] flex flex-col items-center justify-center mb-8 relative">
          
          {/* Header text before selection */}
          <div ref={headerTextRef} className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-[#1E2B4D]">How was your experience?</h2>
            <p className="text-[11px] font-semibold text-[#8E9AAF]">Your feedback helps us improve</p>
          </div>

          {/* Grid before selection */}
          <div className="grid grid-cols-5 gap-2 w-full" ref={gridRef}>
            {ratings.map((rating, index) => (
              <button
                key={index}
                onClick={() => setSelectedRating(index)}
                className="flex flex-col items-center justify-center gap-2 p-2 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-300 active:scale-95"
              >
                <span className="text-2xl">{rating.emoji}</span>
                <span className="text-[9px] font-bold text-slate-400">
                  {rating.label}
                </span>
              </button>
            ))}
          </div>

          {/* New Custom "Thanks for your Rating" Card (100% Match to Design) */}
          <div 
            ref={successCardRef} 
            className="hidden w-full bg-[#F9FDF2] rounded-[2.5rem] p-8 border border-[#E9F3D7] flex-col items-center justify-center space-y-4 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#849F4E] tracking-tight text-center">
              Thanks for your Rating!
            </h2>
            <div className="w-full border-t border-dashed border-[#DCE8C5]" />
            <button className="text-lg font-bold text-[#3A5D3E] underline decoration-slate-300 decoration-1 underline-offset-[6px]">
              Leave a review on Google
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-14 rounded-2xl border-2 border-[#12B4A3] text-[#12B4A3] font-bold flex items-center justify-center gap-3 hover:bg-[#12B4A3]/5"
          >
            <Mail className="w-5 h-5" />
            Email Receipt
          </Button>

          <Link href="/" className="block pt-2">
            <Button className="w-full h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-bold text-lg shadow-xl shadow-[#12B4A3]/20 transition-transform active:scale-95">
              Done
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
