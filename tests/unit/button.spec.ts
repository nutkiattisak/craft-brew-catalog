import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '~/core/components/ui/button'

describe('Button Component', () => {
  it('should render with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
  })

  it('should apply default variant classes', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
      },
    })
    expect(wrapper.classes()).toContain('bg-amber-500')
  })

  it('should apply destructive variant classes', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Delete',
      },
    })
    expect(wrapper.classes()).toContain('bg-red-500')
  })

  it('should apply outline variant classes', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Outline',
      },
    })
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('bg-midnight-800')
  })

  it('should apply ghost variant classes', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'ghost',
      },
      slots: {
        default: 'Ghost',
      },
    })
    expect(wrapper.classes()).toContain('text-foam-300')
  })

  it('should apply small size classes', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'sm',
      },
      slots: {
        default: 'Small',
      },
    })
    expect(wrapper.classes()).toContain('h-9')
  })

  it('should apply large size classes', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'lg',
      },
      slots: {
        default: 'Large',
      },
    })
    expect(wrapper.classes()).toContain('h-11')
  })

  it('should merge custom classes', () => {
    const wrapper = mount(Button, {
      props: {
        class: 'custom-class',
      },
      slots: {
        default: 'Button',
      },
    })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('should emit click event', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should render as different element when "as" prop is provided', () => {
    const wrapper = mount(Button, {
      props: {
        as: 'a',
      },
      slots: {
        default: 'Link',
      },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })
})
