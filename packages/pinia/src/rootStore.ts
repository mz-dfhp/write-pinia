import { InjectionKey, App, Ref, EffectScope } from 'vue'
import { StateTree, StoreGeneric } from './types'

export const piniaSymbol = Symbol('pinia') as InjectionKey<Pinia>

export interface Pinia {
  install: (app: App) => void
  state: Ref<Record<string, StateTree>>
  _a: App | null
  _e: EffectScope
  _s: Map<string, StoreGeneric>
}
