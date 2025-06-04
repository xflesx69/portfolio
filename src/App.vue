<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { RouterView },

  data() {
    return {
      animationId: 0 as number,
      frame: 0 as number,
      patternSize: 256,
      patternScaleX: 3,
      patternScaleY: 3,
      patternRefreshInterval: 2,
      patternAlpha: 30,
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      patternCanvas: null as HTMLCanvasElement | null,
      patternCtx: null as CanvasRenderingContext2D | null,
      patternData: null as ImageData | null,
      isMusicPlaying: false as boolean,
    }
  },

  setup() {
    const route = useRoute();
    return { route };
  },

  methods: {
    initCanvas() {
      this.canvas = document.getElementById('noise-canvas') as HTMLCanvasElement
      this.ctx = this.canvas.getContext('2d')!
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.ctx.scale(this.patternScaleX, this.patternScaleY)
    },

    initPattern() {
      this.patternCanvas = document.createElement('canvas')
      this.patternCanvas.width = this.patternSize
      this.patternCanvas.height = this.patternSize
      this.patternCtx = this.patternCanvas.getContext('2d')!
      this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize)
    },

    updatePattern() {
      if (!this.patternData) return
      const data = this.patternData.data
      for (let i = 0; i < data.length; i += 4) {
        const gray = 30 + Math.floor(Math.random() * 90)
        data[i] = gray
        data[i + 1] = gray
        data[i + 2] = gray
        data[i + 3] = this.patternAlpha
      }
      this.patternCtx!.putImageData(this.patternData, 0, 0)
    },

    draw() {
      if (!this.ctx || !this.canvas || !this.patternCanvas) return
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      const pattern = this.ctx.createPattern(this.patternCanvas, 'repeat')
      if (pattern) {
        this.ctx.fillStyle = pattern
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      }
    },

    loop() {
      this.frame++
      if (this.frame % this.patternRefreshInterval === 0) {
        this.updatePattern()
        this.draw()
      }
      this.animationId = requestAnimationFrame(this.loop.bind(this))
    },

    disableContextMenu(e: MouseEvent) {
      e.preventDefault()
    },

    onResize() {
      if (!this.canvas || !this.ctx) return
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.scale(this.patternScaleX, this.patternScaleY)
    },

    toggleMusic() {
      const audio = this.$refs.backgroundMusic as HTMLAudioElement
      if (!audio) return

      audio.volume = 0.3

      if (this.isMusicPlaying) {
      audio.pause()
      } else {
      audio.play().catch(e => console.warn("Autoplay block or error:", e))
      }

      this.isMusicPlaying = !this.isMusicPlaying
    }

  },

  mounted() {
    this.initCanvas()
    this.initPattern()
    this.updatePattern()
    this.draw()
    this.loop()

    window.addEventListener('contextmenu', this.disableContextMenu)
    window.addEventListener('resize', this.onResize)

    const global = this.$.appContext.config.globalProperties
    if (global?.$_clickSoundRef && global?.$_hoverSoundRef) {
      global.$_clickSoundRef.value = this.$refs.clickSound as HTMLAudioElement
      global.$_hoverSoundRef.value = this.$refs.hoverSound as HTMLAudioElement
    } else {
      console.warn('Globális ref nem található – lehet, hogy a main.ts-ben hiányzik.')
    }
  },

  beforeUnmount() {
    cancelAnimationFrame(this.animationId)
    window.removeEventListener('contextmenu', this.disableContextMenu)
    window.removeEventListener('resize', this.onResize)
  }
})
</script>

<template>
  <audio ref="clickSound" src="/sounds/click.mp3" preload="auto"></audio>
  <audio ref="hoverSound" src="/sounds/button-click-hover.mp3" preload="auto"></audio>
  <audio ref="backgroundMusic" src="/music/LeafRag.mp3" preload="auto" loop></audio>
  <canvas id="noise-canvas" class="noise-bg"></canvas>
  <div class="container">
    <Transition name="rotate">
      <div class="border" :key="route.fullPath">
        <RouterView class="view" />
      </div>
    </Transition>
  </div>

  <button class="music-toggle" @click="toggleMusic">
    <svg v-if="isMusicPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  </button>
</template>

<style scoped>
.noise-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: transparent;
  user-select: none;
}

.container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  perspective: 1200px;

  .border {
    border: 48px solid #eee;
    border-image: url(/image/title-card.svg) 44 stretch;
    box-shadow: 0 6rem 3rem -4rem black;
    text-align: center;
    max-width: 26rem;
    width: 100%;
    overflow: hidden;
    transform-style: preserve-3d;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;

    .view {
      background-color: #333;
      padding: 0rem;
    }
  }
}

.music-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  z-index: 1001;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.music-toggle:hover {
  background-color: #444;
}

.music-toggle:active {
  transform: scale(0.95);
}

@media (max-width: 600px) {
  .music-toggle {
    bottom: 15px;
    right: 15px;
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;

    .border {
      border-width: 32px;
      max-width: 90%;
      margin: auto;
    }
  }
}

@media (max-width: 480px) {
  .container {
    .border {
      border-width: 24px;
      max-width: 95%;
    }
  }
}

@media (hover: none) {
  .container {
    perspective: 800px;
  }
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 1s cubic-bezier(.55, 0, .1, 1);
  will-change: transform;
}

.rotate-enter-from {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

.rotate-enter-to {
  transform: rotateY(0deg);
  backface-visibility: hidden;
}

.rotate-leave-from {
  transform: rotateY(0deg);
  backface-visibility: hidden;
}

.rotate-leave-to {
  transform: rotateY(-180deg);
  backface-visibility: hidden;
}
</style>