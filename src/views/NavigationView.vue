<script>
export default {
  data() {
    return {
      internalLinks: [
        { to: '/about', label: 'About' },
        { to: '/projects', label: 'Projects' },
      ],
      hoveredIndex: null,
      charRotations: {},
      hoverImageVisible: false,
      hoverImagePosition: { top: 0, left: 0 },
    }
  },
  created() {
    this.generateAllRotations()
  },
  methods: {
    splitChars(str) {
      return str.split('')
    },
    generateRotationArray(length) {
      return Array.from({ length }, () => Math.floor(Math.random() * 15 - 5))
    },
    generateAllRotations() {
      this.internalLinks.forEach((item, index) => {
        this.charRotations[index] = this.generateRotationArray(item.label.length)
      })
      this.charRotations['contact'] = this.generateRotationArray('Contact'.length)
      this.charRotations['github'] = this.generateRotationArray('Github'.length)
    },

    handleMouseEnter(index, event) {
      this.$PlayHoverSound()
      this.hoveredIndex = index
      this.hoverImageVisible = true

      const targetRect = event.target.getBoundingClientRect()

      this.hoverImagePosition = {
        top: targetRect.top - 15,
        left: targetRect.left - 5
      }
    }
    ,
    handleMouseLeave() {
      this.hoveredIndex = null
      this.hoverImageVisible = false
    },
    getCharRotation(index, i) {
      if (this.hoveredIndex === index) return 0
      return this.charRotations[index]?.[i] ?? 0
    }
  }
}
</script>

<template>
  <main>
    <div class="container">
      <img src="/image/logo.png" width="300" />
      <div class="navigation">
        <router-link v-for="(text, index) in internalLinks" :key="index" :to="text.to"
          @mouseenter="e => handleMouseEnter(index, e)" @mouseleave="handleMouseLeave" @click="$PlayClickSound">
          <span v-for="(char, i) in splitChars(text.label)" :key="i" class="char char-wrapper"
            :style="{ transform: `rotate(${getCharRotation(index, i)}deg)` }">
            <span class="outline-layer">{{ char }}</span>
            <span class="anaglyph-layer">{{ char }}</span>
          </span>
        </router-link>

        <a href="mailto:info@xflesx.hu" target="_blank" @mouseenter="e => handleMouseEnter('contact', e)"
          @mouseleave="handleMouseLeave" @click="$PlayClickSound">
          <span v-for="(char, i) in splitChars('Contact')" :key="i" class="char char-wrapper"
            :style="{ transform: `rotate(${getCharRotation('contact', i)}deg)` }">
            <span class="outline-layer">{{ char }}</span>
            <span class="anaglyph-layer">{{ char }}</span>
          </span>
        </a>

        <a href="https://github.com/xflesx69" target="_blank" @mouseenter="e => handleMouseEnter('github', e)"
          @mouseleave="handleMouseLeave" @click="$PlayClickSound">
          <span v-for="(char, i) in splitChars('Github')" :key="i" class="char char-wrapper"
            :style="{ transform: `rotate(${getCharRotation('github', i)}deg)` }">
            <span class="outline-layer">{{ char }}</span>
            <span class="anaglyph-layer">{{ char }}</span>
          </span>
        </a>
      </div>

      <!-- Use teleport to move the hover image outside the clipped container -->
      <teleport to="body">
        <img v-if="hoverImageVisible" src="/image/mickey.png" class="hover-image" :style="{
          top: hoverImagePosition.top + 'px',
          left: hoverImagePosition.left + 'px'
        }" />
      </teleport>
    </div>
  </main>
</template>

<style scoped>
.container {
  position: relative;

  img {
    margin-bottom: 20px;
  }

  .navigation {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 1.2em;
    letter-spacing: 5px;

    a {
      display: inline-block;
      text-decoration: none;
      font-weight: bold;
    }

    a:active {
      transform: scale(0.95);
    }

    .char {
      display: inline-block;
      transition: transform 0.3s ease;
      position: relative;
      color: white;
      font-size: 1.3em;
    }
  }
}

.hover-image {
  position: fixed;
  width: 48px;
  pointer-events: none;
  animation: float 1s ease-in-out infinite;
  transform: rotate(90deg) scaleX(-1);
  z-index: 1000;
}

@keyframes float {

  0%,
  100% {
    transform: translateX(0px) rotate(90deg) scaleX(-1);
  }

  50% {
    transform: translateX(10px) rotate(90deg) scaleX(-1.05);
  }
}
</style>
