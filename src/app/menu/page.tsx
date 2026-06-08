
'use client';

import * as React from "react"
import { ChevronLeft, Search, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { CategoryNav } from "@/components/category-nav"
import { MenuCard } from "@/components/menu-card"
import { AITasteAdvisor } from "@/components/ai-taste-advisor"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, san marzano tomatoes, basil, extra virgin olive oil.',
    price: 18.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-1')?.imageUrl || "",
    category: 'pizza',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Creamy Truffle Pasta',
    description: 'Handmade tagliatelle, black truffle cream, parmesan reggiano.',
    price: 24.50,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-2')?.imageUrl || "",
    category: 'pasta',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon, grilled asparagus, lemon herb butter sauce.',
    price: 28.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-3')?.imageUrl || "",
    category: 'salad',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Classic Caesar',
    description: 'Romaine hearts, garlic croutons, house-made dressing.',
    price: 14.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-4')?.imageUrl || "",
    category: 'salad',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Premium Beef Burger',
    description: 'Wagyu beef, caramelized onions, aged cheddar, brioche bun.',
    price: 19.50,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-5')?.imageUrl || "",
    category: 'burgers',
    rating: 4.9
  }
]

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative pb-24">
        
        {/* Sticky Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-6 h-6 text-slate-800" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold text-slate-800">Our Menu</h2>
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingBag className="w-6 h-6 text-slate-800" />
            </Button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              0
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search dishes..." 
              className="pl-11 h-12 rounded-2xl bg-slate-50 border-none text-slate-700 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="px-6">
          <CategoryNav />
        </div>

        {/* Menu Items Grid */}
        <div className="px-6 py-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Popular Choices</h3>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">View All</span>
          </div>
          
          <div className="grid gap-6 pb-8">
            {MENU_ITEMS.map((item) => (
              <MenuCard 
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Floating AI Advisor */}
        <AITasteAdvisor />
      </div>
    </div>
  )
}
