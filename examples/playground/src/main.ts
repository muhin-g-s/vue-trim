import { createApp, h } from 'vue-trim'

const app = createApp({
  setup() {
    // Define state here in the future
    // const state = reactive({ count: 0 })

    return function render() {
      return h('div', { id: 'my-app' }, [
        h('p', { style: 'color: red; font-weight: bold;' }, ['Hello world.']),
        h(
          'button',
          {
            onClick() {
              alert('Hello world!')
            },
          },
          ['click me!'],
        ),
      ])
    }
  },
})

app.mount('#app')