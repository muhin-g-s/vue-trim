import { VNode } from './vnode'

export interface RendererOptions<HostNode = RendererNode, HostElement = RendererElement> {
  createElement(type: string): HostNode

  createText(text: string): HostNode

  setElementText(node: HostNode, text: string): void

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void

	patchProp(el: HostElement, key: string, value: any): void;
}

export interface RendererNode {
  [key: string]: any
}

export interface RendererElement extends RendererNode {}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement,
) => void

export function createRenderer(options: RendererOptions) {
	const {
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options;

  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === 'string') return hostCreateText(vnode)
    const el = hostCreateElement(vnode.type)

    for (const child of vnode.children) {
      const childEl = renderVNode(child)
      hostInsert(childEl, el)
    }

		Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el, key, value);
    });

    return el
  }

  const render: RootRenderFunction = (vnode, container) => {
		while (container.firstChild) container.removeChild(container.firstChild)
    const el = renderVNode(vnode)
    hostInsert(el, container)
  }

  return { render }
}