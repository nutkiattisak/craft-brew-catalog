import type { Beer } from '~/types/beer'

export const mockBeers: Beer[] = [
  {
    id: '1',
    name: 'Hazy Horizon IPA',
    brewery: 'Cloudwater Brew Co.',
    breweryLocation: 'Manchester, UK',
    style: 'New England IPA',
    abv: 6.5,
    ibu: 45,
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=600&fit=crop',
    description: 'A tropical explosion of citrus and stone fruit flavors with a pillowy soft mouthfeel.',
    tastingNotes: 'Bursting with notes of mango, pineapple, and citrus zest. The oat-heavy grain bill provides a silky smooth body with minimal bitterness.',
    flavorProfile: {
      hoppy: 85,
      bitter: 35,
      sweet: 45,
      sour: 10,
      malty: 40,
      fruity: 90
    },
    foodPairings: ['burger', 'tacos', 'cheese'],
    reviews: [
      {
        id: 'r1',
        author: 'CraftBeerFan',
        rating: 5,
        comment: 'Best hazy IPA I\'ve had this year! The tropical notes are incredible.',
        date: '2024-03-15'
      },
      {
        id: 'r2',
        author: 'HopHead42',
        rating: 4,
        comment: 'Great balance of flavors, could use a bit more hop punch.',
        date: '2024-03-10'
      }
    ],
    rating: 4.7,
    reviewCount: 234,
    isNew: true,
    tags: ['hoppy', 'fruit']
  },
  {
    id: '2',
    name: 'Midnight Velvet Stout',
    brewery: 'Dark Horse Brewing',
    breweryLocation: 'Dublin, Ireland',
    style: 'Imperial Stout',
    abv: 9.2,
    ibu: 55,
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=600&fit=crop',
    description: 'A rich, decadent imperial stout with notes of dark chocolate, espresso, and vanilla.',
    tastingNotes: 'Deep roasted malt character with layers of baker\'s chocolate, fresh espresso, and hints of dark cherry. Finishes with warming bourbon notes.',
    flavorProfile: {
      hoppy: 20,
      bitter: 60,
      sweet: 70,
      sour: 5,
      malty: 95,
      fruity: 15
    },
    foodPairings: ['steak', 'chocolate', 'cheese'],
    reviews: [
      {
        id: 'r3',
        author: 'DarkBeerLover',
        rating: 5,
        comment: 'Liquid dessert! The chocolate and coffee notes are perfectly balanced.',
        date: '2024-03-12'
      }
    ],
    rating: 4.8,
    reviewCount: 189,
    isFeatured: true,
    tags: ['dark', 'malty', 'high-abv']
  },
  {
    id: '3',
    name: 'Citrus Punch Sour',
    brewery: 'Wild Barrel Brewing',
    breweryLocation: 'San Diego, CA',
    style: 'Fruited Sour Ale',
    abv: 5.0,
    ibu: 8,
    price: 7.49,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=600&fit=crop',
    description: 'A refreshingly tart kettle sour loaded with blood orange and grapefruit.',
    tastingNotes: 'Bright, zippy acidity balanced by natural citrus sweetness. Vibrant orange and grapefruit notes dance on the palate with a clean, dry finish.',
    flavorProfile: {
      hoppy: 10,
      bitter: 15,
      sweet: 50,
      sour: 85,
      malty: 20,
      fruity: 80
    },
    foodPairings: ['seafood', 'salad', 'cheese'],
    reviews: [
      {
        id: 'r4',
        author: 'SourPower',
        rating: 4,
        comment: 'Perfect summer beer! Refreshing and not too sweet.',
        date: '2024-03-08'
      }
    ],
    rating: 4.3,
    reviewCount: 156,
    tags: ['sour', 'fruit']
  },
  {
    id: '4',
    name: 'Golden Harvest Lager',
    brewery: 'Heritage Brewing Co.',
    breweryLocation: 'Munich, Germany',
    style: 'Munich Helles',
    abv: 4.8,
    ibu: 18,
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=400&h=600&fit=crop',
    description: 'A crisp, clean German-style lager with delicate malt sweetness and noble hop character.',
    tastingNotes: 'Light bready malt with subtle honey notes. Crisp and refreshing with a gentle floral hop finish. The epitome of drinkability.',
    flavorProfile: {
      hoppy: 30,
      bitter: 25,
      sweet: 40,
      sour: 5,
      malty: 55,
      fruity: 20
    },
    foodPairings: ['pretzel', 'sausage', 'chicken'],
    reviews: [
      {
        id: 'r5',
        author: 'LagerLad',
        rating: 5,
        comment: 'Pure perfection. This is what beer should taste like.',
        date: '2024-03-14'
      }
    ],
    rating: 4.5,
    reviewCount: 312,
    tags: ['malty']
  },
  {
    id: '5',
    name: 'West Coast Crusher',
    brewery: 'Stone Brewing',
    breweryLocation: 'Escondido, CA',
    style: 'West Coast IPA',
    abv: 7.0,
    ibu: 70,
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&h=600&fit=crop',
    description: 'An aggressively hopped West Coast IPA with bold pine and citrus character.',
    tastingNotes: 'Resinous pine needle and dank cannabis notes upfront, followed by bright grapefruit and orange peel. Clean, bitter finish that begs another sip.',
    flavorProfile: {
      hoppy: 95,
      bitter: 80,
      sweet: 20,
      sour: 5,
      malty: 25,
      fruity: 45
    },
    foodPairings: ['burger', 'wings', 'pizza'],
    reviews: [
      {
        id: 'r6',
        author: 'WestCoastBest',
        rating: 5,
        comment: 'Finally, a real IPA! None of that hazy nonsense.',
        date: '2024-03-11'
      }
    ],
    rating: 4.6,
    reviewCount: 278,
    isFeatured: true,
    tags: ['hoppy', 'high-abv']
  },
  {
    id: '6',
    name: 'Belgian Abbey Dubbel',
    brewery: 'Trappist Spirits',
    breweryLocation: 'Brussels, Belgium',
    style: 'Belgian Dubbel',
    abv: 7.5,
    ibu: 20,
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=600&fit=crop',
    description: 'A traditional Belgian abbey ale with rich malt complexity and spicy yeast character.',
    tastingNotes: 'Deep amber with notes of dark fruit, caramel, and brown sugar. Distinctive Belgian yeast contributes clove and black pepper spiciness.',
    flavorProfile: {
      hoppy: 15,
      bitter: 30,
      sweet: 65,
      sour: 10,
      malty: 80,
      fruity: 55
    },
    foodPairings: ['steak', 'cheese', 'duck'],
    reviews: [
      {
        id: 'r7',
        author: 'BelgianBeerBuff',
        rating: 5,
        comment: 'Authentic Belgian craftsmanship. Complex and beautiful.',
        date: '2024-03-09'
      }
    ],
    rating: 4.9,
    reviewCount: 145,
    tags: ['malty', 'high-abv']
  },
  {
    id: '7',
    name: 'Raspberry Riot',
    brewery: 'Funk Factory Geuzeria',
    breweryLocation: 'Madison, WI',
    style: 'Fruited Lambic',
    abv: 6.0,
    ibu: 5,
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400&h=600&fit=crop',
    description: 'A wild ale aged with fresh Wisconsin raspberries for intense fruit character.',
    tastingNotes: 'Vibrant raspberry jumps from the glass. Tart, funky, and complex with a dry, champagne-like finish. Oak and brett add depth.',
    flavorProfile: {
      hoppy: 5,
      bitter: 10,
      sweet: 35,
      sour: 90,
      malty: 15,
      fruity: 95
    },
    foodPairings: ['dessert', 'cheese', 'salad'],
    reviews: [
      {
        id: 'r8',
        author: 'WildAleWizard',
        rating: 5,
        comment: 'Mind-blowing complexity. Worth every penny.',
        date: '2024-03-13'
      }
    ],
    rating: 4.8,
    reviewCount: 98,
    isNew: true,
    tags: ['sour', 'fruit']
  },
  {
    id: '8',
    name: 'Smokehouse Porter',
    brewery: 'Alaskan Brewing',
    breweryLocation: 'Juneau, AK',
    style: 'Smoked Porter',
    abv: 6.5,
    ibu: 45,
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=400&h=600&fit=crop',
    description: 'A robust porter brewed with alder-smoked malts for a distinctive campfire character.',
    tastingNotes: 'Rich, smoky aroma leads to flavors of dark chocolate, coffee, and campfire. Medium body with a smooth, slightly sweet finish.',
    flavorProfile: {
      hoppy: 25,
      bitter: 45,
      sweet: 50,
      sour: 5,
      malty: 85,
      fruity: 10
    },
    foodPairings: ['bbq', 'steak', 'bacon'],
    reviews: [
      {
        id: 'r9',
        author: 'SmokyBeerLover',
        rating: 4,
        comment: 'Like drinking a campfire in the best way possible.',
        date: '2024-03-07'
      }
    ],
    rating: 4.4,
    reviewCount: 167,
    tags: ['dark', 'malty']
  }
]
