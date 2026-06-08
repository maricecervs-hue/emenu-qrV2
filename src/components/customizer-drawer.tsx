
"use client"

import * as React from "react"
import Image from "next/image"
import { X, Wheat, Droplets, Minus, Plus, MessageSquare, ChevronRight, ChevronLeft } from "lucide-react"
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

interface Condiment {
  id: string
  name: string
  price: number
  quantity: number
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
  
  // Example Condiments Data
  const [condiments, setCondiments] = React.useState<Condiment[]>([
    { id: 'c1', name: 'Extra Cheese', price: 2.50, quantity: 0 },
    { id: 'c2', name: 'Pepperoni', price: 3.00, quantity: 0 },
    { id: 'c3', name: 'Mushrooms', price: 1.50, quantity: 0 },
    { 
      id: 'c4', 
      name: 'Stuffed Crust', 
      price: 5.00, 
      quantity: 0,
      children: [
        { id: 'sc1', name: 'Mozzarella Fill', price: 0, quantity: 1 },
        { id: 'sc2', name: 'Cheddar Fill', price: 1.00, quantity: 0 },
        { id: 'sc3', name: 'Garlic Butter Fill', price: 0.50, quantity: 0 },
      ],
      selectedChildId: 'sc1'
    }
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
                    <h2 className="text-2xl font-extrabold text-[#1E2B4D] leading-tight">{item.name}</h2>
                    <p className="text-sm text-[#8E9AAF] font-medium leading-relaxed">{item.description}</p>
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-2xl font-black text-[#1E2B4D]">฿ {item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {customisable && (
                    <div className="bg-white rounded-[1.5rem] p-6 space-y-4 shadow-sm border border-slate-100">
                      <div>
                        <h3 className="text-lg font-black text-[#1E2B4D]">Add Condiments</h3>
                        <p className="text-xs font-bold text-[#8E9AAF]">Customise your meal</p>
                      </div>
                      
                      <div className="space-y-1">
                        {condiments.map((condiment) => (
                          <div key={condiment.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                            <div 
                              className="flex-1 cursor-pointer group"
                              onClick={() => {
                                if (condiment.children) {
                                  setActiveParentId(condiment.id)
                                  setView('sub')
                                }
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[#1E2B4D] group-hover:text-[#12B4A3] transition-colors">
                                  {condiment.name}
                                </span>
                                {condiment.children && <ChevronRight className="w-4 h-4 text-[#12B4A3]" />}
                              </div>
                              <span className="text-xs font-bold text-[#12B4A3]">
                                {condiment.price > 0 ? `+ ฿ ${condiment.price.toFixed(2)}` : 'Free'}
                              </span>
                              {condiment.selectedChildId && condiment.quantity > 0 && (
                                <p className="text-[10px] text-[#8E9AAF] font-bold">
                                  Selected: {condiment.children?.find(ch => ch.id === condiment.selectedChildId)?.name}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-3 bg-[#F8F9FA] px-2 py-1 rounded-full border border-slate-100">
                              <button 
                                onClick={() => updateCondimentQuantity(condiment.id, -1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF5C5C] hover:bg-white"
                              >
                                <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                              </button>
                              <span className="text-xs font-black text-[#1E2B4D] min-w-[12px] text-center">{condiment.quantity}</span>
                              <button 
                                onClick={() => updateCondimentQuantity(condiment.id, 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#1E2B4D] hover:bg-white"
                              >
                                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-[1.5rem] p-6 space-y-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#8E9AAF]" />
                      <h3 className="text-lg font-black text-[#1E2B4D]">Special requests</h3>
                    </div>
                    <Textarea 
                      placeholder="For example: less spicy, no sugar, etc."
                      className="min-h-[100px] rounded-2xl border-slate-100 bg-[#F8F9FA] p-4 text-sm font-medium"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white shadow-sm"
                    onClick={() => setView('main')}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h3 className="text-xl font-black text-[#1E2B4D]">{activeParent?.name} options</h3>
                    <p className="text-xs font-bold text-[#8E9AAF]">Select one fill option</p>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                  <RadioGroup 
                    value={activeParent?.selectedChildId} 
                    onValueChange={(val) => activeParentId && updateSubCondiment(activeParentId, val)}
                  >
                    {activeParent?.children?.map((child) => (
                      <div key={child.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                        <Label htmlFor={child.id} className="flex-1 cursor-pointer">
                          <p className="text-sm font-bold text-[#1E2B4D]">{child.name}</p>
                          <p className="text-xs font-bold text-[#12B4A3]">
                            {child.price > 0 ? `+ ฿ ${child.price.toFixed(2)}` : 'Included'}
                          </p>
                        </Label>
                        <RadioGroupItem value={child.id} id={child.id} className="text-[#12B4A3]" />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full h-14 rounded-2xl bg-[#12B4A3] text-white font-bold"
                  onClick={() => setView('main')}
                >
                  Confirm Selection
                </Button>
              </div>
            )}
          </ScrollArea>

          {view === 'main' && (
            <div className="w-full bg-white p-6 border-t border-slate-50 flex items-center gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-6 bg-[#F8F9FA] px-4 py-3 rounded-2xl border border-slate-100">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#1E2B4D]">
                  <Minus className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="text-lg font-black text-[#1E2B4D] min-w-[20px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-[#1E2B4D]">
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
              <Button 
                className="flex-1 h-14 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-black text-lg shadow-xl shadow-[#12B4A3]/20"
                onClick={handleAddToCart}
              >
                Add • ฿ {(item.price * quantity).toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
