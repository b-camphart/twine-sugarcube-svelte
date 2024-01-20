/// <reference types="vite/client" />

/**
 * @typedef {SvelteComponentConstructor<any, any>} Passage
 */

import UnknownPassage from "framework/internal/UnknownPassage.svelte";

function createStory() {
	/** @type {Record<string, Passage>} */
	let passages = {};

	return Object.freeze({
		_internal: {
            /**
             * 
             * @param {Record<string, SvelteComponentConstructor<any, any>>} passageComponents
             */
			load(passageComponents) {
                passages = passageComponents
			},
		},
		api: Object.freeze({
			/**
			 *
			 * @param {string} title
			 *
			 * @returns {Passage}
			 */
			get(title) {
				const id = String(title);
				if (passages.hasOwnProperty(id)) {
					return passages[id];
				} else {
					return UnknownPassage;
				}
			},
            /**
             * 
             * @param {string} title 
             * @returns {boolean}
             */
            has(title) {
                return passages.hasOwnProperty(title)
            }
		}),
	});
}

/**
 * @typedef {ReturnType<typeof createStory>} CompleteStoryApi
 */

export default createStory()