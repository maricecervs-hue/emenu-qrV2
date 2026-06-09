'use client';

import * as React from "react"
import Image from "next/image"
import { X, Crown, Check, User, Mail, Phone, ArrowRight } from "lucide-react"
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

interface VipDrawerProps {
  isOpen: boolean
  onClose: () => void
  onDismiss: () => void
  onSignUp: (data: any) => void
}

export function VipDrawer({ isOpen, onClose, onDismiss, onSignUp }: VipDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[95vh] rounded-t-[2.5rem] p-0 border-none bg-[#FCFBF5] overflow-hidden shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>VIP Club</SheetTitle>
          <SheetDescription>Join our VIP circle for exclusive deals.</SheetDescription>
        </SheetHeader>

        {/* Top Header Bar */}
        <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-50 z-20 relative">
          <div className="flex items-center gap-2 text-[#12B4A3] font-bold text-sm">
            <Crown className="w-4 h-4 fill-[#12B4A3]" />
            VIP Club
          </div>
          <button 
            onClick={onDismiss}
            className="text-[#8E9AAF] font-semibold text-sm hover:text-slate-600 transition-colors"
          >
            Not for now
          </button>
        </div>

        <ScrollArea className="h-full">
          <div className="flex flex-col pb-32">
            {/* Hero Image Section */}
            <div className="relative w-full h-[30vh]">
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
            <div className="relative px-6 -mt-16 z-10">
              <div className="bg-white rounded-[2.5rem] p-8 pb-10 shadow-[0_15px_50px_rgba(0,0,0,0.08)] flex flex-col items-center">
                {/* Floating Crown Badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#F97316] rounded-full border-[6px] border-white flex items-center justify-center shadow-lg">
                  <Crown className="w-8 h-8 text-white fill-white" />
                </div>

                <div className="pt-8 text-center space-y-3 mb-10">
                  <h2 className="text-[2rem] font-bold text-[#1E2B4D] tracking-tight leading-none">Save Before You Pay</h2>
                  <p className="text-sm font-medium text-[#8E9AAF] leading-relaxed max-w-[260px] mx-auto">
                    Join our <span className="text-[#1E2B4D] font-bold">VIP circle</span> for member-only deals on this order and future visits.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="w-full space-y-4 mb-10 px-2">
                  {[
                    { text: 'Unlock <span class="font-bold text-[#1E2B4D]">exclusive</span> restaurant deals' },
                    { text: 'Get <span class="font-bold text-[#1E2B4D]">special offers</span> instantly' },
                    { text: 'Receive <span class="font-bold text-[#1E2B4D]">VIP dining</span> discounts' },
                    { text: 'Grab <span class="font-bold text-[#1E2B4D]">exclusive vouchers</span> fast' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#E9FBF9] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#12B4A3]" strokeWidth={3} />
                      </div>
                      <span 
                        className="text-sm font-medium text-[#8E9AAF]" 
                        dangerouslySetInnerHTML={{ __html: item.text }}
                      />
                    </div>
                  ))}
                </div>

                {/* Form Inputs */}
                <div className="w-full space-y-4">
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#12B4A3] transition-colors" />
                    <Input 
                      placeholder="Full Name" 
                      className="h-[4.5rem] pl-14 rounded-2xl border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-[#12B4A3] font-semibold text-[#1E2B4D] placeholder:text-slate-300 text-base"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#12B4A3] transition-colors" />
                    <Input 
                      placeholder="Email Address" 
                      className="h-[4.5rem] pl-14 rounded-2xl border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-[#12B4A3] font-semibold text-[#1E2B4D] placeholder:text-slate-300 text-base"
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#12B4A3] transition-colors" />
                    <Input 
                      placeholder="Phone Number (Optional)" 
                      className="h-[4.5rem] pl-14 rounded-2xl border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-[#12B4A3] font-semibold text-[#1E2B4D] placeholder:text-slate-300 text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="px-6 space-y-6 mt-8 flex flex-col items-center">
              <Button 
                className="w-full h-16 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-bold text-lg shadow-xl shadow-[#12B4A3]/20 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                onClick={() => onSignUp({})}
              >
                Sign Me Up For Exclusive Deals
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <button 
                onClick={onDismiss}
                className="text-[#8E9AAF] font-bold text-base hover:text-[#1E2B4D] transition-colors pb-10"
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
