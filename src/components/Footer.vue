<template>
    <div class="footer">
      <div class="left">
        <div class="icons">
          <a target="_blank" href="https://github.com/xflesx69"><i id="button" class="fa-brands fa-github"></i></a>
          <a target="_blank" href="https://discord.com/users/257252777930129408"><i id="button" class="fa-brands fa-discord"></i></a>
        </div>
      </div>
      <div class="right">
        <svg width="220" height="100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20 Q0 0 20 0 H360 Q380 0 380 20 V60 Q380 80 360 80 H20 Q0 80 0 60 Z" style="fill:#fff" />
          <g class="language-button" @click="changeLanguage('en')">
            <rect x="8" y="04" width="80" height="30" rx="13" ry="13" style="fill:lightgray;" />
            <text id="button" x="24" y="24" font-size="14" fill="black">{{ t('footer.english') }}</text>
          </g>
          <g class="language-button" @click="changeLanguage('hu')">
            <rect x="92" y="05" width="80" height="30" rx="13" ry="13" style="fill:lightgray;" />
            <text id="button" x="106" y="25" font-size="14" fill="black">{{ t('footer.hungarian') }}</text>
          </g>
        </svg>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { changeLanguage, t } from '@/languages/i18n';
   
  export default defineComponent({
    name: 'Footer',
    setup() {
      return {
        t,
        changeLanguage
      };
    }
  });
  </script>