export type Options = {
	render: () => string;
};

export type App = {
	mount: (selector: string) => void;
}

export const createApp = (options: Options): App => {
	return {
		mount: selector => {
			const element = document.querySelector(selector);
			if (element) {
				element.innerHTML = options.render();
			}
		},
	};
};