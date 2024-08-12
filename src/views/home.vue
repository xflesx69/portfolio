<template>
  <main>
    <div class="home">
      <h1>
        {{ t("home.myname") }}
        <span class="name-wrapper">
          <span class="swipename" :key="nameKey">{{ name }}</span>
        </span>
      </h1>
      <p>
        {{ t("home.ima") }} {{ age }} {{ t("home.desc") }} <br />
        {{ t("home.desc2") }}
      </p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { t } from "@/languages/i18n";

export default defineComponent({
  name: "Home",
  setup() {
    const names = ["Norbert", "Norbi", "Nono", "xflesx"];
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
      age,
      t,
    };
  },
});
</script>

<style lang="scss">
.home {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  h1 {
    font-size: 1.875rem;
    font-family: Akira;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 0.938rem;
    width: 50rem;
    .swipename {
      display: inline-block;
      width: 14.375rem;
      animation: swipe 1.8s ease-in-out forwards;
    }
  }
  span {
    font-family: Akira;
  }
  p {
    font-size: 0.938rem;
    letter-spacing: -0.019rem;
  }
  @keyframes swipe {
    0% {
      opacity: 0;
      transform: translateY(1.25rem);
    }
    30% {
      opacity: 1;
      transform: translateY(0.25rem);
    }
    80% {
      opacity: 1;
      transform: translateY(0.25rem);
    }
    100% {
      opacity: 0;
    }
  }
}

/* Media */
@media (max-width: 1000px) {
  .home {
    h1 {
      font-size: 1.5rem;
      width: 40rem;
    }
  }
}
@media (max-width: 650px) {
  .home {
    h1 {
      width: 30rem;        
      display: block;
      .swipename {
        display: block;
        width: 100%;
        margin-bottom: 2rem;
      }
    }
  }
}

@media (max-width: 555px) {
  .home {
    h1 {
      width: 20rem;
    }
  }
}
</style>
