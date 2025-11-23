export type IngredientCategory = 'malt' | 'hops' | 'yeast' | 'adjunct'

export interface Malt {
  id: string
  name: string
  type: 'malt'
  origin: string
  color: number // Lovibond
  description: string
  flavor: string[]
  usage: string
  maxPercentage?: number
  image: string
}

export interface Hop {
  id: string
  name: string
  type: 'hops'
  origin: string
  alphaAcid: string // e.g., "12-14%"
  description: string
  aroma: string[]
  usage: 'bittering' | 'aroma' | 'dual'
  substitutes: string[]
  image: string
}

export interface Yeast {
  id: string
  name: string
  type: 'yeast'
  brand: string
  strain: string
  description: string
  attenuation: string // e.g., "73-77%"
  flocculation: 'low' | 'medium' | 'high'
  temperature: string // e.g., "64-72°F"
  styles: string[]
  image: string
}

export interface Adjunct {
  id: string
  name: string
  type: 'adjunct'
  category: string
  description: string
  flavor: string[]
  usage: string
  image: string
}

export type Ingredient = Malt | Hop | Yeast | Adjunct
