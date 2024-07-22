<template>
  <div class="container">
    <Header></Header>
    <div class="cursor" ref="cursor"></div>
    <RouterView v-slot="{ Component }">
      <Transition name="grow-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Footer></Footer>
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
