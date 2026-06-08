
"use client"

import * as React from "react"
import Image from "next/image"
import { X, Minus, Plus, MessageSquare, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface Condiment {
  id: string
  name: string
  price: number
  quantity: number
  required?: boolean
  children?: Condiment[]
  selectedChildId?: string
}

interface CustomizerDrawerProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    imageHint?: string
  }
  customisable?: boolean
  onAddToCart: (quantity: number, customizations?: string) => void
}

export function CustomizerDrawer({ isOpen, onClose, item, customisable, onAddToCart }: CustomizerDrawerProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [view, setView] = React.useState<'main' | 'sub'>('main')
  const [activeParentId, setActiveParentId] = React.useState<string | null>(null)
  
  // High-fidelity Condiments Data with Nested Structure
  const [condiments, setCondiments] = React.useState<Condiment[]>([
    { id: 'c1', name: 'Extra Cheese', price: 2.50, quantity: 0, required: true },
    { id: 'c2', name: 'Pepperoni', price: 3.00, quantity: 0 },
    { id: 'c3', name: 'Mushrooms', price: 1.50, quantity: 0 },
    { 
      id: 'c4', 
      name: 'Stuffed Crust', 
      price: 5.00, 
      quantity: 0,
      required: true,
      children: [
        { id: 'sc1', name: 'Mozzarella Fill', price: 0, quantity: 1 },
        { id: 'sc2', name: 'Cheddar Fill', price: 1.00, quantity: 0 },
        { id: 'sc3', name: 'Garlic Butter Fill', price: 0.50, quantity: 0 },
      ],
      selectedChildId: undefined // Not selected by default
    },
    { id: 'c5', name: 'Extra Basil', price: 1.00, quantity: 0 },
  ])

  const updateCondimentQuantity = (id: string, delta: number) => {
    setCondiments(prev => prev.map(c => 
      c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c
    ))
  }

  const updateSubCondiment = (parentId: string, childId: string) => {
    setCondiments(prev => prev.map(c => 
      c.id === parentId ? { ...c, selectedChildId: childId, quantity: 1 } : c
    ))
  }

  const handleAddToCart = () => {
    const selected = condiments
      .filter(c => c.quantity > 0)
      .map(c => {
        let label = `${c.name} (x${c.quantity})`
        if (c.children && c.selectedChildId) {
          const child = c.children.find(ch => ch.id === c.selectedChildId)
          label += ` [${child?.name}]`
        }
        return label
      })
      .join(', ')

    onAddToCart(quantity, selected || undefined)
    onClose()
  }

  const activeParent = condiments.find(c => c.id === activeParentId)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose()
        setTimeout(() => {
          setView('main')
          setActiveParentId(null)
        }, 300)
      }
    }}>
      <SheetContent side="bottom" className="h-[92vh] rounded-t-[2.5rem] p-0 border-none bg-[#F8F9FA] overflow-hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>{item.name}</SheetTitle>
          <SheetDescription>{item.description}</SheetDescription>
        </SheetHeader>

        <div className="h-full flex flex-col">
          <ScrollArea className="flex-1">
            {view === 'main' ? (
              <>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    data-ai-hint={item.imageHint || "food dish"}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full h-8 w-8 hover:bg-white"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4 text-slate-900" />
                  </Button>
                </div>

                <div className="p-6 space-y-6 pb-32">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-extrabold text-[#1E2B4D] leading-tight">{item.name}</h2>
                      <span className="text-2xl font-black text-[#1E2B4D]">฿ {item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-[#8E9AAF] font-medium leading-relaxed">{item.description}</p>
                  </div>

                  {customisable && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-black text-[#1E2B4D]">Customise Your Meal</h3>
                        <p className="text-xs font-bold text-[#8E9AAF]">Select your preferred add-ons</p>
                      </div>
                      
                      <div className="space-y-3">
                        {condiments.map((condiment) => (
                          <div 
                            key={condiment.id} 
                            className={cn(
                              "relative group p-4 rounded-[1.5rem] border transition-all duration-300",
                              condiment.required 
                                ? "bg-orange-50/80 border-orange-100 shadow-[0_4px_12px_rgba(255,165,0,0.05)]" 
                                : "bg-white border-slate-50 shadow-sm"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div 
                                className="flex-1 cursor-pointer"
                                onClick={() => {
                                  if (condiment.children) {
                                    setActiveParentId(condiment.id)
                                    setView('sub')
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#1E2B4D]">
                                    {condiment.name}
                                  </span>
                                  {condiment.required && (
                                    <Badge variant="outline" className="h-5 text-[8px] px-1.5 border-orange-200 text-orange-600 bg-white font-black uppercase tracking-wider">
                                      Required
                                    </Badge>
                                  )}
                                  {condiment.children && <ChevronRight className="w-4 h-4 text-[#12B4A3] group-hover:translate-x-1 transition-transform" />}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className={cn(
                                    "text-xs font-bold",
                                    condiment.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                                  )}>
                                    {condiment.price > 0 ? `+ ฿ ${condiment.price.toFixed(2)}` : 'Free'}
                                  </span>
                                  {condiment.selectedChildId && condiment.quantity > 0 && (
                                    <span className="text-[10px] text-[#8E9AAF] font-medium flex items-center gap-1">
                                      • <span className="font-bold text-[#1E2B4D]">
                                        {condiment.children?.find(ch => ch.id === condiment.selectedChildId)?.name}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 bg-[#F8F9FA] px-2 py-1.5 rounded-full border border-slate-100/50">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateCondimentQuantity(condiment.id, -1)
                                  }}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF5C5C] hover:bg-white transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                                </button>
                                <span className="text-xs font-black text-[#1E2B4D] min-w-[14px] text-center">{condiment.quantity}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (condiment.children && condiment.quantity === 0) {
                                      setActiveParentId(condiment.id)
                                      setView('sub')
                                    } else {
                                      updateCondimentQuantity(condiment.id, 1)
                                    }
                                  }}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#1E2B4D] hover:bg-white transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-[1.5rem] p-6 space-y-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#8E9AAF]" />
                      <h3 className="text-lg font-black text-[#1E2B4D]">Special Requests</h3>
                    </div>
                    <Textarea 
                      placeholder="For example: less spicy, no sugar, allergy notes..."
                      className="min-h-[100px] rounded-2xl border-slate-100 bg-[#F8F9FA] p-4 text-sm font-medium focus-visible:ring-[#12B4A3]/20"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white shadow-sm hover:bg-slate-50"
                    onClick={() => setView('main')}
                  >
                    <ChevronLeft className="w-5 h-5 text-[#1E2B4D]" />
                  </Button>
                  <div>
                    <h3 className="text-xl font-black text-[#1E2B4D]">{activeParent?.name} Options</h3>
                    <p className="text-xs font-bold text-[#8E9AAF]">Please select one option</p>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50">
                  <RadioGroup 
                    value={activeParent?.selectedChildId} 
                    onValueChange={(val) => activeParentId && updateSubCondiment(activeParentId, val)}
                  >
                    {activeParent?.children?.map((child) => (
                      <div 
                        key={child.id} 
                        className="flex items-center justify-between py-5 border-b border-slate-50 last:border-0 cursor-pointer"
                        onClick={() => activeParentId && updateSubCondiment(activeParentId, child.id)}
                      >
                        <Label htmlFor={child.id} className="flex-1 cursor-pointer">
                          <p className="text-base font-bold text-[#1E2B4D]">{child.name}</p>
                          <p className={cn(
                            "text-xs font-bold mt-0.5",
                            child.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                          )}>
                            {child.price > 0 ? `+ ฿ ${child.price.toFixed(2)}` : 'Included'}
                          </p>
                        </Label>
                        <RadioGroupItem value={child.id} id={child.id} className="text-[#12B4A3] w-5 h-5 border-slate-200" />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-black text-lg shadow-xl shadow-[#12B4A3]/20 transition-all active:scale-95"
                  onClick={() => setView('main')}
                >
                  Confirm Choice
                </Button>
              </div>
            )}
          </ScrollArea>

          {view === 'main' && (
            <div className="w-full bg-white p-6 border-t border-slate-100/50 flex items-center gap-4 shadow-[0_-15px_40px_rgba(0,0,0,0.05)] z-10">
              <div className="flex items-center gap-6 bg-[#F8F9FA] px-5 py-3 rounded-2xl border border-slate-100">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#1E2B4D] hover:scale-110 transition-transform">
                  <Minus className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="text-xl font-black text-[#1E2B4D] min-w-[24px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-[#1E2B4D] hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
              <Button 
                className="flex-1 h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-black text-lg shadow-xl shadow-[#12B4A3]/20 transition-all hover:scale-[1.02] active:scale-95"
                onClick={handleAddToCart}
              >
                Add • ฿ {(item.price * quantity + condiments.reduce((acc, c) => acc + (c.price * c.quantity), 0)).toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
