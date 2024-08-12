<template>
  <div class="container">
    <Header></Header>
    <div class="content">
      <RouterView v-slot="{ Component }">
        <Transition name="grow-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    <Footer></Footer>
    <div class="cursor" ref="cursor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const cursor = ref<HTMLElement | null>(null);
    let mouseX = 0;
    let mouseY = 0;
    let hideTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.pageX;
      mouseY = e.pageY;

      if (cursor.value) {
        cursor.value.style.left = `${mouseX}px`;
        cursor.value.style.top = `${mouseY}px`;
        cursor.value.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s, border-width 0.3s';
      }

      const target = e.target as HTMLElement;
      if (target) {
        if (['A', 'SPAN', 'P', 'H1'].includes(target.tagName) || target.id === 'button') {
          if (cursor.value) {
            if (target.id === 'button' || ['G'].includes(target.tagName)) {
              cursor.value.style.width = '35px';
              cursor.value.style.height = '35px';
              cursor.value.style.borderRadius = '50%';
              cursor.value.style.borderWidth = '1.9px';
              cursor.value.style.backgroundColor = '';
            } else {
              cursor.value.style.width = '.2px';
              cursor.value.style.height = '15px';
              cursor.value.style.borderRadius = '10%';
              cursor.value.style.borderWidth = '.1px';
              cursor.value.style.backgroundColor = 'black';
            }
          }
        } else {
          if (cursor.value) {
            cursor.value.style.width = '15px';
            cursor.value.style.height = '15px';
            cursor.value.style.borderRadius = '50%';
            cursor.value.style.borderWidth = '1.9px';
            cursor.value.style.backgroundColor = '';
          }
        }
      }

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      hideTimeout = setTimeout(() => {
        if (cursor.value) {
          cursor.value.style.width = '0px';
          cursor.value.style.height = '0px';
        }
      }, 800);
    };

    onMounted(() => {
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
      };
    });
    return {
      cursor,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to top left, #e7e7e7 0%, #f5f5f5 100%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 25px;
  border-radius: 15px;
  min-height: calc(100vh - 50px);
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.cursor {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.9px solid black;
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 10000;
  transition: width 0.1s ease-out, height 0.1s ease-out, border-radius 0.1s ease-out;
}

.language-button rect {
  transition: transform 0.3s ease, fill 0.3s ease;
}

.language-button rect:hover {
  transform: scale(1.1);
  fill: lightblue;
}
@media (max-width: 555px) {
  .container {
    min-height: calc(90vh - 50px);
  }
}
</style>
