'use client';

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, MessageSquare, ChevronRight, ChevronLeft, AlertTriangle, Wheat, Beef, Flame, Check } from "lucide-react"
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
import { cn } from "@/lib/utils"

interface Option {
  id: string
  name: string
  price: number
  quantity: number
  hasChildren?: boolean
}

interface CustomizationGroup {
  id: string
  name: string
  description?: string
  required: boolean
  type: 'single' | 'multiple'
  options: Option[]
}

export function CustomizerDrawer({ isOpen, onClose, item, customisable, onAddToCart, isEdit }: { isOpen: boolean, onClose: () => void, item: any, customisable?: boolean, onAddToCart: any, isEdit?: boolean }) {
  const [quantity, setQuantity] = React.useState(1)
  const [view, setView] = React.useState<'main' | 'sub'>('main')
  const [activeParentId, setActiveParentId] = React.useState<string | null>(null)
  const groupRefs = React.useRef<Record<string, HTMLDivElement | null>>({})
  
  const [customizationGroups, setCustomizationGroups] = React.useState<CustomizationGroup[]>([
    {
      id: 'g1',
      name: 'Cooking Level',
      description: 'How would you like your steak?',
      required: true,
      type: 'single',
      options: [
        { id: 'opt1', name: 'Rare', price: 0, quantity: 0 },
        { id: 'opt2', name: 'Medium Rare', price: 0, quantity: 0 },
        { id: 'opt3', name: 'Medium', price: 0, quantity: 0 },
        { id: 'opt4', name: 'Well Done', price: 0, quantity: 0 },
      ]
    },
    {
      id: 'g2',
      name: 'Pizza Crust',
      description: 'Choose your base',
      required: true,
      type: 'single',
      options: [
        { id: 'opt5', name: 'Classic Thin', price: 0, quantity: 0 },
        { id: 'opt6', name: 'Pan Pizza', price: 2.00, quantity: 0 },
        { id: 'opt7', name: 'Stuffed Crust', price: 5.00, quantity: 0, hasChildren: true },
      ]
    },
    {
      id: 'g3',
      name: 'Extra Toppings',
      description: 'Add more flavor',
      required: false,
      type: 'multiple',
      options: [
        { id: 'opt8', name: 'Extra Cheese', price: 2.50, quantity: 0 },
        { id: 'opt9', name: 'Pepperoni', price: 3.00, quantity: 0 },
        { id: 'opt10', name: 'Mushrooms', price: 1.50, quantity: 0 },
        { id: 'opt11', name: 'Black Olives', price: 1.00, quantity: 0 },
      ]
    }
  ])

  const subOptions = {
    'opt7': [
      { id: 'sc1', name: 'Mozzarella Fill', price: 0 },
      { id: 'sc2', name: 'Cheddar Fill', price: 1.00 },
      { id: 'sc3', name: 'Garlic Butter Fill', price: 0.50 },
    ]
  }
  const [selectedSubOption, setSelectedSubOption] = React.useState<Record<string, string>>({
    'opt7': 'sc1'
  })

  const isGroupSelected = (group: CustomizationGroup) => {
    return group.options.some(opt => opt.quantity > 0)
  }

  const scrollToNextSection = (currentGroupId: string) => {
    const groupIds = customizationGroups.map(g => g.id)
    const currentIndex = groupIds.indexOf(currentGroupId)
    if (currentIndex !== -1 && currentIndex < groupIds.length - 1) {
      const nextGroupId = groupIds[currentIndex + 1]
      const nextElement = groupRefs.current[nextGroupId]
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const updateOptionQuantity = (groupId: string, optionId: string, delta: number) => {
    setCustomizationGroups(prev => prev.map(group => {
      if (group.id !== groupId) return group
      return {
        ...group,
        options: group.options.map(opt => {
          if (opt.id !== optionId) return opt
          const newQuantity = Math.max(0, opt.quantity + delta)
          if (newQuantity > 0 && delta > 0) {
            setTimeout(() => scrollToNextSection(groupId), 300)
          }
          return { ...opt, quantity: newQuantity }
        })
      }
    }))
  }

  const setSingleChoice = (groupId: string, optionId: string) => {
    setCustomizationGroups(prev => prev.map(group => {
      if (group.id !== groupId) return group
      return {
        ...group,
        options: group.options.map(opt => ({
          ...opt,
          quantity: opt.id === optionId ? 1 : 0
        }))
      }
    }))
    setTimeout(() => scrollToNextSection(groupId), 300)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    const selected = customizationGroups.flatMap(group => 
      group.options.filter(opt => opt.quantity > 0).map(opt => {
        let label = opt.name
        if (group.type === 'multiple') label += ` (x${opt.quantity})`
        if (opt.hasChildren && selectedSubOption[opt.id]) {
          const sub = subOptions[opt.id as keyof typeof subOptions]?.find(s => s.id === selectedSubOption[opt.id])
          label += ` [${sub?.name}]`
        }
        return label
      })
    ).join(', ')

    onAddToCart(quantity, selected || undefined, rect)
    onClose()
  }

  const activeOption = customizationGroups.flatMap(g => g.options).find(o => o.id === activeParentId)
  const requiredMissingCount = customisable ? customizationGroups.filter(g => g.required && !isGroupSelected(g)).length : 0
  const totalPrice = (item.price * quantity + customizationGroups.reduce((acc, g) => acc + g.options.reduce((oAcc, o) => oAcc + (o.price * o.quantity), 0), 0)).toFixed(2)
  const isButtonDisabled = requiredMissingCount > 0

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose()
        setTimeout(() => {
          setView('main')
          setActiveParentId(null)
          setQuantity(1)
        }, 300)
      }
    }}>
      <SheetContent side="bottom" className="h-[92vh] rounded-t-[2.5rem] p-0 border-none bg-white overflow-hidden z-[140] w-full max-w-md mx-auto left-0 right-0">
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-4 space-y-6 pb-32">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-[#1E2B4D] leading-tight tracking-tight">{item.name}</h2>
                      <p className="text-xs text-[#8E9AAF] font-normal leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-2xl font-bold text-[#1E2B4D]">$ {item.price.toFixed(2)}</span>
                      <span className="text-[10px] font-semibold text-[#8E9AAF] uppercase tracking-wider">(Base Price)</span>
                    </div>

                    <div className="bg-slate-50/50 rounded-[1.8rem] p-4 border border-slate-100/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                          <h3 className="text-sm font-bold text-[#1E2B4D]">Nutritional Info</h3>
                        </div>
                        <span className="text-[9px] font-medium text-[#8E9AAF]">Per serving</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { val: '892', label: 'Kcal' },
                          { val: '32g', label: 'Prot' },
                          { val: '98g', label: 'Carbs' },
                          { val: '38g', label: 'Fat' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-50 shadow-sm">
                            <span className="text-sm font-bold text-[#1E2B4D]">{stat.val}</span>
                            <span className="text-[8px] font-medium text-[#8E9AAF] uppercase tracking-widest">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#FFFBEB] rounded-[1.8rem] p-4 border border-[#FEF08A] space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 fill-orange-500/10" />
                        <h3 className="text-sm font-bold text-[#1E2B4D]">Allergen Information</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-[#FEF08A] flex items-center gap-1.5">
                          <Wheat className="w-3 h-3 text-orange-600" />
                          <span className="text-[10px] font-bold text-[#1E2B4D]">Gluten</span>
                        </div>
                        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-[#FEF08A] flex items-center gap-1.5">
                          <Beef className="w-3 h-3 text-orange-600" />
                          <span className="text-[10px] font-bold text-[#1E2B4D]">Meat</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {customisable && customizationGroups.map((group) => {
                    const selected = isGroupSelected(group)
                    return (
                      <div 
                        key={group.id} 
                        ref={(el) => { groupRefs.current[group.id] = el }}
                        className={cn(
                          "rounded-[2rem] p-4 space-y-3 transition-all duration-500 scroll-mt-4",
                          group.required && !selected 
                            ? "bg-orange-50/80 border border-orange-100" 
                            : "bg-slate-50 border border-slate-100"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-[#1E2B4D]">{group.name}</h3>
                              {group.required && !selected && (
                                <Badge variant="outline" className="h-4 text-[7px] px-1.5 border-orange-200 text-orange-600 bg-white font-bold uppercase tracking-widest">
                                  Required
                                </Badge>
                              )}
                              {selected && (
                                <div className="h-4 w-4 rounded-full bg-[#12B4A3] flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            {group.description && <p className="text-[10px] font-medium text-[#8E9AAF] mt-0.5">{group.description}</p>}
                          </div>
                        </div>

                        {group.type === 'single' ? (
                          <RadioGroup 
                            value={group.options.find(o => o.quantity > 0)?.id} 
                            onValueChange={(val) => setSingleChoice(group.id, val)}
                            className="space-y-0.5"
                          >
                            {group.options.map((option) => (
                              <div 
                                key={option.id} 
                                className="flex items-center justify-between py-3 border-b border-slate-200/50 last:border-0"
                                onClick={() => {
                                  if (option.hasChildren) {
                                    setActiveParentId(option.id)
                                    setView('sub')
                                  } else {
                                    setSingleChoice(group.id, option.id)
                                  }
                                }}
                              >
                                <div className="flex-1">
                                  <Label htmlFor={option.id} className="cursor-pointer">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-bold text-[#1E2B4D]">{option.name}</span>
                                      {option.hasChildren && <ChevronRight className="w-3 h-3 text-[#12B4A3]" />}
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <span className={cn(
                                        "text-[10px] font-bold",
                                        option.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                                      )}>
                                        {option.price > 0 ? `+ $ ${option.price.toFixed(2)}` : 'Included'}
                                      </span>
                                      {option.hasChildren && selectedSubOption[option.id] && option.quantity > 0 && (
                                        <span className="text-[9px] text-[#8E9AAF] font-medium flex items-center gap-1">
                                          • <span className="font-bold text-[#1E2B4D]">
                                            {subOptions[option.id as keyof typeof subOptions]?.find(s => s.id === selectedSubOption[option.id])?.name}
                                          </span>
                                        </span>
                                      )}
                                    </div>
                                  </Label>
                                </div>
                                <RadioGroupItem value={option.id} id={option.id} className="h-5 w-5 border-slate-300 text-[#12B4A3]" />
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="space-y-0.5">
                            {group.options.map((option) => (
                              <div 
                                key={option.id} 
                                className="flex items-center justify-between py-3 border-b border-slate-200/50 last:border-0"
                              >
                                <div className="flex-1">
                                  <span className="text-sm font-bold text-[#1E2B4D]">{option.name}</span>
                                  <p className={cn(
                                    "text-[10px] font-bold mt-0.5",
                                    option.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                                  )}>
                                    {option.price > 0 ? `+ $ ${option.price.toFixed(2)}` : 'Free'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-1.5 py-1 rounded-full border border-slate-100 shadow-sm scale-90">
                                  <button 
                                    onClick={() => updateOptionQuantity(group.id, option.id, -1)}
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF5C5C]"
                                  >
                                    <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                                  </button>
                                  <span className="text-xs font-bold text-[#1E2B4D] min-w-[14px] text-center">{option.quantity}</span>
                                  <button 
                                    onClick={() => updateOptionQuantity(group.id, option.id, 1)}
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#1E2B4D]"
                                  >
                                    <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className="bg-slate-50 rounded-[1.8rem] p-4 space-y-3 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <MessageSquare className="w-3.5 h-3.5 text-[#12B4A3]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1E2B4D]">Special Requests</h3>
                    </div>
                    <Textarea 
                      placeholder="e.g. less spicy, no sugar..."
                      className="min-h-[80px] rounded-xl border-none bg-white p-3 text-[11px] font-medium shadow-inner"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-slate-50 w-9 h-9"
                    onClick={() => setView('main')}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#1E2B4D]" />
                  </Button>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E2B4D]">{activeOption?.name}</h3>
                    <p className="text-[10px] font-bold text-[#8E9AAF] uppercase tracking-wider">Select one option</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-4 border border-slate-100">
                  <RadioGroup 
                    value={selectedSubOption[activeParentId!]} 
                    onValueChange={(val) => {
                      setSelectedSubOption(prev => ({ ...prev, [activeParentId!]: val }))
                      const group = customizationGroups.find(g => g.options.some(o => o.id === activeParentId))
                      if (group) setSingleChoice(group.id, activeParentId!)
                    }}
                  >
                    {subOptions[activeParentId as keyof typeof subOptions]?.map((child) => (
                      <div 
                        key={child.id} 
                        className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0"
                        onClick={() => {
                          setSelectedSubOption(prev => ({ ...prev, [activeParentId!]: child.id }))
                          const group = customizationGroups.find(g => g.options.some(o => o.id === activeParentId))
                          if (group) setSingleChoice(group.id, activeParentId!)
                        }}
                      >
                        <Label htmlFor={child.id} className="flex-1 cursor-pointer">
                          <p className="text-base font-bold text-[#1E2B4D]">{child.name}</p>
                          <p className={cn(
                            "text-[10px] font-bold mt-0.5",
                            child.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                          )}>
                            {child.price > 0 ? `+ $ ${child.price.toFixed(2)}` : 'Included'}
                          </p>
                        </Label>
                        <RadioGroupItem value={child.id} id={child.id} className="h-5 w-5 border-slate-300 text-[#12B4A3]" />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full h-14 rounded-2xl bg-[#12B4A3] text-white font-bold text-base"
                  onClick={() => setView('main')}
                >
                  Confirm Choice
                </Button>
              </div>
            )}
          </ScrollArea>

          {view === 'main' && (
            <div className="w-full bg-white px-3 py-3 border-t border-slate-100 flex items-center gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] shrink-0">
              {!isButtonDisabled && (
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 shrink-0 animate-in fade-in slide-in-from-left duration-300">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#1E2B4D]">
                    <Minus className="w-4 h-4" strokeWidth={3} />
                  </button>
                  <span className="text-base font-bold text-[#1E2B4D] min-w-[18px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-[#1E2B4D]">
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              )}
              <Button 
                disabled={isButtonDisabled}
                className={cn(
                  "flex-1 h-12 rounded-2xl font-bold text-sm transition-all duration-300",
                  isButtonDisabled 
                    ? "bg-[#F1F3F5] text-[#ADB5BD] border border-slate-100" 
                    : "bg-[#12B4A3] text-white shadow-lg shadow-[#12B4A3]/20"
                )}
                onClick={handleAddToCart}
              >
                {isButtonDisabled 
                  ? `Make ${requiredMissingCount} required selection - ${isEdit ? 'Update' : 'Add'} $${totalPrice}`
                  : `${isEdit ? 'Update' : 'Add'} • $${totalPrice}`
                }
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
