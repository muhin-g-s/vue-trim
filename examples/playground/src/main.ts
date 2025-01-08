import { createApp, h, ref } from 'vue-trim'

const app = createApp({
  setup() {
    const count = ref(0)

		const setCount = () => {
			count.value+=1;
			count.value+=1;
		}

    return () =>
     {
			console.log('render')
			 return h('div', {}, [
        h('p', {}, [`count: ${count.value}`]),
        h('button', { onClick: setCount }, ['Increment']),
      ])
		}
  },
})

app.mount('#app')