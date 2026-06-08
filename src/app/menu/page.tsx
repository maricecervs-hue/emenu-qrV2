'use client';

import * as React from "react"
import { ChevronLeft, Search, Flame, Pizza as PizzaIcon, Utensils, IceCream, Coffee, ShoppingCart, Home, ClipboardList } from "lucide-react"
import Link from "next/link"
import { CategoryNav } from "@/components/category-nav"
import { MenuCard } from "@/components/menu-card"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { CartDrawer } from "@/components/cart-drawer"
import { CustomizerDrawer } from "@/components/customizer-drawer"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

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
    imageUrl: PlaceHolderImages.find(i => i.id === 'pizza-margherita')?.imageUrl || "",
    imageHint: "margherita pizza",
    category: 'bestsellers',
    customisable: false
  },
  {
    id: '13',
    name: 'Premium Beef Burger',
    description: '100% Wagyu beef, aged cheddar, pickles, and our signature burger sauce.',
    price: 38.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'beef-burger')?.imageUrl || "",
    imageHint: "beef burger",
    category: 'bestsellers',
    customisable: true
  },
  {
    id: '2',
    name: 'Chicken Alfredo Pizza - 12 inches',
    description: 'Homemade dough, white sauce base, marinated chicken, parmesan.',
    price: 48.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'pizza-alfredo')?.imageUrl || "",
    imageHint: "chicken pizza",
    category: 'bestsellers',
    customisable: true
  },
  {
    id: '3',
    name: 'Pizza Margherita - 10 inches',
    description: 'Classic thin crust with fresh tomato sauce and mozzarella.',
    price: 27.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'pizza-margherita')?.imageUrl || "",
    imageHint: "margherita pizza",
    category: 'pizza',
    customisable: false
  },
  {
    id: '4',
    name: 'Hawaiian Pizza - 10 inches',
    description: 'The perfect balance of ham and sweet pineapple chunks.',
    price: 32.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'pizza-hawaiian')?.imageUrl || "",
    imageHint: "hawaiian pizza",
    category: 'pizza',
    customisable: true
  },
  {
    id: '5',
    name: 'Garlic Bread',
    description: 'Crispy baguette slices with roasted garlic butter and herbs.',
    price: 12.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'garlic-bread')?.imageUrl || "",
    imageHint: "garlic bread",
    category: 'sides',
    customisable: false
  },
  {
    id: '6',
    name: 'Buffalo Chicken Wings',
    description: 'Spicy glazed wings served with a side of blue cheese dip.',
    price: 18.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'chicken-wings')?.imageUrl || "",
    imageHint: "chicken wings",
    category: 'sides',
    customisable: true
  },
  {
    id: '7',
    name: 'French Fries',
    description: 'Deep fried golden potatoes served with classic ketchup.',
    price: 8.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'french-fries')?.imageUrl || "",
    imageHint: "french fries",
    category: 'sides',
    customisable: false
  },
  {
    id: '8',
    name: 'Warm Chocolate Brownie',
    description: 'Fudgy brownie topped with vanilla bean ice cream.',
    price: 15.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'brownie-dessert')?.imageUrl || "",
    imageHint: "chocolate brownie",
    category: 'desserts',
    customisable: false
  },
  {
    id: '9',
    name: 'New York Cheesecake',
    description: 'Classic velvety cheesecake with a graham cracker crust.',
    price: 16.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'cheesecake')?.imageUrl || "",
    imageHint: "cheesecake",
    category: 'desserts',
    customisable: false
  },
  {
    id: '10',
    name: 'Iced Latte',
    description: 'Premium espresso with chilled milk over ice.',
    price: 6.00,
    imageUrl: PlaceHolderImages.find(i => i.id === 'iced-coffee')?.imageUrl || "",
    imageHint: "iced coffee",
    category: 'drinks',
    customisable: true
  },
  {
    id: '11',
    name: 'Cola',
    description: 'Refreshing carbonated soft drink served with ice.',
    price: 3.50,
    imageUrl: PlaceHolderImages.find(i => i.id === 'cola-drink')?.imageUrl || "",
    imageHint: "soft drink",
    category: 'drinks',
    customisable: false
  },
  {
    id: '12',
    name: 'Mineral Water',
    description: 'Natural spring water, still or sparkling.',
    price: 2.50,
    imageUrl: PlaceHolderImages.find(i => i.id === 'mineral-water')?.imageUrl || "",
    imageHint: "mineral water",
    category: 'drinks',
    customisable: false
  }
]

export default function MenuPage() {
  const { toast } = useToast()
  const [activeCategory, setActiveCategory] = React.useState('bestsellers')
  const [isManualScrolling, setIsManualScrolling] = React.useState(false)
  const [isNavVisible, setIsNavVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const [editingCartItem, setEditingCartItem] = React.useState<any>(null)
  const [cartItems, setCartItems] = React.useState<{
    id: string
    cartId: string 
    name: string
    price: number
    quantity: number
    imageUrl: string
    customizations?: string
  }[]>([])
  
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const prevCartCount = React.useRef(0)

  React.useEffect(() => {
    if (prevCartCount.current > 0 && cartItems.length === 0) {
      setIsCartOpen(false)
      toast({
        title: "Basket Empty",
        description: "All items removed from your basket.",
      })
    }
    prevCartCount.current = cartItems.length
  }, [cartItems.length, toast])

  const filteredItems = React.useMemo(() => {
    return CATEGORIES.map(category => ({
      id: category.id,
      title: category.name,
      items: MENU_ITEMS.filter(item => item.category === category.id)
    })).filter(section => section.items.length > 0)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return
      const currentScrollY = scrollContainerRef.current.scrollTop
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  React.useEffect(() => {
    if (isManualScrolling) return;
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-20% 0px -70% 0px',
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
      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  const handleAddToCart = (item: any, quantity: number, customizations?: string) => {
    setCartItems(prev => {
      const cartId = customizations ? `${item.id}-${customizations}` : item.id
      const existing = prev.find(i => i.cartId === cartId)
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, {
        id: item.id,
        cartId: cartId,
        name: item.name,
        price: item.price,
        quantity: quantity,
        imageUrl: item.imageUrl,
        customizations: customizations
      }]
    })
  }

  const handleUpdateCartItem = (oldCartId: string, item: any, quantity: number, customizations?: string) => {
    setCartItems(prev => {
      const newCartId = customizations ? `${item.id}-${customizations}` : item.id
      return prev.map(i => i.cartId === oldCartId ? {
        ...i,
        cartId: newCartId,
        quantity: quantity,
        customizations: customizations
      } : i)
    })
    setEditingCartItem(null)
  }

  const updateCartQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => 
        item.cartId === cartId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    })
  }

  const removeCartItem = (cartId: string) => {
    setCartItems(prev => {
      return prev.filter(item => item.cartId !== cartId)
    })
  }

  const handleEditCartItem = (item: any) => {
    setEditingCartItem(item)
    setIsCartOpen(false)
  }

  const activeCategoryItemsCount = MENU_ITEMS.filter(item => item.category === activeCategory).length
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Find original item data for the customizer when editing
  const editingBaseItem = editingCartItem ? MENU_ITEMS.find(i => i.id === editingCartItem.id) : null

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative h-screen overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide pb-32"
        >
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

          <div className="sticky top-0 z-50 bg-white">
            <CategoryNav 
              categories={CATEGORIES} 
              active={activeCategory} 
              onChange={handleCategoryChange} 
            />
          </div>

          <div className="px-4 space-y-10 py-6">
            {filteredItems.map((section) => (
              <div 
                key={section.id} 
                id={`section-${section.id}`} 
                className="space-y-6 scroll-mt-24" 
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
                      imageHint={item.imageHint}
                      customisable={item.customisable}
                      onAddToCart={(qty, cust) => handleAddToCart(item, qty, cust)}
                      currentQuantity={cartItems.filter(i => i.id === item.id).reduce((sum, i) => sum + i.quantity, 0)}
                      onUpdateQuantity={(delta) => {
                        const cartItem = cartItems.find(i => i.id === item.id)
                        if (cartItem) updateCartQuantity(cartItem.cartId, delta)
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className={cn(
            "fixed bottom-28 right-6 z-50 transition-all duration-300 ease-in-out",
            (cartItems.length === 0) ? "translate-y-24 opacity-0 scale-0 pointer-events-none" : "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          )}
        >
          <div className="relative">
            <Button 
              className="w-16 h-16 rounded-full bg-[#FF5C5C] hover:bg-[#FF4D4D] shadow-2xl flex items-center justify-center p-0 transition-transform active:scale-90"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-7 h-7 text-white" />
            </Button>
            {totalCartItems > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {totalCartItems}
              </div>
            )}
          </div>
        </div>

        <nav 
          className={cn(
            "fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] px-16 py-5 flex justify-between items-center z-40 transition-transform duration-300 ease-in-out",
            !isNavVisible && "translate-y-full"
          )}
        >
          <div className="flex flex-col items-center gap-1.5 cursor-pointer">
            <Home className="w-7 h-7 text-[#12B4A3]" strokeWidth={2.5} />
            <span className="text-sm font-bold text-[#12B4A3]">Menu</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-30">
            <ClipboardList className="w-7 h-7 text-slate-500" strokeWidth={2.5} />
            <span className="text-sm font-bold text-slate-500">Orders</span>
          </div>
        </nav>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeCartItem}
          onEdit={handleEditCartItem}
        />

        {editingBaseItem && (
          <CustomizerDrawer 
            isOpen={!!editingCartItem}
            onClose={() => setEditingCartItem(null)}
            item={editingBaseItem}
            customisable={editingBaseItem.customisable}
            onAddToCart={(qty, cust) => handleUpdateCartItem(editingCartItem.cartId, editingBaseItem, qty, cust)}
            isEdit
          />
        )}
      </div>
    </div>
  )
}
