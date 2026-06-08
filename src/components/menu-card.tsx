
"use client"

import Image from "next/image"
import { Plus, Minus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface MenuCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  rating?: number
}

export function MenuCard({ name, description, price, imageUrl, rating = 4.8 }: MenuCardProps) {
  const [quantity, setQuantity] = useState(0)

  return (
    <Card className="overflow-hidden border-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-[2rem] bg-white transition-all hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-card-foreground">{rating}</span>
        </div>
      </div>
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg leading-tight text-card-foreground line-clamp-1">{name}</h3>
          <span className="text-primary font-bold text-lg">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center bg-background rounded-full p-1 border border-border/50">
            {quantity > 0 ? (
              <div className="flex items-center">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full text-primary hover:bg-primary/10"
                  onClick={() => setQuantity(q => q - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold text-sm text-card-foreground">{quantity}</span>
              </div>
            ) : null}
            <Button 
              size="icon" 
              className={`h-8 w-8 rounded-full shadow-md ${quantity > 0 ? 'bg-primary' : 'bg-primary'}`}
              onClick={() => setQuantity(q => q + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto font-bold text-xs uppercase tracking-wider">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
