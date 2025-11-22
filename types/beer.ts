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

export interface Beer {
  id: string
  name: string
  brewery: string
  breweryLocation: string
  style: string
  abv: number
  ibu: number
  price: number
  image: string
  description: string
  tastingNotes: string
  flavorProfile: FlavorProfile
  foodPairings: string[]
  reviews: Review[]
  rating: number
  reviewCount: number
  isNew?: boolean
  isFeatured?: boolean
  tags: string[]
}

export type FilterTag = 'hoppy' | 'malty' | 'sour' | 'dark' | 'fruit' | 'high-abv' | 'all'

export type SortOption = 'newest' | 'top-rated' | 'price-low' | 'price-high' | 'abv'
