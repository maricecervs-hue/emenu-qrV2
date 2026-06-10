'use client';

import * as React from "react"
import Image from "next/image"
import { ShoppingBasket, Plus, Minus, Trash2, Pencil, Ticket, ChevronRight, X } from "lucide-react"
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
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

interface CartItem {
  id: string
  cartId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  customizations?: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (cartId: string, delta: number) => void
  onRemove: (cartId: string) => void
  onEdit: (item: CartItem) => void
  onCheckout: () => void
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onEdit, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const serviceCharge = subtotal * 0.10
  const total = subtotal + tax + serviceCharge

  const recommendations = [
    {
      id: 'rec1',
      name: 'Garlic Bread Sticks',
      price: 8.00,
      imageUrl: PlaceHolderImages.find(i => i.id === 'garlic-bread')?.imageUrl || ""
    },
    {
      id: 'rec2',
      name: 'Chocolate Lava Cake',
      price: 10.50,
      imageUrl: PlaceHolderImages.find(i => i.id === 'brownie-dessert')?.imageUrl || ""
    }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FA] overflow-hidden z-[120] w-full max-w-md mx-auto inset-x-0 [&>button]:hidden"
      >
        <div className="w-full h-full flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>Your basket</SheetTitle>
            <SheetDescription>View and manage your selected items.</SheetDescription>
          </SheetHeader>

          {/* Header Section */}
          <div className="bg-white px-6 pt-8 pb-6 shrink-0 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E9FBF9] rounded-full flex items-center justify-center">
                  <ShoppingBasket className="w-6 h-6 text-[#12B4A3]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1E2B4D]">Your basket</h2>
                  <p className="text-sm font-medium text-[#8E9AAF]">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
              >
                <X className="w-6 h-6 text-slate-300" />
              </button>
            </div>
            
            <div className="flex justify-end mt-2">
              <button 
                onClick={onClose}
                className="text-[12px] font-bold text-[#12B4A3] border-b border-dotted border-[#12B4A3] pb-0.5"
              >
                + Add more items
              </button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="px-5 py-6 space-y-8 pb-40">
              
              {/* Items List - Card Based */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.cartId} className="bg-white rounded-[1.5rem] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-50 flex gap-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-[#1E2B4D] text-base leading-tight pr-4">{item.name}</h3>
                        <button 
                          onClick={() => onEdit(item)}
                          className="p-1.5 rounded-full bg-[#E9FBF9] hover:bg-[#D5F5F1] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5 text-[#12B4A3]" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between">
                        <span className="text-[#12B4A3] font-bold text-lg">$ {item.price.toFixed(2)}</span>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onRemove(item.cartId)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#FF5C5C] border border-[#FF5C5C]/20 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="text-base font-bold text-[#1E2B4D] min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E2B4D] border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-[#1E2B4D]">You might also like</h3>
                  <div className="h-px flex-1 border-t border-dashed border-slate-300" />
                </div>
                
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-4 pb-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="min-w-[160px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden flex flex-col">
                        <div className="relative aspect-square w-full">
                          <Image src={rec.imageUrl} alt={rec.name} fill className="object-cover" />
                        </div>
                        <div className="p-4 space-y-3">
                          <p className="text-sm font-bold text-[#1E2B4D] leading-tight whitespace-normal line-clamp-2">{rec.name}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[#12B4A3] font-bold text-sm">$ {rec.price.toFixed(2)}</span>
                            <Button size="icon" className="w-8 h-8 rounded-full bg-[#12B4A3] p-0 hover:bg-[#109E8F] transition-transform active:scale-90">
                              <Plus className="w-4 h-4 text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Note Section */}
              <button className="w-full bg-white rounded-[1.5rem] p-5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-50 active:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Pencil className="w-5 h-5 text-slate-300" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#1E2B4D]">Add a Note</p>
                    <p className="text-xs font-medium text-[#8E9AAF]">Any special requests?</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200" />
              </button>

              {/* Promo Section */}
              <div className="bg-white rounded-[1.5rem] p-5 flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-50">
                <Ticket className="w-5 h-5 text-slate-300 shrink-0" />
                <Input 
                  placeholder="Enter discount code" 
                  className="border-none bg-transparent h-auto p-0 text-sm font-medium text-[#1E2B4D] placeholder:text-slate-300 focus-visible:ring-0 flex-1"
                />
                <button className="text-[#12B4A3] font-bold text-sm border-b border-dotted border-[#12B4A3] pb-0.5 shrink-0">
                  Apply
                </button>
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-50 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-base">
                    <span className="font-medium text-[#8E9AAF]">Subtotal</span>
                    <span className="font-bold text-[#1E2B4D]">$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="font-medium text-[#8E9AAF]">Tax (8%)</span>
                    <span className="font-bold text-[#1E2B4D]">$ {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="font-medium text-[#8E9AAF]">Service Charge (10%)</span>
                    <span className="font-bold text-[#1E2B4D]">$ {serviceCharge.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="w-full border-t border-slate-100 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#1E2B4D]">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold text-[#1E2B4D] block leading-none">$ {total.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-[#8E9AAF] uppercase tracking-widest mt-1 block">incl. all taxes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Checkout Button */}
          <div className="shrink-0 w-full bg-white p-6 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
            <Button 
              className="w-full h-14 rounded-[1.2rem] bg-[#12B4A3] hover:bg-[#109E8F] text-white font-bold text-lg shadow-xl shadow-[#12B4A3]/20 transition-all active:scale-[0.98]"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
