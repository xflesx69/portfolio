<template>
  <div class="container">
    <Header></Header>
    <div class="cursor" ref="cursor"></div>
    <RouterView v-slot="{ Component }">
      <Transition name="grow-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const cursor = ref<HTMLElement | null>(null);
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.pageX;
      mouseY = e.pageY;

      const target = e.target as HTMLElement;
      if (target && target.tagName === 'TEXT' || target.tagName === 'A' || target.tagName === 'SPAN' || target.tagName === 'P') {
        if (cursor.value) {
          cursor.value.style.width = '5px';
          cursor.value.style.height = '16px';
          cursor.value.style.borderRadius = '0';
        }
      } else {
        if (cursor.value) {
          cursor.value.style.width = '10px';
          cursor.value.style.height = '10px';
          cursor.value.style.borderRadius = '50%';
        }
      }
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      if (cursor.value) {
        cursor.value.style.left = `${cursorX}px`;
        cursor.value.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(animateCursor);
    };

    onMounted(() => {
      document.addEventListener('mousemove', handleMouseMove);
      animateCursor();

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return {
      cursor,
    };
  },
});
</script>