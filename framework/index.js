import _engine from "framework/internal/_engine";
import _story from "framework/internal/_story";

export function init() {
	const passageModules = import.meta.glob("src/passages/**/*.svelte", {
		eager: true,
		import: "default",
	});
	/** @type {{ [name: string]: SvelteComponentConstructor<any, any> }} */
	const passageComponents = {};
	const entries = Object.entries(passageModules);
	for (let i = 0; i < entries.length; i++) {
		let [key, value] = entries[i];
		key = key.slice(14, -7);
		passageComponents[key] =
			/** @type {SvelteComponentConstructor<any, any>} */ (value);
	}

	// load screen
	_story._internal.load(passageComponents);
	_engine.__internal.init();
	// getStory()._internal.init()
	_engine.__internal.start();
}
