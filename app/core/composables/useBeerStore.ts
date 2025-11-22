import { ref, computed } from 'vue'
import type { Beer, FilterTag, SortOption } from '~/core/types/beer'
import { mockBeers } from '~/core/data/beers'

const beers = ref<Beer[]>(mockBeers)
const searchQuery = ref('')
const activeFilter = ref<FilterTag>('all')
const sortOption = ref<SortOption>('newest')
const selectedBeer = ref<Beer | null>(null)
const isModalOpen = ref(false)
const wishlist = ref<string[]>([])
const cart = ref<string[]>([])

export function useBeerStore() {
  const filteredBeers = computed(() => {
    let result = [...beers.value]

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (beer) =>
          beer.name.toLowerCase().includes(query) ||
          beer.brewery.toLowerCase().includes(query) ||
          beer.style.toLowerCase().includes(query)
      )
    }

    // Apply tag filter
    if (activeFilter.value !== 'all') {
      result = result.filter((beer) => {
        switch (activeFilter.value) {
          case 'hoppy':
            return beer.flavorProfile.hoppy >= 70 || beer.tags.includes('hoppy')
          case 'malty':
            return beer.flavorProfile.malty >= 70 || beer.tags.includes('malty')
          case 'sour':
            return beer.flavorProfile.sour >= 50 || beer.tags.includes('sour')
          case 'dark':
            return (
              beer.style.toLowerCase().includes('stout') ||
              beer.style.toLowerCase().includes('porter') ||
              beer.tags.includes('dark')
            )
          case 'fruit':
            return beer.flavorProfile.fruity >= 60 || beer.tags.includes('fruit')
          case 'high-abv':
            return beer.abv >= 7.0 || beer.tags.includes('high-abv')
          default:
            return true
        }
      })
    }

    // Apply sorting
    switch (sortOption.value) {
      case 'newest':
        result = result.filter((b) => b.isNew).concat(result.filter((b) => !b.isNew))
        break
      case 'top-rated':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'abv':
        result.sort((a, b) => b.abv - a.abv)
        break
    }

    return result
  })

  const featuredBeers = computed(() => beers.value.filter((beer) => beer.isFeatured))

  const newBeers = computed(() => beers.value.filter((beer) => beer.isNew))

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setActiveFilter(filter: FilterTag) {
    activeFilter.value = filter
  }

  function setSortOption(option: SortOption) {
    sortOption.value = option
  }

  function openBeerModal(beer: Beer) {
    selectedBeer.value = beer
    isModalOpen.value = true
  }

  function closeBeerModal() {
    isModalOpen.value = false
    setTimeout(() => {
      selectedBeer.value = null
    }, 300)
  }

  function toggleWishlist(beerId: string) {
    const index = wishlist.value.indexOf(beerId)
    if (index === -1) {
      wishlist.value.push(beerId)
    } else {
      wishlist.value.splice(index, 1)
    }
  }

  function addToCart(beerId: string) {
    if (!cart.value.includes(beerId)) {
      cart.value.push(beerId)
    }
  }

  function isInWishlist(beerId: string) {
    return wishlist.value.includes(beerId)
  }

  function isInCart(beerId: string) {
    return cart.value.includes(beerId)
  }

  return {
    beers,
    searchQuery,
    activeFilter,
    sortOption,
    selectedBeer,
    isModalOpen,
    wishlist,
    cart,
    filteredBeers,
    featuredBeers,
    newBeers,
    setSearchQuery,
    setActiveFilter,
    setSortOption,
    openBeerModal,
    closeBeerModal,
    toggleWishlist,
    addToCart,
    isInWishlist,
    isInCart,
  }
}
