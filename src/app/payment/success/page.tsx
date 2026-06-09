
'use client';

import * as React from "react"
import Link from "next/link"
import { Check, Mail, Download, Heart, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function PaymentSuccessPage() {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const appreciationRef = React.useRef<HTMLDivElement>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)

  const ratings = [
    { label: "Poor", emoji: "😔" },
    { label: "Fair", emoji: "😐" },
    { label: "Good", emoji: "😊" },
    { label: "Great", emoji: "😃" },
    { label: "Excellent", emoji: "🤩" },
  ]

  useGSAP(() => {
    if (selectedRating !== null && gridRef.current) {
      const items = gridRef.current.querySelectorAll('.rating-item')
      const selectedItem = items[selectedRating] as HTMLElement
      
      // Animate the unselected items away
      items.forEach((item, index) => {
        if (index !== selectedRating) {
          gsap.to(item, {
            opacity: 0,
            scale: 0.5,
            y: 20,
            duration: 0.4,
            pointerEvents: 'none',
            ease: "power2.inOut"
          })
        }
      })

      // Calculate centering for the selected item
      // We want to move it to the horizontal center of the gridRef
      const gridRect = gridRef.current.getBoundingClientRect()
      const itemRect = selectedItem.getBoundingClientRect()
      const xOffset = (gridRect.left + gridRect.width / 2) - (itemRect.left + itemRect.width / 2)

      gsap.to(selectedItem, {
        x: xOffset,
        scale: 1.3,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.1
      })

      // Fade in appreciation message
      if (appreciationRef.current) {
        gsap.fromTo(appreciationRef.current,
          { opacity: 0, y: 10, display: 'none' },
          { opacity: 1, y: 0, display: 'flex', duration: 0.5, delay: 0.5, ease: "power2.out" }
        )
      }
    } else if (selectedRating === null && gridRef.current) {
      // Reset animation
      const items = gridRef.current.querySelectorAll('.rating-item')
      gsap.to(items, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05
      })

      if (appreciationRef.current) {
        gsap.to(appreciationRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          onComplete: () => {
            if (appreciationRef.current) appreciationRef.current.style.display = 'none'
          }
        })
      }
    }
  }, { scope: containerRef, dependencies: [selectedRating] })

  return (
    <main className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center p-6 font-body" ref={containerRef}>
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center overflow-hidden">
        
        {/* Success Icon */}
        <div className="w-24 h-24 bg-[#E9FBF9] rounded-full flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-[#12B4A3] rounded-full flex items-center justify-center shadow-lg shadow-[#12B4A3]/20">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-[2rem] font-bold text-[#1E2B4D] tracking-tight leading-none">Payment Successful!</h1>
          <p className="text-[#8E9AAF] font-medium">Thank you for dining with us</p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-slate-200 mb-10" />

        {/* Experience Section */}
        <div className="w-full text-center space-y-6 mb-10 relative min-h-[140px]">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#1E2B4D]">
              {selectedRating === null ? "How was your experience?" : "Thank you for the rating!"}
            </h2>
            <p className="text-xs font-semibold text-[#8E9AAF]">
              {selectedRating === null ? "Your feedback helps us improve" : "We've received your feedback"}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full pt-2" ref={gridRef}>
            {ratings.map((rating, index) => (
              <button
                key={index}
                onClick={() => setSelectedRating(index)}
                className={cn(
                  "rating-item flex flex-col items-center gap-2 p-2 rounded-2xl border transition-all duration-200",
                  selectedRating === index 
                    ? "bg-[#E9FBF9] border-[#12B4A3] z-10" 
                    : "bg-white border-slate-100 hover:border-slate-200"
                )}
              >
                <span className="text-3xl">{rating.emoji}</span>
                <span className={cn(
                  "text-[10px] font-bold",
                  selectedRating === index ? "text-[#12B4A3]" : "text-slate-400"
                )}>
                  {rating.label}
                </span>
              </button>
            ))}
          </div>

          {selectedRating !== null && (
            <button 
              onClick={() => setSelectedRating(null)}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-[#12B4A3] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Change Rating
            </button>
          )}
        </div>

        {/* Appreciation Footer - Now Conditional with GSAP Animation */}
        <div 
          ref={appreciationRef}
          className="items-center justify-center gap-2 mb-10 hidden opacity-0"
        >
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="text-[11px] font-bold text-[#8E9AAF] uppercase tracking-wider">We appreciate your feedback</span>
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

          <Button 
            variant="outline" 
            className="w-full h-14 rounded-2xl border-2 border-[#12B4A3] text-[#12B4A3] font-bold flex items-center justify-center gap-3 hover:bg-[#12B4A3]/5"
          >
            <Download className="w-5 h-5" />
            Download
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
