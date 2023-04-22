// Options API 两种写法
// export const counterStore = defineStore('counter', {
//   state: () => ({
//     count: 1
//   }),
//   getters: {
//     double() {
//       return this.count * 2
//     }
//   },
//   action: {
//     increment(count) {
//       this.count += count
//     }
//   }
// })

// export const counterStore = defineStore({
//   id: 'counter',
//   state: () => ({
//     count: 1
//   }),
//   getters: {
//     double() {
//       return this.count * 2
//     }
//   },
//   action: {
//     increment(count) {
//       this.count += count
//     }
//   }
// })

// Composition API
// export const counterStore = defineStore('counter', () => {
//   const count = ref(1)
//   const increment = (count) => {
//     count.value += count
//   }
//   const double = computed(() => count.value * 2)
//   return {
//     count,
//     double,
//     increment
//   }
// })
import { getCurrentInstance, inject, toRefs } from 'vue'
import { Pinia, piniaSymbol } from './rootStore'
import { StateTree } from './types'

/**
 * @description: 创建 setupStore
 * @return {*}
 */
function createSetupStore(id: string, setup: any, options: any, pinia: Pinia) {
  console.log(id, setup, options, pinia)
}

/**
 * @description: 创建 optionsStore
 * @return {*}
 */
function createOptionsStore(id: string, options: any, pinia: Pinia) {
  const { state, actions, getters } = options

  const initialState: StateTree | undefined = pinia.state.value[id]
  let store

  function setup() {
    pinia.state.value[id] = state ? state() : {}
    const localState = toRefs(pinia.state.value[id])
    return localState
  }
  console.log(state, actions, getters)
  console.log(setup)
  console.log(initialState)
  return store
}

export function defineStore(idOrOptions: any, setup?: any, setupOptions?: any) {
  let id: string
  let options: any
  // 判断是不是 Composition API setupStore
  // option => {}  Composition => function
  const isSetupStore = typeof setup === 'function'
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }

  function useStore() {
    const currentInstance = getCurrentInstance()
    const pinia = (currentInstance && inject(piniaSymbol)) as Pinia
    // 如果没有 代表第一次初始化
    if (!pinia?._s.has('id')) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia)
      } else {
        createOptionsStore(id, options as any, pinia)
      }
    }
  }

  return useStore
}
