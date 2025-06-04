import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const clickSound = ref<HTMLAudioElement | null>(null)
const hoverSound = ref<HTMLAudioElement | null>(null)

app.config.globalProperties.$_clickSoundRef = clickSound
app.config.globalProperties.$_hoverSoundRef = hoverSound

app.config.globalProperties.$PlayClickSound = () => {
  const sound = clickSound.value
  if (sound) {
    sound.volume = 1
    sound.currentTime = 0
    sound.play().catch((e) => console.warn('Click play error:', e))
  }
}

app.config.globalProperties.$PlayHoverSound = () => {
  const sound = hoverSound.value
  if (sound) {
    sound.volume = 0.2
    sound.currentTime = 0
    sound.play().catch((e) => console.warn('Hover play error:', e))
  }
}

app.use(router)
app.mount('#app')
