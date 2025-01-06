export * from './runtime-core'
export * from './runtime-dom'
export * from './reactivity'

import { compile } from './compiler-dom'
import {
  type InternalRenderFunction,
  registerRuntimeCompiler,
} from './runtime-core'
import * as runtimeDom from './runtime-dom'

function compileToFunction(template: string): InternalRenderFunction {
  const code = compile(template)
  // return new Function('VueTrim', code)({h: runtimeDom.h})
	return new Function('VueTrim', code)(runtimeDom);
}

registerRuntimeCompiler(compileToFunction)