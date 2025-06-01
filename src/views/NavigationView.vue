<script>
export default {
  data() {
    return {
      internalLinks: [
        { to: '/about', label: 'About' },
        { to: '/projects', label: 'Projects' },
      ],
      hoveredIndex: null,
      charRotations: {}
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
      return Array.from({ length }, () => Math.floor(Math.random() * 15 - 10))
    },
    generateAllRotations() {
      this.internalLinks.forEach((item, index) => {
        this.charRotations[index] = this.generateRotationArray(item.label.length)
      })
      this.charRotations['github'] = this.generateRotationArray('Github'.length)
    },
    handleMouseEnter(index) {
      this.hoveredIndex = index
    },
    handleMouseLeave() {
      this.hoveredIndex = null
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
          @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave">
          <span v-for="(char, i) in splitChars(text.label)" :key="i" class="char char-wrapper"
            :style="{ transform: `rotate(${getCharRotation(index, i)}deg)` }">
            <span class="outline-layer">{{ char }}</span>
            <span class="anaglyph-layer">{{ char }}</span>
          </span>
        </router-link>
        <a href="mailto:info@xflesx.hu" target="_blank" @mouseenter="handleMouseEnter('Contact')"
          @mouseleave="handleMouseLeave">
          <span v-for="(char, i) in splitChars('Contact')" :key="i" class="char char-wrapper"
            :style="{ transform: `rotate(${getCharRotation('contact', i)}deg)` }">
            <span class="outline-layer">{{ char }}</span>
            <span class="anaglyph-layer">{{ char }}</span>
          </span>
        </a>
        <a href="https://github.com/xflesx69" target="_blank" @mouseenter="handleMouseEnter('github')"
          @mouseleave="handleMouseLeave">
          <span v-for="(char, i) in splitChars('Github')" :key="i" class="char char-wrapper"
            :style="{ transform: `rotate(${getCharRotation('github', i)}deg)` }">
            <span class="outline-layer">{{ char }}</span>
            <span class="anaglyph-layer">{{ char }}</span>
          </span>
        </a>
      </div>
    </div>
  </main>
</template>



<style scoped>
.container {
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

    .char {
      display: inline-block;
      transition: transform 0.3s ease;
      position: relative;
      color: white;
      font-size: 1.3em;
    }
  }
}
</style>