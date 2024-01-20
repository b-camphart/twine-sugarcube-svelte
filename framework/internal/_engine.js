import Config from "framework/Config";
import StoryInit from "src/special/StoryInit.svelte";
import Render from "framework/internal/Render.svelte";
import UnknownPassage from "framework/internal/UnknownPassage.svelte";
import _state from "framework/internal/_state";
import _story from "framework/internal/_story";

function createEngine(
	/** @type {import("framework/internal/_state").CompleteStateApi} */
	State,
	/** @type {import("framework/internal/_story").CompleteStoryApi} */
	Story,
) {
	/** @type {'idle' | 'playing' | 'rendering'} */
	let engineState = "idle";

	/** @type {Render | undefined} */
	let rendered;

	/**
	 *
	 * @param {string} title
	 * @param {boolean} [noHistory]
	 * @returns
	 */
	function play(title, noHistory) {
		engineState = "playing";

		const Passage = Story.api.get(title);

		// passage init

		if (!noHistory) {
            State._internal.create(title)
		}

		// passage ready

		engineState = "rendering";

		// passage start

		rendered?.$set({
			title,
			passage: Passage
		})

		// passage end

		engineState = "idle";
	}

	function show() {
		return play(State.api.passage, true)
	}

	/**
	 *
	 * @param {number} offset
	 *
	 * @returns {boolean}
	 */
	function go(offset) {
		return false;
	}

	/**
	 * @returns {boolean}
	 */
	function backward() {
		// todo
		return false;
	}

	/**
	 * @returns {boolean}
	 */
	function forward() {
		// todo
		return false;
	}

    return Object.freeze({
		__internal: {
            init: () => {
                rendered = new Render({
                    target: document.body,
                    props: {
                        title: "unknown",
                        passage: UnknownPassage
                    }
                })
            },
            start: () => {
				rendered?.$set({
					title: "StoryInit",
					passage: StoryInit
				})

				if (Config.passages.start == null) {
					throw new Error("starting passage not selected")
				}
				if (!Story.api.has(Config.passages.start)) {
					throw new Error(`starting passage (${Config.passages.start}) not found`)
				}

				if (State._internal.restore()) {
					show()
				} else {
					play(Config.passages.start)
				}

            }
        },
		api: Object.freeze({
			get state() {
				return engineState;
			},
			play,
			backward,
			forward,
			go,
            // goTo,
            // isIdle,
            // isPlaying,
            // isRendering,
            // restart,
            // show,
		}),
	});
}

/**
 * @typedef {ReturnType<typeof createEngine>} CompleteEngineApi
 */

export default createEngine(
	_state,
	_story,
)