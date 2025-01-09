import { createApp, h, reactive, watch } from 'vue-trim'

const app = createApp({
  setup() {
    const state = reactive({ count: 0 })
    watch(
      () => state.count,
      () => alert(`state.count was changed! ${state.count}`),
    )

    return () =>
      h('div', {}, [
        h('p', {}, [`count: ${state.count}`]),
        h('button', { onClick: () => state.count++ }, ['update state']),
      ])
  },
})

app.mount('#app')