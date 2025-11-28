import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lazy register GSAP plugins only when needed
let pluginsRegistered = false

function ensurePluginsRegistered() {
  if (import.meta.client && !pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger)
    pluginsRegistered = true
  }
}

export function useGsap() {
  // Defer animations until after page interactive
  const isPageInteractive = ref(false)

  onMounted(() => {
    if (import.meta.client) {
      // Wait for page to be interactive before running animations
      if (document.readyState === 'complete') {
        isPageInteractive.value = true
        ensurePluginsRegistered()
      } else {
        window.addEventListener('load', () => {
          // Use requestIdleCallback to defer non-critical animations
          if ('requestIdleCallback' in window) {
            requestIdleCallback(
              () => {
                isPageInteractive.value = true
                ensurePluginsRegistered()
              },
              { timeout: 500 }
            )
          } else {
            setTimeout(() => {
              isPageInteractive.value = true
              ensurePluginsRegistered()
            }, 100)
          }
        })
      }
    }
  })
  // Optimized fade in from bottom animation - reduced duration
  const fadeInUp = (element: string | Element | Element[], options: gsap.TweenVars = {}) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(element, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      ...options,
    })
  }

  // Optimized fade in animation
  const fadeIn = (element: string | Element | Element[], options: gsap.TweenVars = {}) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(element, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      ...options,
    })
  }

  // Optimized stagger animation for multiple elements
  const staggerFadeInUp = (
    elements: string | Element | Element[],
    options: gsap.TweenVars = {}
  ) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
      ...options,
    })
  }

  // Optimized scale in animation
  const scaleIn = (element: string | Element | Element[], options: gsap.TweenVars = {}) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(element, {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      ...options,
    })
  }

  // Optimized scroll trigger animation
  const scrollFadeIn = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options,
      },
    })
  }

  // Optimized scroll trigger for staggered elements
  const scrollStagger = (
    container: string | Element,
    children: string,
    options: gsap.TweenVars = {}
  ) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      ...options,
    })
  }

  // Disabled parallax for better performance (optional)
  const parallax = (element: string | Element, speed: number = 0.5) => {
    // Parallax disabled for mobile performance
    if (!isPageInteractive.value || window.innerWidth < 768) return null
    ensurePluginsRegistered()
    return gsap.to(element, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }

  // Optimized text reveal animation
  const textReveal = (element: string | Element, options: gsap.TweenVars = {}) => {
    if (!isPageInteractive.value) return null
    ensurePluginsRegistered()
    return gsap.from(element, {
      y: '50%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      ...options,
    })
  }

  // Cleanup function for scroll triggers
  const cleanup = () => {
    if (import.meta.client) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }

  return {
    gsap,
    ScrollTrigger,
    isPageInteractive,
    fadeInUp,
    fadeIn,
    staggerFadeInUp,
    scaleIn,
    scrollFadeIn,
    scrollStagger,
    parallax,
    textReveal,
    cleanup,
  }
}
