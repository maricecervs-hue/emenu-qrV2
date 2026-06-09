
'use client';

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, ClipboardList, ChevronRight, MapPin, Calendar, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"

type OrderStatus = 'Preparing' | 'Served' | 'Completed'

interface OrderItem {
  id: string
  imageUrl: string
}

interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  table: string
  date: string
  items: OrderItem[]
  total: number
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '198992',
    status: 'Preparing',
    table: '12',
    date: 'Mar 17, 2026 at 10:27 AM',
    total: 139.52,
    items: [
      { id: 'i1', imageUrl: PlaceHolderImages.find(p => p.id === 'beef-burger')?.imageUrl || "" },
      { id: 'i2', imageUrl: PlaceHolderImages.find(p => p.id === 'iced-coffee')?.imageUrl || "" },
      { id: 'i3', imageUrl: PlaceHolderImages.find(p => p.id === 'garlic-bread')?.imageUrl || "" },
      { id: 'i4', imageUrl: PlaceHolderImages.find(p => p.id === 'french-fries')?.imageUrl || "" },
    ]
  },
  {
    id: '2',
    orderNumber: '198765',
    status: 'Served',
    table: '5',
    date: 'Mar 16, 2026 at 06:45 PM',
    total: 87.30,
    items: [
      { id: 'i5', imageUrl: PlaceHolderImages.find(p => p.id === 'pizza-margherita')?.imageUrl || "" },
      { id: 'i6', imageUrl: PlaceHolderImages.find(p => p.id === 'mineral-water')?.imageUrl || "" },
      { id: 'i7', imageUrl: PlaceHolderImages.find(p => p.id === 'cheesecake')?.imageUrl || "" },
    ]
  },
  {
    id: '3',
    orderNumber: '828854',
    status: 'Completed',
    table: '8',
    date: 'Mar 15, 2026 at 02:15 PM',
    total: 45.00,
    items: [
      { id: 'i8', imageUrl: PlaceHolderImages.find(p => p.id === 'pizza-hawaiian')?.imageUrl || "" },
    ]
  }
]

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = React.useState<'All' | OrderStatus>('All')
  const [orders] = React.useState<Order[]>(MOCK_ORDERS)

  const filteredOrders = orders.filter(order => 
    activeFilter === 'All' ? true : order.status === activeFilter
  )

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md bg-[#F8F9FB] min-h-screen flex flex-col relative h-screen overflow-hidden">
        
        {/* Header */}
        <header className="pt-8 pb-6 px-6 bg-white shrink-0">
          <h1 className="text-3xl font-extrabold text-[#1E2B4D] tracking-tight">Your Orders</h1>
        </header>

        {/* Filters */}
        <div className="px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide bg-[#F8F9FB] shrink-0">
          {['All Orders', 'Preparing', 'Served'].map((filter) => {
            const label = filter === 'All Orders' ? 'All' : filter
            const isActive = activeFilter === label
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(label as any)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap border-2",
                  isActive 
                    ? "bg-[#12B4A3] border-[#12B4A3] text-white shadow-lg shadow-[#12B4A3]/20" 
                    : "bg-white border-transparent text-[#8E9AAF] hover:border-slate-200"
                )}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto px-6 pb-32 pt-2">
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className={cn(
                    "bg-white rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden relative",
                    "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5",
                    order.status === 'Preparing' ? "before:bg-[#F97316]" : order.status === 'Served' ? "before:bg-[#22C55E]" : "before:bg-[#E2E8F0]"
                  )}
                >
                  <div className="p-6 space-y-5">
                    {/* Top Row: ID & Status */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-[#1E2B4D]">Order #{order.orderNumber}</h2>
                        <div className="flex items-center gap-4 text-[#8E9AAF]">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">Table {order.table}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={cn(
                        "rounded-xl px-3 py-1 text-[10px] font-bold uppercase tracking-wider border-none",
                        order.status === 'Preparing' ? "bg-[#FFF7ED] text-[#F97316]" : 
                        order.status === 'Served' ? "bg-[#F0FDF4] text-[#22C55E]" : 
                        "bg-[#F8FAFC] text-[#64748B]"
                      )}>
                        {order.status}
                      </Badge>
                    </div>

                    {/* Middle Row: Item Thumbnails */}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3 overflow-hidden">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={item.id} className="relative w-12 h-12 rounded-xl border-[3px] border-white overflow-hidden shadow-sm">
                            <Image src={item.imageUrl} alt="food" fill className="object-cover" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="relative w-12 h-12 rounded-xl border-[3px] border-white bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-[#1E2B4D] shadow-sm">
                            +{order.items.length - 2}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#8E9AAF]">{order.items.length} items</span>
                    </div>

                    {/* Bottom Row: Total & Action */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#8E9AAF] uppercase tracking-widest">Total</span>
                        <span className="text-2xl font-bold text-[#1E2B4D]">${order.total.toFixed(2)}</span>
                      </div>
                      {order.status === 'Completed' ? (
                        <button className="text-[#12B4A3] font-bold text-sm underline decoration-dotted underline-offset-4">
                          Reorder
                        </button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="rounded-full h-11 px-6 border-slate-100 text-[#12B4A3] font-bold text-sm flex items-center gap-2 hover:bg-[#12B4A3]/5"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-80">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner">
                <ShoppingBag className="w-16 h-16 text-slate-200" strokeWidth={1.5} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[#1E2B4D]">No orders yet</h3>
                <p className="text-sm font-medium text-[#8E9AAF] max-w-[200px] mx-auto leading-relaxed">
                  Start ordering from our menu to see your orders here!
                </p>
              </div>
              <Link href="/menu">
                <Button className="rounded-2xl bg-[#12B4A3] h-12 px-8 font-bold">
                  Browse Menu
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] px-16 py-5 flex justify-between items-center z-40">
          <Link href="/menu" className="flex flex-col items-center gap-1.5 cursor-pointer opacity-30 transition-opacity hover:opacity-100">
            <Home className="w-7 h-7 text-slate-500" strokeWidth={2} />
            <span className="text-sm font-semibold text-slate-500">Menu</span>
          </Link>
          <div className="flex flex-col items-center gap-1.5 cursor-pointer">
            <ClipboardList className="w-7 h-7 text-[#12B4A3]" strokeWidth={2} />
            <span className="text-sm font-semibold text-[#12B4A3]">Orders</span>
          </div>
        </nav>

      </div>
    </div>
  )
}
