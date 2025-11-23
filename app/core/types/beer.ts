export interface FlavorProfile {
  hoppy: number
  bitter: number
  sweet: number
  sour: number
  malty: number
  fruity: number
}

export interface Review {
  id: string
  author: string
  avatar?: string
  rating: number
  comment: string
  date: string
}

export interface Ingredients {
  malt: string[]
  hops: string[]
  yeast: string
}

export interface BrewersTip {
  id: string
  tip: string
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface Beer {
  id: string
  name: string
  brewery: string
  breweryLocation: string
  style: string
  abv: number
  ibu: number
  og: number // Original Gravity
  fg: number // Final Gravity
  difficulty: DifficultyLevel
  image: string
  description: string
  tastingNotes: string
  flavorProfile: FlavorProfile
  foodPairings: string[]
  reviews: Review[]
  ingredients: Ingredients
  brewersTips: BrewersTip[]
  rating: number
  reviewCount: number
  isNew?: boolean
  isFeatured?: boolean
  tags: string[]
  category: BrewingCategory
}

export type BrewingCategory = 'ales' | 'lagers' | 'high-gravity' | 'hoppy' | 'experimental'

export type FilterTag = 'all' | 'ales' | 'lagers' | 'high-gravity' | 'hoppy' | 'experimental'

export type SortOption = 'newest' | 'top-rated' | 'difficulty' | 'abv' | 'ibu'
