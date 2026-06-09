'use client';

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ShieldCheck, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const total = searchParams.get('total') || '0.00'

  return (
    <main className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center p-6 font-body">
      <div className="w-full max-w-md flex flex-col items-center space-y-12">
        
        {/* Custom Circular Preloader */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]" />
          <div className="absolute inset-0 rounded-full border-4 border-[#3B82F6] border-t-transparent animate-spin" />
        </div>

        {/* Text Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#1E2B4D]">Redirecting Payment</h1>
          <p className="text-[#8E9AAF] font-medium">Please wait a moment...</p>
        </div>

        {/* Payment Gateway Card */}
        <Card className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border-none p-8 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[#8E9AAF]">Amount</span>
            <span className="text-xl font-bold text-[#1E2B4D]">AED {total}</span>
          </div>
          
          <div className="h-px bg-slate-100" />

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#005CB9] flex items-center justify-center shrink-0">
              <div className="w-6 h-6 rounded-full border-2 border-white border-r-transparent animate-spin" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1E2B4D]">Connecting to payment gateway</span>
              <span className="text-xs font-semibold text-[#8E9AAF]">Network International</span>
            </div>
          </div>
        </Card>

        {/* Secure Footer */}
        <div className="flex items-center gap-2 text-[#8E9AAF]">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-semibold">Secure payment</span>
        </div>
      </div>
    </main>
  )
}
