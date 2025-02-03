import { EffectScope, ReactiveEffect } from '../reactivity'
import { AppContext, createAppContext } from './apiCreateApp'
import { emit } from './componentEmits'
import { ComponentOptions } from './componentOptions'
import { initProps, Props } from './componentProps'
import { LifecycleHooks } from './enums'
import { VNode, VNodeChild } from './vnode'

export type Component = ComponentOptions

export type Data = Record<string, unknown>

type LifecycleHook<TFn = Function> = TFn[] | null

export interface ComponentInternalInstance {
	uid: number
  type: Component
	parent: ComponentInternalInstance | null
	appContext: AppContext
  vnode: VNode
  subTree: VNode
  next: VNode | null
  effect: ReactiveEffect
  render: InternalRenderFunction
  update: () => void
  isMounted: boolean
	propsOptions: Props
  props: Data
	emit: (event: string, ...args: any[]) => void
	setupState: Data
	provides: Data
	scope: EffectScope
  [LifecycleHooks.BEFORE_MOUNT]: LifecycleHook
  [LifecycleHooks.MOUNTED]: LifecycleHook
  [LifecycleHooks.BEFORE_UPDATE]: LifecycleHook
  [LifecycleHooks.UPDATED]: LifecycleHook
  [LifecycleHooks.BEFORE_UNMOUNT]: LifecycleHook
  [LifecycleHooks.UNMOUNTED]: LifecycleHook
}

export type InternalRenderFunction = {
  (ctx: Data): VNodeChild
}

let uid = 0

const emptyAppContext = createAppContext()

export function createComponentInstance(
  vnode: VNode,
	parent: ComponentInternalInstance | null,
): ComponentInternalInstance {
  const type = vnode.type as Component

	const appContext =
    (parent ? parent.appContext : vnode.appContext) || emptyAppContext

  const instance: ComponentInternalInstance = {
		uid: uid++,
    type,
		parent,
    appContext,
    vnode,
    next: null,
    effect: null!,
    subTree: null!,
    update: null!,
    render: null!,
    isMounted: false,
		propsOptions: type.props || {},
    props: {},
		emit: null!,
		setupState: {},
		provides: parent ? parent.provides : Object.create(appContext.provides),
		scope: new EffectScope(),
		[LifecycleHooks.BEFORE_MOUNT]: null,
    [LifecycleHooks.MOUNTED]: null,
    [LifecycleHooks.BEFORE_UPDATE]: null,
    [LifecycleHooks.UPDATED]: null,
    [LifecycleHooks.BEFORE_UNMOUNT]: null,
    [LifecycleHooks.UNMOUNTED]: null,
  }

	instance.emit = emit.bind(null, instance)

  return instance
}

type CompileFunction = (template: string) => InternalRenderFunction
let compile: CompileFunction | undefined

export function registerRuntimeCompiler(_compile: any) {
  compile = _compile
}

export let currentInstance: ComponentInternalInstance | null = null
export const setCurrentInstance = (instance: ComponentInternalInstance) => {
  currentInstance = instance
  instance.scope.on()
}

export const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off()
  currentInstance = null
}

export const setupComponent = (instance: ComponentInternalInstance) => {
  const { props } = instance.vnode
  initProps(instance, props)

  const component = instance.type as Component
	if (component.setup) {
		setCurrentInstance(instance)
    const setupResult = component.setup(instance.props, {
      emit: instance.emit,
    }) as InternalRenderFunction
		unsetCurrentInstance()

    // Branch based on the type of setupResult
    if (typeof setupResult === 'function') {
      instance.render = setupResult
    } else if (typeof setupResult === 'object' && setupResult !== null) {
      instance.setupState = setupResult
    } else {
      // do nothing
    }
  }

  if (compile && !component.render) {
    const template = component.template ?? ''
    if (template) {
      instance.render = compile(template)
    }
  }

	const { render } = component
  if (render) {
    instance.render = render as InternalRenderFunction
  }
}