'use client';

import * as React from "react"
import Link from "next/link"
import { Check, Mail, Download, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PaymentSuccessPage() {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null)

  const ratings = [
    { label: "Poor", emoji: "😔" },
    { label: "Fair", emoji: "😐" },
    { label: "Good", emoji: "😊" },
    { label: "Great", emoji: "😃" },
    { label: "Excellent", emoji: "🤩" },
  ]

  return (
    <main className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center p-6 font-body">
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
        <div className="w-full text-center space-y-6 mb-10">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#1E2B4D]">How was your experience?</h2>
            <p className="text-xs font-semibold text-[#8E9AAF]">Your feedback helps us improve</p>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full">
            {ratings.map((rating, index) => (
              <button
                key={index}
                onClick={() => setSelectedRating(index)}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-2xl border transition-all duration-200",
                  selectedRating === index 
                    ? "bg-[#E9FBF9] border-[#12B4A3] scale-105" 
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
        </div>

        {/* Appreciation Footer */}
        <div className="flex items-center justify-center gap-2 mb-10">
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
