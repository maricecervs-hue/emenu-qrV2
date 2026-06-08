
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
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-1')?.imageUrl || "https://picsum.photos/seed/dish1/400/300",
    category: 'bestsellers',
    customisable: false
  },
  {
    id: '2',
    name: 'Chicken Alfredo Pizza - 12 inches',
    description: 'Homemade dough, white sauce base, marinated chicken, parmesan.',
    price: 48.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-2')?.imageUrl || "https://picsum.photos/seed/dish2/400/300",
    category: 'bestsellers',
    customisable: true
  },
  {
    id: '3',
    name: 'Pizza Margherita - 10 inches',
    description: 'Homemade dough, homemade pizza sauce, fresh mozzarella, basil.',
    price: 27.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-1')?.imageUrl || "https://picsum.photos/seed/dish1/400/300",
    category: 'pizza',
    customisable: false
  },
  {
    id: '4',
    name: 'Hawaiian Pizza - 10 inches',
    description: 'Homemade dough, pizza sauce, mozzarella, ham, pineapple.',
    price: 32.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-5')?.imageUrl || "https://picsum.photos/seed/dish5/400/300",
    category: 'pizza',
    customisable: true
  },
  {
    id: '5',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter and herbs.',
    price: 12.00,
    imageUrl: "https://picsum.photos/seed/garlic/400/300",
    category: 'sides',
    customisable: false
  },
  {
    id: '6',
    name: 'French Fries',
    description: 'Crispy golden fries served with ketchup.',
    price: 8.00,
    imageUrl: "https://picsum.photos/seed/fries/400/300",
    category: 'sides',
    customisable: false
  },
  {
    id: '7',
    name: 'Chocolate Brownie',
    description: 'Warm brownie with vanilla ice cream.',
    price: 15.00,
    imageUrl: "https://picsum.photos/seed/brownie/400/300",
    category: 'desserts',
    customisable: false
  },
  {
    id: '8',
    name: 'Soft Drink',
    description: 'Choose your favorite flavor.',
    price: 3.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-6')?.imageUrl || "https://picsum.photos/seed/wine1/400/300",
    category: 'drinks',
    customisable: true
  },
  {
    id: '9',
    name: 'Bottled Water',
    description: 'Still or sparkling water.',
    price: 2.50,
    imageUrl: "https://picsum.photos/seed/water/400/300",
    category: 'drinks',
    customisable: false
  }
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState('bestsellers')
  const [isManualScrolling, setIsManualScrolling] = React.useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const filteredItems = React.useMemo(() => {
    return CATEGORIES.map(category => ({
      id: category.id,
      title: category.name,
      items: MENU_ITEMS.filter(item => item.category === category.id)
    })).filter(section => section.items.length > 0)
  }, [])

  // Highlight category on scroll
  React.useEffect(() => {
    if (isManualScrolling) return;

    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace('section-', '');
          setActiveCategory(categoryId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    CATEGORIES.forEach((category) => {
      const element = document.getElementById(`section-${category.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isManualScrolling]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setIsManualScrolling(true);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Reset manual scroll flag after animation finished approx
      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  const activeCategoryItemsCount = MENU_ITEMS.filter(item => item.category === activeCategory).length

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative h-screen overflow-hidden">
        
        {/* Main Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide pb-32"
        >
          {/* Top Header - Scrolls Away */}
          <header className="pt-6 pb-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <ChevronLeft className="w-6 h-6 text-slate-800" />
              </Link>
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold text-[#1E2B4D]">
                  {CATEGORIES.find(c => c.id === activeCategory)?.name || 'Menu'}
                </h2>
                <span className="text-sm font-medium text-[#12B4A3]">
                  {activeCategoryItemsCount} items
                </span>
              </div>
            </div>
            <Search className="w-6 h-6 text-slate-800" />
          </header>

          {/* Sticky Category Navigation */}
          <div className="sticky top-0 z-50 bg-white">
            <CategoryNav 
              categories={CATEGORIES} 
              active={activeCategory} 
              onChange={handleCategoryChange} 
            />
          </div>

          {/* Menu Sections */}
          <div className="px-4 space-y-10 py-6">
            {filteredItems.map((section) => (
              <div 
                key={section.id} 
                id={`section-${section.id}`} 
                className="space-y-6 scroll-mt-20" 
              >
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
        <div className="fixed bottom-28 right-6 z-50 pointer-events-none">
          <div className="relative pointer-events-auto">
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
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] px-16 py-5 flex justify-between items-center z-40">
          <div className="flex flex-col items-center gap-1.5 cursor-pointer">
            <Home className="w-7 h-7 text-[#12B4A3]" strokeWidth={2.5} />
            <span className="text-sm font-bold text-[#12B4A3]">Menu</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-30">
            <ClipboardList className="w-7 h-7 text-slate-500" strokeWidth={2.5} />
            <span className="text-sm font-bold text-slate-500">Orders</span>
          </div>
        </nav>
      </div>
    </div>
  )
}
