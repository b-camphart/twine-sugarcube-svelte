function createState() {
	/**
	 * @typedef {{ title: string, variables: Partial<import("framework/Config").State>}} Moment
	 */

	/** @type {Moment[]} */
	let history = [];
	let activeIndex = -1;
	let active = createMoment();

	/**
	 *
	 * @param {string} [title]
	 * @param {Partial<import("framework/Config").State>} [variables]
	 * @returns {Moment}
	 */
	function createMoment(title, variables) {
		return {
			title: title ? String(title) : "",
			variables: variables ? JSON.parse(JSON.stringify(variables)) : {},
		};
	}

	/** @param {number} moment  */
	function activateMoment(moment) {
		active = JSON.parse(JSON.stringify(history[moment]));
        return active
	}

	/** @param {number} offset */
	function go(offset) {
		if (0 < offset && offset < historySize() && offset !== activeIndex) {
			activeIndex = offset;
			activateMoment(activeIndex);
		}
	}
	function historyLength() {
		return activeIndex + 1;
	}
	function historySize() {
		return history.length;
	}

	return Object.freeze({
		_internal: {
            create: (/** @type {string} */ title) => {
                if (historyLength() < historySize()) {
                    history.splice(historyLength(), historySize() - historyLength())
                }
                history.push(createMoment(title, active.variables))
                activeIndex = historySize() - 1
                activateMoment(activeIndex)
                return historyLength();
            },
			restore: () => {
				return false;
			},
            go,
            goTo: go,
		},
		api: Object.freeze({
			get active() {
				return active;
			},
			get passage() {
				return active.title;
			},
			get variables() {
				return active.variables;
			},
			get length() {
				return historyLength();
			},
			get size() {
				return historySize();
			},
		}),
	});
}

/** 
 * @typedef {ReturnType<typeof createState>} CompleteStateApi
 */

export default createState()
