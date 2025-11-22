import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Badge } from '~/core/components/ui/badge'

describe('Badge Component', () => {
  it('should render with default props', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Badge Text',
      },
    })
    expect(wrapper.text()).toBe('Badge Text')
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('should apply default variant classes', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Badge',
      },
    })
    expect(wrapper.classes()).toContain('bg-amber-500/20')
    expect(wrapper.classes()).toContain('text-amber-400')
  })

  it('should apply secondary variant classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Secondary',
      },
    })
    expect(wrapper.classes()).toContain('bg-midnight-700')
    expect(wrapper.classes()).toContain('text-foam-300')
  })

  it('should apply destructive variant classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Error',
      },
    })
    expect(wrapper.classes()).toContain('bg-red-500/20')
    expect(wrapper.classes()).toContain('text-red-400')
  })

  it('should apply outline variant classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Outline',
      },
    })
    expect(wrapper.classes()).toContain('border-midnight-600')
    expect(wrapper.classes()).toContain('text-foam-300')
  })

  it('should apply amber variant classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'amber',
      },
      slots: {
        default: 'IPA',
      },
    })
    expect(wrapper.classes()).toContain('bg-amber-500/20')
    expect(wrapper.classes()).toContain('text-amber-400')
  })

  it('should apply purple variant classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'purple',
      },
      slots: {
        default: 'Stout',
      },
    })
    expect(wrapper.classes()).toContain('bg-purple-500/20')
    expect(wrapper.classes()).toContain('text-purple-400')
  })

  it('should apply green variant classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'green',
      },
      slots: {
        default: 'Lager',
      },
    })
    expect(wrapper.classes()).toContain('bg-green-500/20')
    expect(wrapper.classes()).toContain('text-green-400')
  })

  it('should merge custom classes', () => {
    const wrapper = mount(Badge, {
      props: {
        class: 'custom-badge',
      },
      slots: {
        default: 'Custom',
      },
    })
    expect(wrapper.classes()).toContain('custom-badge')
  })

  it('should have base badge classes', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Badge',
      },
    })
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('rounded-full')
  })
})
