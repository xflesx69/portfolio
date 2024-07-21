<template>
    <main>
      <div class="home">
        <h1>
          Hello, my name is 
          <span class="name-wrapper">
            <span class="swipename" :key="nameKey">{{ name }}</span>
          </span>
        </h1>
        <p>
          I'm a {{ age }} years old information technology and telecommunications student. <br>Currently, I'm learning Vue.js and Go. I have a strong interest in web development and backend programming, and I'm passionate about building efficient applications.
        </p>
      </div>
    </main>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'Home',
    setup() {
      const names = ['Norbert', 'Norbi', 'Nono', 'xflesx'];
      const nameIndex = ref(0);
      const name = ref(names[nameIndex.value]);
      const nameKey = ref(0);
      
      const birthDate = new Date(2008, 9, 29);
      const age = computed(() => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();
  
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
          age--;
        }
  
        return age;
      });
  
      const changeName = () => {
        nameIndex.value = (nameIndex.value + 1) % names.length;
        name.value = names[nameIndex.value];
        nameKey.value += 1;
      };
  
      onMounted(() => {
        setInterval(changeName, 2000);
      });
  
      return {
        name,
        nameKey,
        age
      };
    }
  });
  </script>
