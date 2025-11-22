<script setup lang="ts">
import { computed } from 'vue'
import type { FlavorProfile } from '~/core/types/beer'

interface Props {
  flavorProfile: FlavorProfile
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
})

const labels = ['Hoppy', 'Bitter', 'Sweet', 'Sour', 'Malty', 'Fruity']
const dataKeys: (keyof FlavorProfile)[] = ['hoppy', 'bitter', 'sweet', 'sour', 'malty', 'fruity']

const center = computed(() => props.size / 2)
const maxRadius = computed(() => props.size / 2 - 30)

// Calculate points for the polygon
const polygonPoints = computed(() => {
  const points: string[] = []
  const angleStep = (Math.PI * 2) / 6

  dataKeys.forEach((key, index) => {
    const value = props.flavorProfile[key] / 100 // Normalize to 0-1
    const angle = angleStep * index - Math.PI / 2 // Start from top
    const radius = value * maxRadius.value
    const x = center.value + radius * Math.cos(angle)
    const y = center.value + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  })

  return points.join(' ')
})

// Calculate label positions
const labelPositions = computed(() => {
  const angleStep = (Math.PI * 2) / 6
  return labels.map((label, index) => {
    const angle = angleStep * index - Math.PI / 2
    const labelRadius = maxRadius.value + 20
    return {
      label,
      x: center.value + labelRadius * Math.cos(angle),
      y: center.value + labelRadius * Math.sin(angle),
      value: props.flavorProfile[dataKeys[index]],
    }
  })
})

// Generate grid circles
const gridCircles = computed(() => {
  return [0.2, 0.4, 0.6, 0.8, 1].map((ratio) => ({
    radius: maxRadius.value * ratio,
    opacity: ratio * 0.3,
  }))
})

// Generate grid lines
const gridLines = computed(() => {
  const angleStep = (Math.PI * 2) / 6
  return Array.from({ length: 6 }, (_, index) => {
    const angle = angleStep * index - Math.PI / 2
    return {
      x1: center.value,
      y1: center.value,
      x2: center.value + maxRadius.value * Math.cos(angle),
      y2: center.value + maxRadius.value * Math.sin(angle),
    }
  })
})
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :width="size" :height="size" class="overflow-visible">
      <!-- Grid Circles -->
      <circle
        v-for="(circle, index) in gridCircles"
        :key="`circle-${index}`"
        :cx="center"
        :cy="center"
        :r="circle.radius"
        fill="none"
        stroke="currentColor"
        class="text-midnight-700"
        :stroke-opacity="0.5"
        stroke-width="1"
      />

      <!-- Grid Lines -->
      <line
        v-for="(line, index) in gridLines"
        :key="`line-${index}`"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="currentColor"
        class="text-midnight-700"
        stroke-opacity="0.3"
        stroke-width="1"
      />

      <!-- Gradient Definition -->
      <defs>
        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Data Polygon -->
      <polygon
        :points="polygonPoints"
        fill="url(#radarGradient)"
        stroke="#fbbf24"
        stroke-width="2"
        filter="url(#glow)"
        class="transition-all duration-500"
      />

      <!-- Data Points -->
      <circle
        v-for="(pos, index) in labelPositions"
        :key="`point-${index}`"
        :cx="
          center +
          (flavorProfile[dataKeys[index]] / 100) *
            maxRadius *
            Math.cos(((Math.PI * 2) / 6) * index - Math.PI / 2)
        "
        :cy="
          center +
          (flavorProfile[dataKeys[index]] / 100) *
            maxRadius *
            Math.sin(((Math.PI * 2) / 6) * index - Math.PI / 2)
        "
        r="4"
        fill="#fbbf24"
        class="transition-all duration-500"
      />

      <!-- Labels -->
      <text
        v-for="(pos, index) in labelPositions"
        :key="`label-${index}`"
        :x="pos.x"
        :y="pos.y"
        text-anchor="middle"
        dominant-baseline="middle"
        class="text-xs font-medium fill-foam-300"
      >
        {{ pos.label }}
      </text>
    </svg>

    <!-- Value Tooltips (on hover) -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="(pos, index) in labelPositions"
        :key="`tooltip-${index}`"
        class="absolute text-xs font-bold text-amber-400"
        :style="{
          left: `${pos.x}px`,
          top: `${pos.y + 14}px`,
          transform: 'translateX(-50%)',
        }"
      >
        {{ pos.value }}%
      </div>
    </div>
  </div>
</template>
