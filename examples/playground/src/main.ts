import { createApp, h, reactive } from 'vue-trim'

const app = createApp({
  setup() {
		const first = ['a', 'b', 'c', 'd'];
		const second = ['e', 'f', 'g'];

		let isLeft = true;

    const state = reactive({ list: first })

    const updateList = () => {
			if (isLeft) {
				state.list = second
			} else {
				state.list = first
			}

			isLeft = !isLeft
    }

    return () =>
      h('div', { id: 'app' }, [
        h(
          'ul',
          {},
          state.list.map(item => h('li', {}, [item])),
        ),
        h('button', { onClick: updateList }, ['update']),
      ])
  },
})

app.mount('#app')