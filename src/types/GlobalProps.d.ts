import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $PlayHoverSound: () => void
    $PlayClickSound: () => void
  }
}

export {}
