'use client';

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ShieldCheck, ChevronDown, CreditCard, Building2, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = React.useState(true)
  const total = searchParams.get('total') || '326.00'

  // Form state
  const [formData, setFormData] = React.useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const isFormValid = React.useMemo(() => {
    return (
      formData.cardNumber.trim().length >= 12 &&
      formData.expiryDate.trim().length >= 4 &&
      formData.cvv.trim().length >= 3 &&
      formData.cardholderName.trim().length > 0 &&
      formData.email.trim().includes('@')
    )
  }, [formData])

  React.useEffect(() => {
    // Simulate the redirection delay before showing the payment form
    const timer = setTimeout(() => {
      setIsRedirecting(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleProcessPayment = () => {
    router.push(`/payment/processing?total=${total}`)
  }

  if (isRedirecting) {
    return (
      <main className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center p-6 font-body">
        <div className="w-full max-w-md flex flex-col items-center space-y-12">
          {/* Custom Circular Preloader */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]" />
            <div className="absolute inset-0 rounded-full border-4 border-[#3B82F6] border-t-transparent animate-spin" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-[#1E2B4D]">Redirecting Payment</h1>
            <p className="text-[#8E9AAF] font-medium">Please wait a moment...</p>
          </div>

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

          <div className="flex items-center gap-2 text-[#8E9AAF]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Secure payment</span>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center font-body">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-xl">
        {/* Network Header */}
        <header className="p-8 flex justify-center items-center">
          <div className="flex items-center gap-1">
            <span className="text-[28px] font-bold text-[#005CB9] tracking-tight">network</span>
            <span className="text-[28px] font-light text-[#E11D48] tracking-tight -ml-0.5">&gt;</span>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="px-6 pb-24 space-y-4">
            
            {/* Merchant Card */}
            <Card className="p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E9F3FF] rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1E2B4D]">Network International</span>
                  <span className="text-[10px] font-semibold text-[#8E9AAF]">Secure payment gateway</span>
                </div>
              </div>
              
              <div className="bg-[#F8FAFC] rounded-xl p-4 flex justify-between items-center">
                <span className="text-xs font-semibold text-[#8E9AAF]">Total Amount</span>
                <span className="text-lg font-bold text-[#1E2B4D]">AED {total}</span>
              </div>
            </Card>

            {/* Card Information Section */}
            <Card className="p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-[#1E2B4D]">Card Information</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-[11px] font-bold text-[#1E2B4D] uppercase tracking-wide">Card Number</Label>
                  <div className="relative">
                    <Input 
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456" 
                      className="h-12 border-slate-200 rounded-xl font-medium text-slate-800"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-80">
                      <div className="w-7 h-4 bg-[#1A1F71] rounded-sm flex items-center justify-center text-[6px] text-white italic font-bold">VISA</div>
                      <div className="flex">
                        <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-80" />
                        <div className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-2 opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-[11px] font-bold text-[#1E2B4D] uppercase tracking-wide">Expiry Date</Label>
                    <Input 
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY" 
                      className="h-12 border-slate-200 rounded-xl font-medium text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-[11px] font-bold text-[#1E2B4D] uppercase tracking-wide">CVV</Label>
                    <Input 
                      id="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123" 
                      className="h-12 border-slate-200 rounded-xl font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="text-[11px] font-bold text-[#1E2B4D] uppercase tracking-wide">Cardholder Name</Label>
                  <Input 
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    placeholder="John Smith" 
                    className="h-12 border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>
            </Card>

            {/* Billing Address Section */}
            <Card className="p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-[#1E2B4D]">Billing Address</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[11px] font-bold text-[#1E2B4D] uppercase tracking-wide">Email Address</Label>
                  <Input 
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com" 
                    className="h-12 border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-[#1E2B4D] uppercase tracking-wide">Country</Label>
                  <Select defaultValue="uae">
                    <SelectTrigger className="h-12 border-slate-200 rounded-xl font-medium text-slate-800">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uae">United Arab Emirates</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Secure Badge */}
            <div className="bg-[#F0FDF4] rounded-xl p-4 flex items-center gap-3 border border-[#DCFCE7]">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#166534]">Secure Payment</span>
                <span className="text-[10px] font-medium text-[#166534]/70 leading-tight">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Footer Pay Button */}
        <div className="p-6 border-t border-slate-50 bg-white">
          <Button 
            disabled={!isFormValid}
            onClick={handleProcessPayment}
            className="w-full h-14 bg-[#0069B4] hover:bg-[#005CA0] disabled:bg-slate-200 disabled:text-slate-400 rounded-xl text-white font-bold text-base shadow-lg shadow-blue-900/10 transition-colors"
          >
            Pay AED {total}
          </Button>
        </div>
      </div>
    </main>
  )
}
