import { App, effectScope, Ref, ref } from 'vue'
import { Pinia } from './rootStore'
import { piniaSymbol } from './rootStore'
import { StateTree, StoreGeneric } from './types'

export function createPinia() {
  //  作用域effect
  const scope = effectScope(true)
  //
  const state = scope.run<Ref<Record<string, StateTree>>>(() =>
    ref<Record<string, StateTree>>({})
  )!
  const pinia: Pinia = {
    install(app: App) {
      pinia._a = app
      app.provide(piniaSymbol, pinia)
      app.config.globalProperties.$pinia = pinia
    },
    // vue
    _a: null,
    // effectScope
    _e: scope,
    _s: new Map<string, StoreGeneric>(),
    state
  }
  return pinia
}
