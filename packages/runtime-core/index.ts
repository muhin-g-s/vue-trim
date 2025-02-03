export type { RendererOptions } from './renderer';
export { createRenderer } from './renderer';

export type { App, CreateAppFunction } from './apiCreateApp';
export { createAppAPI } from './apiCreateApp';

export { h } from './h';

export {
  registerRuntimeCompiler,
  type InternalRenderFunction,
} from './component'

export { nextTick } from './scheduler'

export { watch, watchEffect } from './apiWatch'

export {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from './apiLifecycle'

export { provide, inject, type InjectionKey } from './apiInject'