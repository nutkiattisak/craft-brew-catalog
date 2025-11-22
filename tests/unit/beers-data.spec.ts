import { describe, it, expect } from 'vitest'
import { mockBeers } from '~/core/data/beers'
import type { Beer } from '~/core/types/beer'

describe('Mock Beers Data', () => {
  it('should have beers array with items', () => {
    expect(Array.isArray(mockBeers)).toBe(true)
    expect(mockBeers.length).toBeGreaterThan(0)
  })

  it('each beer should have required properties', () => {
    mockBeers.forEach((beer: Beer) => {
      expect(beer).toHaveProperty('id')
      expect(beer).toHaveProperty('name')
      expect(beer).toHaveProperty('brewery')
      expect(beer).toHaveProperty('style')
      expect(beer).toHaveProperty('abv')
      expect(beer).toHaveProperty('ibu')
      expect(beer).toHaveProperty('price')
      expect(beer).toHaveProperty('description')
      expect(beer).toHaveProperty('flavorProfile')
      expect(beer).toHaveProperty('rating')
      expect(beer).toHaveProperty('tags')
    })
  })

  it('should have valid ABV values (between 0 and 20)', () => {
    mockBeers.forEach((beer: Beer) => {
      expect(beer.abv).toBeGreaterThanOrEqual(0)
      expect(beer.abv).toBeLessThanOrEqual(20)
    })
  })

  it('should have valid price values (greater than 0)', () => {
    mockBeers.forEach((beer: Beer) => {
      expect(beer.price).toBeGreaterThan(0)
    })
  })

  it('should have valid rating values (between 0 and 5)', () => {
    mockBeers.forEach((beer: Beer) => {
      expect(beer.rating).toBeGreaterThanOrEqual(0)
      expect(beer.rating).toBeLessThanOrEqual(5)
    })
  })

  it('should have flavor profile with valid percentages', () => {
    mockBeers.forEach((beer: Beer) => {
      const profile = beer.flavorProfile
      expect(profile.hoppy).toBeGreaterThanOrEqual(0)
      expect(profile.hoppy).toBeLessThanOrEqual(100)
      expect(profile.bitter).toBeGreaterThanOrEqual(0)
      expect(profile.bitter).toBeLessThanOrEqual(100)
      expect(profile.sweet).toBeGreaterThanOrEqual(0)
      expect(profile.sweet).toBeLessThanOrEqual(100)
      expect(profile.sour).toBeGreaterThanOrEqual(0)
      expect(profile.sour).toBeLessThanOrEqual(100)
      expect(profile.malty).toBeGreaterThanOrEqual(0)
      expect(profile.malty).toBeLessThanOrEqual(100)
      expect(profile.fruity).toBeGreaterThanOrEqual(0)
      expect(profile.fruity).toBeLessThanOrEqual(100)
    })
  })

  it('should have unique IDs', () => {
    const ids = mockBeers.map((beer: Beer) => beer.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have at least one featured beer', () => {
    const featuredBeers = mockBeers.filter((beer: Beer) => beer.isFeatured)
    expect(featuredBeers.length).toBeGreaterThan(0)
  })

  it('should have at least one new beer', () => {
    const newBeers = mockBeers.filter((beer: Beer) => beer.isNew)
    expect(newBeers.length).toBeGreaterThan(0)
  })

  it('should have valid tags', () => {
    const validTags = ['hoppy', 'malty', 'sour', 'dark', 'fruit', 'high-abv']
    mockBeers.forEach((beer: Beer) => {
      beer.tags.forEach((tag: string) => {
        expect(validTags).toContain(tag)
      })
    })
  })

  it('should have valid food pairings', () => {
    mockBeers.forEach((beer: Beer) => {
      expect(Array.isArray(beer.foodPairings)).toBe(true)
      expect(beer.foodPairings.length).toBeGreaterThan(0)
    })
  })
})
