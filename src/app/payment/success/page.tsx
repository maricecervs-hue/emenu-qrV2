
'use client';

import * as React from "react"
import Link from "next/link"
import { Check, Mail, Download, Heart } from "lucide-react"
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
      const gridRect = gridRef.current.getBoundingClientRect()
      const itemRect = selectedItem.getBoundingClientRect()
      const xOffset = (gridRect.left + gridRect.width / 2) - (itemRect.left + itemRect.width / 2)

      // Transform the selected item into the tall card style from the design
      gsap.to(selectedItem, {
        x: xOffset,
        scale: 1.1,
        height: "160px",
        width: "100px",
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.05)",
        borderRadius: "2.5rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        duration: 0.6,
        ease: "back.out(1.2)",
        delay: 0.1
      })

      // Scale up the emoji specifically
      const emoji = selectedItem.querySelector('.emoji-span')
      if (emoji) {
        gsap.to(emoji, {
          scale: 1.5,
          duration: 0.6,
          ease: "back.out(1.2)",
          delay: 0.1
        })
      }

      // Fade in appreciation message
      if (appreciationRef.current) {
        gsap.fromTo(appreciationRef.current,
          { opacity: 0, y: 10, display: 'none' },
          { opacity: 1, y: 0, display: 'flex', duration: 0.5, delay: 0.5, ease: "power2.out" }
        )
      }
    }
  }, { scope: containerRef, dependencies: [selectedRating] })

  return (
    <main className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center p-6 font-body" ref={containerRef}>
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center overflow-hidden">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#E9FBF9] rounded-full flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-[#12B4A3] rounded-full flex items-center justify-center shadow-lg shadow-[#12B4A3]/20">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-[1.75rem] font-bold text-[#1E2B4D] tracking-tight leading-none">Payment Successful!</h1>
          <p className="text-[#8E9AAF] font-medium text-sm">Thank you for dining with us</p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-slate-200 mb-8" />

        {/* Experience Section */}
        <div className="w-full text-center space-y-6 mb-8 relative min-h-[180px] flex flex-col items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#1E2B4D]">
              {selectedRating === null ? "How was your experience?" : "Thank you for the rating!"}
            </h2>
            <p className="text-[11px] font-semibold text-[#8E9AAF]">
              {selectedRating === null ? "Your feedback helps us improve" : "We've received your feedback"}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full pt-4 relative h-full" ref={gridRef}>
            {ratings.map((rating, index) => (
              <button
                key={index}
                disabled={selectedRating !== null}
                onClick={() => setSelectedRating(index)}
                className={cn(
                  "rating-item flex flex-col items-center justify-center gap-3 p-2 rounded-2xl border transition-all duration-300",
                  selectedRating === index 
                    ? "bg-white border-slate-100 z-10" 
                    : "bg-white border-slate-100 hover:border-slate-200",
                  selectedRating !== null && selectedRating !== index && "opacity-0 pointer-events-none"
                )}
              >
                <span className="emoji-span text-3xl transition-transform">{rating.emoji}</span>
                <span className={cn(
                  "text-[10px] font-bold",
                  selectedRating === index ? "text-[#1E2B4D]" : "text-slate-400"
                )}>
                  {rating.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Appreciation Footer - Now Conditional with GSAP Animation */}
        <div 
          ref={appreciationRef}
          className="items-center justify-center gap-2 mb-8 hidden opacity-0"
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
