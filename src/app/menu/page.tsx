'use client';

import * as React from "react"
import { ChevronLeft, Search, Flame, Pizza as PizzaIcon, Utensils, IceCream, Coffee, ShoppingCart, Home, ClipboardList } from "lucide-react"
import Link from "next/link"
import { CategoryNav } from "@/components/category-nav"
import { MenuCard } from "@/components/menu-card"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { AITasteAdvisor } from "@/components/ai-taste-advisor"

const CATEGORIES = [
  { id: 'bestsellers', name: 'Bestsellers', icon: <Flame className="w-4 h-4" /> },
  { id: 'pizza', name: 'Pizza', icon: <PizzaIcon className="w-4 h-4" /> },
  { id: 'sides', name: 'Sides', icon: <Utensils className="w-4 h-4" /> },
  { id: 'desserts', name: 'Desserts', icon: <IceCream className="w-4 h-4" /> },
  { id: 'drinks', name: 'Drinks', icon: <Coffee className="w-4 h-4" /> },
]

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Pizza Margherita - 12 inches',
    description: 'Homemade dough, homemade pizza sauce, fresh mozzarella, basil.',
    price: 36.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-1')?.imageUrl || "",
    category: 'bestsellers',
    customisable: false
  },
  {
    id: '2',
    name: 'Chicken Alfredo Pizza - 12 inches',
    description: 'Homemade dough, white sauce base, marinated chicken, parmesan.',
    price: 48.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-2')?.imageUrl || "",
    category: 'bestsellers',
    customisable: true
  },
  {
    id: '3',
    name: 'Pizza Margherita - 10 inches',
    description: 'Homemade dough, homemade pizza sauce, fresh mozzarella, basil.',
    price: 27.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-1')?.imageUrl || "",
    category: 'pizza',
    customisable: false
  },
  {
    id: '4',
    name: 'Hawaiian Pizza - 10 inches',
    description: 'Homemade dough, pizza sauce, mozzarella, ham, pineapple.',
    price: 32.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-5')?.imageUrl || "",
    category: 'pizza',
    customisable: true
  },
  {
    id: '5',
    name: 'Soft Drink',
    description: 'Choose your favorite flavor.',
    price: 3.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-6')?.imageUrl || "",
    category: 'drinks',
    customisable: true
  },
  {
    id: '6',
    name: 'Bottled Water',
    description: 'Still or sparkling water.',
    price: 2.50,
    imageUrl: "https://picsum.photos/seed/water/400/300",
    category: 'drinks',
    customisable: false
  }
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState('drinks')

  const filteredItems = React.useMemo(() => {
    const sections = ['bestsellers', 'pizza', 'drinks']
    return sections.map(section => ({
      id: section,
      title: section.charAt(0).toUpperCase() + section.slice(1),
      items: MENU_ITEMS.filter(item => item.category === section)
    }))
  }, [])

  const activeCategoryItemsCount = MENU_ITEMS.filter(item => item.category === activeCategory).length

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative">
        
        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Top Header - Scrolls Away */}
          <header className="pt-6 pb-2">
            <div className="px-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <ChevronLeft className="w-6 h-6 text-slate-800" />
                </Link>
                <div className="flex flex-col">
                  <h2 className="text-xl font-extrabold text-[#1E2B4D]">
                    {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                  </h2>
                  <span className="text-sm font-medium text-[#12B4A3]">
                    {activeCategoryItemsCount} items
                  </span>
                </div>
              </div>
              <Search className="w-6 h-6 text-slate-800" />
            </div>
          </header>

          {/* Sticky Category Navigation */}
          <div className="sticky top-0 z-40 bg-white shadow-sm sm:shadow-none">
            <CategoryNav 
              categories={CATEGORIES} 
              active={activeCategory} 
              onChange={setActiveCategory} 
            />
          </div>

          {/* Menu Sections */}
          <div className="px-4 space-y-10 py-6">
            {filteredItems.map((section) => (
              <div key={section.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-[#1E2B4D] whitespace-nowrap">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 border-t border-dashed border-slate-300" />
                </div>
                
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <MenuCard 
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      customisable={item.customisable}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Advisor Floating Action */}
        <AITasteAdvisor />

        {/* Floating Cart Button */}
        <div className="fixed bottom-24 right-6 z-50">
          <div className="relative">
            <Button 
              className="w-16 h-16 rounded-full bg-[#FF5C5C] hover:bg-[#FF4D4D] shadow-2xl flex items-center justify-center p-0"
            >
              <ShoppingCart className="w-7 h-7 text-white" />
            </Button>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              1
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 px-12 py-4 flex justify-between items-center z-40">
          <div className="flex flex-col items-center gap-1">
            <Home className="w-6 h-6 text-[#12B4A3]" />
            <span className="text-[10px] font-bold text-[#12B4A3]">Menu</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <ClipboardList className="w-6 h-6 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400">Orders</span>
          </div>
        </nav>
      </div>
    </div>
  )
}
