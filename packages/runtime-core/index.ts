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