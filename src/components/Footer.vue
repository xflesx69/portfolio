<template>
    <div class="footer">
      <div class="left">
        <div class="icons">
          <a target="_blank" href="https://github.com/xflesx69"><img id="button" src="/img/github.svg"></a>
          <a target="_blank" href="discord://-/users/257252777930129408"><img height="20.64" id="button" src="/img/discord.svg"></a>
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
  import { changeLanguage, t } from '@/languages/i18n';
   
  export default {
    name: 'Footer',
    setup() {
      return {
        t,
        changeLanguage
      };
    }
  };
  </script>


<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;    
  align-items: flex-end;
  padding: 1.3rem;
  box-sizing: border-box;
  color: white;
  margin-top: auto;

/*   @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding-top: 2rem;
  } */

  .left, .right {
    display: flex;
    align-items: flex-end;
  }

  .icons {
    display: flex;
    align-items: center;

    a {
      color: white;
      margin: 0 0.5rem;
      display: inline-flex;
    }

    img {
      width: 24px;
      height: 24px;
      transition: transform 0.3s;
    }

    img:hover {
      transform: scale(1.1);
    }
  }

  .right {
    margin-bottom: -1.3rem;
    margin-right: -3rem;
    svg {
      margin-bottom: -3.3rem;
      width: 100%;
      max-width: 220px;
      height: auto;
    }

    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  }

  .language-selector {
    width: 220px;
    height: 100px;
    display: block;
    margin: 0 auto;

    @media (max-width: 480px) {
      width: 180px;
      height: 80px;
    }
  }
}
</style>