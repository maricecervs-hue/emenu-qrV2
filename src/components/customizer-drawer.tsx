'use client';

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, MessageSquare, ChevronRight, ChevronLeft, AlertTriangle, Zap, Wheat, Beef, Flame, Check } from "lucide-react"
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

  // Mock sub-options for nested customization
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

  const handleAddToCart = () => {
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

    onAddToCart(quantity, selected || undefined)
    onClose()
  }

  const activeOption = customizationGroups.flatMap(g => g.options).find(o => o.id === activeParentId)

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
      <SheetContent side="bottom" className="h-[92vh] rounded-t-[2.5rem] p-0 border-none bg-white overflow-hidden">
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

                <div className="p-6 space-y-8 pb-32">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold text-[#1E2B4D] leading-tight tracking-tight">{item.name}</h2>
                      <p className="text-base text-[#8E9AAF] font-normal leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-3xl font-semibold text-[#1E2B4D]">$ {item.price.toFixed(2)}</span>
                      <span className="text-sm font-medium text-[#8E9AAF]">(Base Price)</span>
                    </div>

                    <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100/50 space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                          <h3 className="text-lg font-semibold text-[#1E2B4D]">Nutritional Info</h3>
                        </div>
                        <span className="text-xs font-medium text-[#8E9AAF]">Per serving</span>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { val: '892', label: 'Kcal' },
                          { val: '32g', label: 'Protein' },
                          { val: '98g', label: 'Carbs' },
                          { val: '38g', label: 'Fat' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center border border-slate-50 shadow-sm">
                            <span className="text-xl font-semibold text-[#1E2B4D]">{stat.val}</span>
                            <span className="text-[10px] font-medium text-[#8E9AAF] uppercase tracking-wider">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#FFFBEB] rounded-[2rem] p-6 border border-[#FEF08A] space-y-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500 fill-orange-500/10" />
                        <h3 className="text-xl font-semibold text-[#1E2B4D]">Allergen Information</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-[#FEF08A] flex items-center gap-2">
                          <Wheat className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-[#1E2B4D]">Gluten</span>
                        </div>
                        <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-[#FEF08A] flex items-center gap-2">
                          <Beef className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-[#1E2B4D]">Meat</span>
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
                          "rounded-[2.5rem] p-6 space-y-5 transition-all duration-500 scroll-mt-6",
                          group.required && !selected 
                            ? "bg-orange-50/80 border border-orange-100 shadow-[0_8px_30px_rgba(255,165,0,0.05)]" 
                            : "bg-slate-50 border border-slate-100 shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-semibold text-[#1E2B4D]">{group.name}</h3>
                              {group.required && !selected && (
                                <Badge variant="outline" className="h-5 text-[8px] px-2 border-orange-200 text-orange-600 bg-white font-medium uppercase tracking-widest">
                                  Required
                                </Badge>
                              )}
                              {selected && (
                                <div className="h-5 w-5 rounded-full bg-[#12B4A3] flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            {group.description && <p className="text-xs font-medium text-[#8E9AAF] mt-0.5">{group.description}</p>}
                          </div>
                        </div>

                        {group.type === 'single' ? (
                          <RadioGroup 
                            value={group.options.find(o => o.quantity > 0)?.id} 
                            onValueChange={(val) => setSingleChoice(group.id, val)}
                            className="space-y-1"
                          >
                            {group.options.map((option) => (
                              <div 
                                key={option.id} 
                                className={cn(
                                  "flex items-center justify-between py-4 border-b border-slate-200/50 last:border-0 cursor-pointer group/item",
                                  option.hasChildren && "pr-2"
                                )}
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
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-medium text-[#1E2B4D] group-hover/item:text-[#12B4A3] transition-colors">{option.name}</span>
                                      {option.hasChildren && <ChevronRight className="w-4 h-4 text-[#12B4A3] group-hover/item:translate-x-1 transition-transform" />}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span className={cn(
                                        "text-xs font-medium",
                                        option.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                                      )}>
                                        {option.price > 0 ? `+ $ ${option.price.toFixed(2)}` : 'Included'}
                                      </span>
                                      {option.hasChildren && selectedSubOption[option.id] && option.quantity > 0 && (
                                        <span className="text-[10px] text-[#8E9AAF] font-normal flex items-center gap-1">
                                          • <span className="font-medium text-[#1E2B4D]">
                                            {subOptions[option.id as keyof typeof subOptions]?.find(s => s.id === selectedSubOption[option.id])?.name}
                                          </span>
                                        </span>
                                      )}
                                    </div>
                                  </Label>
                                </div>
                                <RadioGroupItem value={option.id} id={option.id} className="h-6 w-6 border-slate-300 text-[#12B4A3] focus:ring-[#12B4A3]" />
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="space-y-1">
                            {group.options.map((option) => (
                              <div 
                                key={option.id} 
                                className="flex items-center justify-between py-4 border-b border-slate-200/50 last:border-0"
                              >
                                <div className="flex-1">
                                  <span className="text-base font-medium text-[#1E2B4D]">{option.name}</span>
                                  <p className={cn(
                                    "text-xs font-medium mt-0.5",
                                    option.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                                  )}>
                                    {option.price > 0 ? `+ $ ${option.price.toFixed(2)}` : 'Free'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-full border border-slate-100 shadow-sm">
                                  <button 
                                    onClick={() => updateOptionQuantity(group.id, option.id, -1)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#FF5C5C] hover:bg-slate-50 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" strokeWidth={3} />
                                  </button>
                                  <span className="text-sm font-semibold text-[#1E2B4D] min-w-[16px] text-center">{option.quantity}</span>
                                  <button 
                                    onClick={() => updateOptionQuantity(group.id, option.id, 1)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E2B4D] hover:bg-slate-50 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" strokeWidth={3} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 shadow-sm border border-slate-100 scroll-mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <MessageSquare className="w-4 h-4 text-[#12B4A3]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#1E2B4D]">Special Requests</h3>
                    </div>
                    <Textarea 
                      placeholder="For example: less spicy, no sugar, allergy notes..."
                      className="min-h-[120px] rounded-[1.5rem] border-none bg-white p-5 text-sm font-normal focus-visible:ring-1 focus-visible:ring-[#12B4A3]/20 shadow-inner"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-slate-50 shadow-sm hover:bg-white"
                    onClick={() => setView('main')}
                  >
                    <ChevronLeft className="w-5 h-5 text-[#1E2B4D]" />
                  </Button>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1E2B4D]">{activeOption?.name} Options</h3>
                    <p className="text-sm font-medium text-[#8E9AAF]">Please select one</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
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
                        className="flex items-center justify-between py-6 border-b border-slate-200 last:border-0 cursor-pointer"
                        onClick={() => {
                          setSelectedSubOption(prev => ({ ...prev, [activeParentId!]: child.id }))
                          const group = customizationGroups.find(g => g.options.some(o => o.id === activeParentId))
                          if (group) setSingleChoice(group.id, activeParentId!)
                        }}
                      >
                        <Label htmlFor={child.id} className="flex-1 cursor-pointer">
                          <p className="text-lg font-medium text-[#1E2B4D]">{child.name}</p>
                          <p className={cn(
                            "text-sm font-medium mt-0.5",
                            child.price > 0 ? "text-[#12B4A3]" : "text-[#8E9AAF]"
                          )}>
                            {child.price > 0 ? `+ $ ${child.price.toFixed(2)}` : 'Included'}
                          </p>
                        </Label>
                        <RadioGroupItem value={child.id} id={child.id} className="h-6 w-6 border-slate-300 text-[#12B4A3]" />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full h-16 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-semibold text-xl shadow-xl shadow-[#12B4A3]/20 transition-all active:scale-95"
                  onClick={() => setView('main')}
                >
                  Confirm Choice
                </Button>
              </div>
            )}
          </ScrollArea>

          {view === 'main' && (
            <div className="w-full bg-white p-6 border-t border-slate-100/50 flex items-center gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.06)] z-10">
              <div className="flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#1E2B4D] hover:scale-125 transition-transform active:scale-90">
                  <Minus className="w-5 h-5" strokeWidth={3} />
                </button>
                <span className="text-2xl font-semibold text-[#1E2B4D] min-w-[28px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-[#1E2B4D] hover:scale-125 transition-transform active:scale-90">
                  <Plus className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
              <Button 
                className="flex-1 h-16 rounded-2xl bg-[#12B4A3] hover:bg-[#109E8F] text-white font-semibold text-xl shadow-xl shadow-[#12B4A3]/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                onClick={handleAddToCart}
              >
                {isEdit ? 'Update' : 'Add'} • $ {(item.price * quantity + customizationGroups.reduce((acc, g) => acc + g.options.reduce((oAcc, o) => oAcc + (o.price * o.quantity), 0), 0)).toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
