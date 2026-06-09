"use client"

import * as React from "react"
import { Sparkles, Loader2, Wine, UtensilsCrossed } from "lucide-react"
import { aiTasteAdvisorRecommendations, AITasteAdvisorRecommendationsOutput } from "@/ai/flows/ai-taste-advisor-recommendations"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const TASTE_OPTIONS = ["Spicy", "Light", "Savory", "Sweet", "Vegetarian", "Gluten-Free", "Chef's Choice"]

export function AITasteAdvisor() {
  const [loading, setLoading] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [recommendations, setRecommendations] = React.useState<AITasteAdvisorRecommendationsOutput | null>(null)

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const getRecommendations = async () => {
    setLoading(true)
    try {
      const result = await aiTasteAdvisorRecommendations({
        tastePreferences: selectedTags
      })
      setRecommendations(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 animate-bounce hover:animate-none"
          size="icon"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-[2.5rem] bg-background border-none p-0 overflow-hidden [&>button]:hidden">
        <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted" />
        <ScrollArea className="h-full">
          <div className="p-6 pb-24 space-y-8">
            <SheetHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <SheetTitle className="text-2xl font-bold font-headline text-card-foreground">Taste Advisor</SheetTitle>
              </div>
              <SheetDescription className="text-lg">
                Tell me what you're in the mood for, and I'll find your perfect match.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4">
              <h3 className="font-semibold text-card-foreground">Select your preferences:</h3>
              <div className="flex flex-wrap gap-2">
                {TASTE_OPTIONS.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`px-4 py-2 text-sm cursor-pointer transition-all rounded-full ${
                      selectedTags.includes(tag) ? 'bg-primary border-primary' : 'hover:bg-primary/5'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              onClick={getRecommendations} 
              disabled={loading || selectedTags.length === 0}
              className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Flavors...
                </>
              ) : (
                'Find My Perfect Meal'
              )}
            </Button>

            {recommendations && (
              <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-xl text-card-foreground">Recommended Dishes</h3>
                  </div>
                  <div className="grid gap-3">
                    {recommendations.dishRecommendations.map((dish, i) => (
                      <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-border/50 flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                          {i + 1}
                        </div>
                        <p className="text-card-foreground font-medium leading-tight pt-1">{dish}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Wine className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-xl text-card-foreground">Wine Pairings</h3>
                  </div>
                  <div className="grid gap-3">
                    {recommendations.winePairings.map((wine, i) => (
                      <div key={i} className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
                         <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0 text-primary">
                          <Wine className="h-4 w-4" />
                        </div>
                        <p className="text-card-foreground font-medium leading-tight pt-1 italic">{wine}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
