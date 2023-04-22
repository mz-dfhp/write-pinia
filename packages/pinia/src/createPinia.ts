import { App, effectScope, Ref, ref } from 'vue'
import { Pinia } from './rootStore'
import { piniaSymbol } from './rootStore'
import { StateTree, StoreGeneric } from './types'

export function createPinia() {
  // 作用域 effect 独立的
  // 之后调用 scope.stop() 停止响应
  // 对比 effect const runner  = effect(()=>{}) runner.effect.stop()
  // 不需要一个个去停止
  const scope = effectScope(true)
  // 存储每个store 状态
  const state = scope.run<Ref<Record<string, StateTree>>>(() =>
    ref<Record<string, StateTree>>({})
  )!
  const pinia: Pinia = {
    install(app: App) {
      pinia._a = app
      // 所有组件都可以 inject(注入)拿到
      app.provide(piniaSymbol, pinia)
      // getCurrentInstance().proxy.$pinia 拿到当前
      app.config.globalProperties.$pinia = pinia
    },
    // vue
    _a: null,
    // 停止所有状态
    _e: scope,
    // Map存放所有的store
    _s: new Map<string, StoreGeneric>(),
    // 存储所有状态
    state
  }
  return pinia
}
