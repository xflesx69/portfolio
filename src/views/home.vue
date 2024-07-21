<template>
    <main>
      <div class="home">
        <h1>
          Hello, my name is <span class="swipename" :key="nameKey">{{ name }}</span>
        </h1>
        <p>
          I'm a {{ age }} years old information technology and telecommunications student. Currently, I'm learning Vue.js and Go. I have a strong interest in web development and backend programming, and I'm passionate about building efficient applications.
        </p>
      </div>
    </main>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  
  export default defineComponent({
    name: 'Home',
    setup() {
      const names = ['Norbert', 'Norbi', 'Nono', 'xflesx'];
      const nameIndex = ref(0);
      const name = ref(names[nameIndex.value]);
      const nameKey = ref(0);
  
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
        birthDate: new Date(2008, 9, 29),
        age: 0,
        calculateAge() {
          const today = new Date();
          let age = today.getFullYear() - this.birthDate.getFullYear();
          const monthDifference = today.getMonth() - this.birthDate.getMonth();
          const dayDifference = today.getDate() - this.birthDate.getDate();
  
          if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
          }
  
          this.age = age;
        }
      };
    },
    created() {
      this.calculateAge();
    }
  });
  </script>
  
  <style lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 15px; 
    width: 800px; 
  }
  
  .swipename {
    display: inline-block;
    width: 170px; 
    animation: swipe 1.8s ease-in-out forwards;
  }
  
  @keyframes swipe {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    30% {
      opacity: 1;
      transform: translateY(0);
    }
    80% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
    }
  }
  </style>
  