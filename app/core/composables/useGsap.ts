import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsap() {
  // Fade in from bottom animation
  const fadeInUp = (element: string | Element | Element[], options: gsap.TweenVars = {}) => {
    return gsap.from(element, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      ...options,
    })
  }

  // Fade in animation
  const fadeIn = (element: string | Element | Element[], options: gsap.TweenVars = {}) => {
    return gsap.from(element, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      ...options,
    })
  }

  // Stagger animation for multiple elements
  const staggerFadeInUp = (
    elements: string | Element | Element[],
    options: gsap.TweenVars = {}
  ) => {
    return gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      ...options,
    })
  }

  // Scale in animation
  const scaleIn = (element: string | Element | Element[], options: gsap.TweenVars = {}) => {
    return gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      ...options,
    })
  }

  // Scroll trigger animation
  const scrollFadeIn = (element: string | Element, options: ScrollTrigger.Vars = {}) => {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    })
  }

  // Scroll trigger for staggered elements
  const scrollStagger = (
    container: string | Element,
    children: string,
    options: gsap.TweenVars = {}
  ) => {
    return gsap.from(children, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    })
  }

  // Parallax effect
  const parallax = (element: string | Element, speed: number = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // Text reveal animation
  const textReveal = (element: string | Element, options: gsap.TweenVars = {}) => {
    return gsap.from(element, {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      ...options,
    })
  }

  // Cleanup function for scroll triggers
  const cleanup = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }

  return {
    gsap,
    ScrollTrigger,
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
