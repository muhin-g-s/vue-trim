import { ComponentInternalInstance } from './component';

export const Text = Symbol();

export type VNodeTypes = string | typeof Text | object

export interface VNode<HostNode = any> {
  type: VNodeTypes;
  props: VNodeProps | null;
  children: VNodeNormalizedChildren;
	el: HostNode | undefined;
	component: ComponentInternalInstance | null;
	key: string | number | symbol | null;
}

export interface VNodeProps {
  [key: string]: any;
}

export type VNodeNormalizedChildren = string | VNodeArrayChildren;
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;

export type VNodeChild = VNodeChildAtom | VNodeArrayChildren;
type VNodeChildAtom = VNode | string;


export function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null,
  children: VNodeNormalizedChildren,
): VNode {
	const vnode: VNode = {
    type,
    props,
    children: children,
    el: undefined,
    key: props?.key ?? null,
    component: null,
  }
  return vnode
}

export function normalizeVNode(child: VNodeChild): VNode {
  if (typeof child === "object") {
    return { ...child } as VNode;
  } else {
    return createVNode(Text, null, String(child));
  }
}

export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  return n1.type === n2.type && n1.key === n2.key
}