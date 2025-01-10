import {
  createApp,
  h,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
} from 'vue-trim'

const Child = {
  setup() {
    const count = reactive({value:0})
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })

    onUnmounted(() => {
      console.log('onUnmounted')
    })

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('onUpdated')
    })

    onMounted(() => {
      console.log('onMounted')
    })

    return () =>
      h('div', {}, [
        h('p', {}, [`${count.value}`]),
        h('button', { onClick: () => count.value+=1 }, ['increment']),
      ])
  },
}

const app = createApp({
  setup() {
    const mountFlag = ref(true)

    return () =>
      h('div', {}, [
        h('button', { onClick: () => (mountFlag.value = !mountFlag.value) }, [
          'toggle',
        ]),
        mountFlag.value ? h(Child, {}, []) : h('p', {}, ['unmounted']),
      ])
  },
})

app.mount('#app')