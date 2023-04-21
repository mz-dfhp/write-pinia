import { App } from 'vue'

export function createPinia() {
  const pinia = {
    install(app: App) {
      console.log(app)
    }
  }
  return pinia
}
