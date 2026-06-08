
import Image from "next/image"
import { Search, ShoppingBag, MapPin, Bell } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/language-selector"
import { CategoryNav } from "@/components/category-nav"
import { MenuCard } from "@/components/menu-card"
import { AITasteAdvisor } from "@/components/ai-taste-advisor"

const DISHES = [
  { 
    id: "1", 
    name: "Classic Margherita", 
    description: "San Marzano tomatoes, fresh mozzarella, organic basil, extra virgin olive oil.", 
    price: 18.00, 
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-1')?.imageUrl || "" 
  },
  { 
    id: "2", 
    name: "Truffle Tagliatelle", 
    description: "House-made pasta, black winter truffle, aged parmesan cream, roasted garlic.", 
    price: 24.50, 
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-2')?.imageUrl || "" 
  },
  { 
    id: "3", 
    name: "Atlantic Salmon", 
    description: "Pan-seared wild salmon, lemon butter reduction, wild asparagus, heritage carrots.", 
    price: 32.00, 
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-3')?.imageUrl || "" 
  },
  { 
    id: "4", 
    name: "Signature Caesar", 
    description: "Baby gem lettuce, focaccia croutons, white anchovy dressing, shaved parmigiano.", 
    price: 16.00, 
    imageUrl: PlaceHolderImages.find(i => i.id === 'dish-4')?.imageUrl || "" 
  },
]

export default function Home() {
  const heroImage = PlaceHolderImages.find(i => i.id === 'hero-food')?.imageUrl || ""

  return (
    <main className="relative min-h-screen bg-background pb-20">
      {/* Immersive Hero Section */}
      <div className="relative h-[45vh] w-full">
        <Image
          src={heroImage}
          alt="Restaurant Ambiance"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Transparent Header */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-bold tracking-tight uppercase">Table 24</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-md rounded-full border border-white/20 h-10 w-10 text-white">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="absolute bottom-16 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold font-headline mb-2 leading-tight">Gourmet Corner</h1>
          <p className="text-white/80 font-medium">Modern European Cuisine</p>
        </div>
      </div>

      {/* Floating Menu Container */}
      <div className="relative -mt-12 bg-background rounded-t-[3rem] px-6 pt-10 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto space-y-8">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for your favorite dish..." 
              className="w-full bg-white h-14 pl-12 rounded-2xl border-none shadow-sm text-base focus-visible:ring-primary"
            />
          </div>

          {/* Categories */}
          <section>
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="text-xl font-bold text-card-foreground">Categories</h2>
              <Button variant="link" className="text-primary font-bold">See All</Button>
            </div>
            <CategoryNav />
          </section>

          {/* Menu Items */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-bold text-card-foreground">Recommended for You</h2>
            </div>
            <div className="grid gap-6">
              {DISHES.map(dish => (
                <MenuCard 
                  key={dish.id}
                  id={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  imageUrl={dish.imageUrl}
                />
              ))}
            </div>
          </section>

          {/* Payment CTA - Direct Bill Payment Mock */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-40">
            <Button className="w-full h-16 rounded-2xl shadow-xl text-lg font-bold flex justify-between items-center px-8">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6" />
                <span>View Order</span>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-lg">$0.00</span>
            </Button>
          </div>
        </div>
      </div>

      {/* AI Advisor Tool */}
      <AITasteAdvisor />
    </main>
  )
}
