'use client';

import * as React from "react"
import { ShieldCheck, CheckCircle2, Circle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ProcessingPaymentPage() {
  const [step, setStep] = React.useState(1)

  React.useEffect(() => {
    const step1 = setTimeout(() => setStep(2), 2000)
    const step2 = setTimeout(() => setStep(3), 4500)
    return () => {
      clearTimeout(step1)
      clearTimeout(step2)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white flex flex-col items-center font-body overflow-hidden">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <header className="p-6 border-b border-slate-100 bg-white z-10">
          <h1 className="text-lg font-bold text-[#1E2B4D] text-center">Processing Payment</h1>
        </header>

        <div className="flex-1 flex flex-col items-center pt-16 px-8 space-y-12">
          
          {/* Main Spinner */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-[6px] border-[#E9F3FF]" />
            <div className="absolute inset-0 rounded-full border-[6px] border-[#3B82F6] border-t-transparent animate-spin" />
          </div>

          {/* Status Text */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-[#1E2B4D]">Processing Your Payment</h2>
            <p className="text-[#8E9AAF] font-medium leading-relaxed max-w-[280px] mx-auto">
              Please wait while we process your transaction
            </p>
          </div>

          {/* Processing Steps Card */}
          <Card className="w-full p-8 rounded-[2rem] border-none shadow-[0_20px_60px_rgba(0,0,0,0.06)] space-y-6">
            <h3 className="text-base font-bold text-[#1E2B4D]">Processing Steps</h3>
            
            <div className="space-y-5">
              {/* Step 1: Card details verified */}
              <div className="flex items-center gap-4 transition-all duration-500">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                  step >= 2 ? "bg-[#3B82F6]" : "border-2 border-[#3B82F6]"
                )}>
                  {step >= 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  step >= 1 ? "text-[#1E2B4D]" : "text-[#8E9AAF]"
                )}>
                  Card details verified
                </span>
              </div>

              {/* Step 2: Processing payment */}
              <div className="flex items-center gap-4 transition-all duration-500">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2",
                  step === 2 ? "border-[#3B82F6]" : step > 2 ? "bg-[#3B82F6] border-[#3B82F6]" : "border-slate-200"
                )}>
                  {step > 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : step === 2 ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  ) : null}
                </div>
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  step >= 2 ? "text-[#1E2B4D]" : "text-[#8E9AAF]"
                )}>
                  Processing payment
                </span>
              </div>

              {/* Step 3: Confirmation */}
              <div className="flex items-center gap-4 transition-all duration-500">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                  step >= 3 ? "border-2 border-[#3B82F6]" : "bg-slate-100"
                )}>
                  {step === 3 && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  step >= 3 ? "text-[#1E2B4D]" : "text-[#8E9AAF]"
                )}>
                  Confirmation
                </span>
              </div>
            </div>
          </Card>

          {/* Secure Badge Section */}
          <div className="flex flex-col items-center space-y-2 pt-4">
            <div className="flex items-center gap-2 text-[#3B82F6]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold">Secure Transaction</span>
            </div>
            <p className="text-[11px] font-semibold text-[#8E9AAF]">
              Your payment is protected by bank-level encryption
            </p>
          </div>
        </div>

        {/* Footer Processing Indicator */}
        <footer className="p-8 flex items-center justify-center border-t border-slate-50 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-bounce" />
            </div>
            <span className="text-sm font-bold text-[#8E9AAF]">Processing payment...</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
