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
const savedRecipes = ref<string[]>([])

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

    // Apply category filter
    if (activeFilter.value !== 'all') {
      result = result.filter((beer) => {
        switch (activeFilter.value) {
          case 'ales':
            return beer.category === 'ales' || beer.tags.includes('ales')
          case 'lagers':
            return beer.category === 'lagers' || beer.tags.includes('lagers')
          case 'high-gravity':
            return beer.category === 'high-gravity' || beer.og >= 1.07 || beer.abv >= 8.0
          case 'hoppy':
            return (
              beer.category === 'hoppy' ||
              beer.flavorProfile.hoppy >= 70 ||
              beer.tags.includes('hoppy')
            )
          case 'experimental':
            return beer.category === 'experimental' || beer.tags.includes('experimental')
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
      case 'difficulty': {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
        result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
        break
      }
      case 'abv':
        result.sort((a, b) => b.abv - a.abv)
        break
      case 'ibu':
        result.sort((a, b) => b.ibu - a.ibu)
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

  function saveRecipe(beerId: string) {
    if (!savedRecipes.value.includes(beerId)) {
      savedRecipes.value.push(beerId)
    }
  }

  function isInWishlist(beerId: string) {
    return wishlist.value.includes(beerId)
  }

  function isRecipeSaved(beerId: string) {
    return savedRecipes.value.includes(beerId)
  }

  return {
    beers,
    searchQuery,
    activeFilter,
    sortOption,
    selectedBeer,
    isModalOpen,
    wishlist,
    savedRecipes,
    filteredBeers,
    featuredBeers,
    newBeers,
    setSearchQuery,
    setActiveFilter,
    setSortOption,
    openBeerModal,
    closeBeerModal,
    toggleWishlist,
    saveRecipe,
    isInWishlist,
    isRecipeSaved,
  }
}
