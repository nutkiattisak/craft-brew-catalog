import { describe, it, expect } from 'vitest'
import { cn } from '~/core/lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('should filter out falsy values', () => {
    const result = cn('base-class', false, null, undefined, 'valid-class')
    expect(result).toBe('base-class valid-class')
  })

  it('should handle Tailwind merge conflicts', () => {
    const result = cn('px-4', 'px-6')
    expect(result).toBe('px-6')
  })

  it('should handle object syntax', () => {
    const result = cn({
      'text-red-500': true,
      'bg-blue-500': false,
    })
    expect(result).toBe('text-red-500')
  })

  it('should handle array syntax', () => {
    const result = cn(['class-a', 'class-b'])
    expect(result).toBe('class-a class-b')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle complex Tailwind class merging', () => {
    const result = cn('rounded-lg border border-midnight-700', 'rounded-xl border-amber-500')
    // tailwind-merge keeps border utility and resolves conflicts
    expect(result).toContain('rounded-xl')
    expect(result).toContain('border-amber-500')
    expect(result).not.toContain('rounded-lg')
    expect(result).not.toContain('border-midnight-700')
  })
})
