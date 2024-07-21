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
import { defineComponent, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const cursor = ref<HTMLElement | null>(null);

    onMounted(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (cursor.value) {
          cursor.value.style.left = `${e.pageX}px`;
          cursor.value.style.top = `${e.pageY}px`;
        }
      };

      document.addEventListener('mousemove', handleMouseMove);

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

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.15s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: scale(8px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: scale(8px);
}

.grow-in-enter-from,
.grow-in-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.grow-in-enter-active,
.grow-in-leave-active {
  transition: 0.3s ease-out;
}
</style>
