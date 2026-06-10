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
import { Separator } from "@/components/ui/separator"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      <SheetContent side="bottom" className="h-[95vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FA] overflow-hidden z-[120] flex flex-col">
        <div className="w-full max-w-md mx-auto h-full flex flex-col overflow-hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Your Basket</SheetTitle>
            <SheetDescription>View and manage your selected items.</SheetDescription>
          </SheetHeader>

          {/* Compact Header */}
          <div className="bg-white px-5 pt-6 pb-4 flex items-center justify-between border-b border-slate-50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E9FBF9] rounded-full flex items-center justify-center">
                <ShoppingBasket className="w-5 h-5 text-[#12B4A3]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1E2B4D]">Your basket</h2>
                <p className="text-[10px] font-semibold text-[#8E9AAF] uppercase tracking-wider">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-[#12B4A3] font-semibold text-xs border-b border-dashed border-[#12B4A3] pb-0.5 hover:opacity-80 transition-opacity"
            >
              + Add more
            </button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 pb-40 space-y-5">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.cartId} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-50 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-[#1E2B4D] leading-tight text-sm truncate">{item.name}</h3>
                          <button 
                            onClick={() => onEdit(item)}
                            className="p-1.5 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors shrink-0"
                          >
                            <Pencil className="w-3.5 h-3.5 text-[#12B4A3]" />
                          </button>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-[#12B4A3] font-bold text-sm">$ {item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Compact Quantity Control */}
                      <div className="flex items-center gap-2 bg-[#F8F9FA] px-1 py-1 rounded-full border border-slate-100 shrink-0">
                        <button 
                          onClick={() => item.quantity > 1 ? onUpdateQuantity(item.cartId, -1) : onRemove(item.cartId)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF5C5C] bg-white shadow-sm hover:bg-slate-50 transition-colors"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" strokeWidth={3} />}
                        </button>
                        <span className="text-xs font-bold text-[#1E2B4D] min-w-[12px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#1E2B4D] bg-white shadow-sm hover:bg-slate-50 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    {item.customizations && (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="customizations" className="border-none">
                          <AccordionTrigger className="py-0 hover:no-underline text-[10px] font-bold text-[#12B4A3] flex items-center gap-1.5 h-auto opacity-80 hover:opacity-100">
                            <span>Review condiments & addons</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-0">
                            <div className="bg-[#F8F9FA] rounded-xl p-2.5 space-y-1 border border-slate-100">
                              <p className="text-[10px] font-medium text-[#8E9AAF] italic">{item.customizations}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-bold text-[#1E2B4D]">You might also like</h3>
                  <div className="h-px flex-1 border-t border-dashed border-slate-200" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="min-w-[130px] bg-white rounded-2xl shadow-sm border border-slate-50 overflow-hidden flex flex-col">
                      <div className="relative aspect-video w-full">
                        <Image src={rec.imageUrl} alt={rec.name} fill className="object-cover" />
                      </div>
                      <div className="p-2.5 space-y-1.5 flex-1 flex flex-col justify-between">
                        <p className="text-[10px] font-bold text-[#1E2B4D] leading-tight line-clamp-2">{rec.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#12B4A3] font-bold text-[10px]">$ {rec.price.toFixed(2)}</span>
                          <Button size="icon" className="w-6 h-6 rounded-full bg-[#12B4A3] hover:bg-[#109E8F]">
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <button className="w-full bg-white p-3.5 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50 group active:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center text-slate-400 group-hover:text-[#12B4A3]">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#1E2B4D]">Add a Note</p>
                      <p className="text-[9px] font-medium text-[#8E9AAF]">Any special requests?</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>

                <div className="bg-white p-3.5 rounded-2xl flex items-center gap-3 shadow-sm border border-slate-50">
                  <Ticket className="w-4 h-4 text-slate-300" />
                  <Input 
                    placeholder="Enter discount code" 
                    className="border-none bg-transparent h-auto p-0 text-xs font-medium text-[#1E2B4D] placeholder:text-slate-300 focus-visible:ring-0"
                  />
                  <button className="text-[#12B4A3] font-bold text-xs border-b border-dashed border-[#12B4A3] pb-0.5">
                    Apply
                  </button>
                </div>
              </div>

              {/* Compact Summary Card */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#8E9AAF]">Subtotal</span>
                  <span className="font-bold text-[#1E2B4D]">$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#8E9AAF]">Tax (8%)</span>
                  <span className="font-bold text-[#1E2B4D]">$ {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#8E9AAF]">Service Charge (10%)</span>
                  <span className="font-bold text-[#1E2B4D]">$ {serviceCharge.toFixed(2)}</span>
                </div>
                <Separator className="bg-slate-50 my-1" />
                <div className="flex justify-between items-center pt-1">
                  <span className="text-base font-bold text-[#1E2B4D]">Total</span>
                  <span className="text-2xl font-bold text-[#12B4A3]">$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Action Bar */}
          <div className="shrink-0 w-full bg-white p-5 border-t border-slate-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <Button 
              className="w-full h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-bold text-base shadow-xl shadow-[#12B4A3]/20 transition-all active:scale-[0.98]"
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
