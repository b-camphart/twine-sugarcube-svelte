import _state from "framework/internal/_state"

const State = _state.api

export default State

// const State = {
// 	get active() {
// 		const history = internal.__history();
// 		const moment = history.moments.at(history.active) ?? {
// 			title: "",
// 			variables: {},
// 		};

// 		if (currentMoment == null || currentMoment.id != history.active) {
// 			currentMoment = {
// 				id: history.active,
// 				variables: JSON.parse(JSON.stringify(moment.variables)),
// 			};
// 		}

// 		return { title: moment.title, variables: currentMoment.variables };
// 	},

// 	/**
// 	 * @returns the title fo the passage associated with the active (present) moment
// 	 */
// 	get passage() {
// 		return this.active.title;
// 	},

// 	get variables() {
// 		return this.active.variables;
// 	},
// };

// export default State;

export function variables() {
    return State.variables
}