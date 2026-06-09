'use client';

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Crown, Check, User, Mail, Phone, ArrowRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface VipDrawerProps {
  isOpen: boolean
  onClose: () => void
  onDismiss: () => void
  onSignUp: (data: any) => void
  total: number
}

export function VipDrawer({ isOpen, onClose, onDismiss, onSignUp, total }: VipDrawerProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDismiss = () => {
    onDismiss()
    router.push(`/payment?total=${total.toFixed(2)}`)
  }

  const handleSignUp = () => {
    toast({
      title: "Welcome to the VIP Club!",
      description: "You've successfully signed up for exclusive deals.",
    })
    onSignUp({})
    router.push(`/payment?total=${total.toFixed(2)}`)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[92vh] rounded-t-[2.5rem] p-0 border-none bg-[#FCFBF5] overflow-hidden shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>VIP Club</SheetTitle>
          <SheetDescription>Join our VIP circle for exclusive deals.</SheetDescription>
        </SheetHeader>

        {/* Top Header Bar */}
        <div className="px-6 py-3 flex items-center justify-between bg-white border-b border-slate-50 z-20 relative">
          <div className="flex items-center gap-2 text-[#12B4A3] font-bold text-xs uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 fill-[#12B4A3]" />
            VIP Club
          </div>
          <button 
            onClick={handleDismiss}
            className="text-[#8E9AAF] font-bold text-xs hover:text-slate-600 transition-colors"
          >
            Not for now
          </button>
        </div>

        <ScrollArea className="h-full">
          <div className="flex flex-col pb-20">
            {/* Hero Image Section - Condensed */}
            <div className="relative w-full h-[22vh]">
              <Image 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2340&auto=format&fit=crop"
                alt="VIP Background"
                fill
                className="object-cover"
                data-ai-hint="fresh salad"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Overlapping Card Section */}
            <div className="relative px-5 -mt-10 z-10">
              <div className="bg-white rounded-[2rem] p-6 pb-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col items-center">
                {/* Floating Crown Badge - Condensed */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#F97316] rounded-full border-[5px] border-white flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-white fill-white" />
                </div>

                <div className="pt-6 text-center space-y-2 mb-6">
                  <h2 className="text-2xl font-bold text-[#1E2B4D] tracking-tight leading-tight">Save Before You Pay</h2>
                  <p className="text-xs font-semibold text-[#8E9AAF] leading-relaxed max-w-[240px] mx-auto">
                    Join our <span className="text-[#1E2B4D] font-bold">VIP circle</span> for member-only deals on this order and future visits.
                  </p>
                </div>

                {/* Benefits List - Condensed */}
                <div className="w-full space-y-3 mb-8 px-1">
                  {[
                    { text: 'Unlock <span class="font-bold text-[#1E2B4D]">exclusive</span> restaurant deals' },
                    { text: 'Get <span class="font-bold text-[#1E2B4D]">special offers</span> instantly' },
                    { text: 'Receive <span class="font-bold text-[#1E2B4D]">VIP dining</span> discounts' },
                    { text: 'Grab <span class="font-bold text-[#1E2B4D]">exclusive vouchers</span> fast' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#E9FBF9] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#12B4A3]" strokeWidth={3} />
                      </div>
                      <span 
                        className="text-[11px] font-semibold text-[#8E9AAF]" 
                        dangerouslySetInnerHTML={{ __html: item.text }}
                      />
                    </div>
                  ))}
                </div>

                {/* Form Inputs - Streamlined */}
                <div className="w-full space-y-3">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#12B4A3] transition-colors" />
                    <Input 
                      placeholder="Full Name" 
                      className="h-14 pl-12 rounded-xl border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-[#12B4A3] font-bold text-[#1E2B4D] placeholder:text-slate-300 text-sm"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#12B4A3] transition-colors" />
                    <Input 
                      placeholder="Email Address" 
                      className="h-14 pl-12 rounded-xl border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-[#12B4A3] font-bold text-[#1E2B4D] placeholder:text-slate-300 text-sm"
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#12B4A3] transition-colors" />
                    <Input 
                      placeholder="Phone Number (Optional)" 
                      className="h-14 pl-12 rounded-xl border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-[#12B4A3] font-bold text-[#1E2B4D] placeholder:text-slate-300 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 space-y-4 mt-6 flex flex-col items-center">
              <Button 
                className="w-full h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-bold text-base shadow-lg shadow-[#12B4A3]/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                onClick={handleSignUp}
              >
                Sign Me Up For Exclusive Deals
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <button 
                onClick={handleDismiss}
                className="text-[#8E9AAF] font-bold text-sm hover:text-[#1E2B4D] transition-colors pb-6"
              >
                Not for now
              </button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
