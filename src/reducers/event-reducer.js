import { FIND_ALL_EVENTS, FIND_ALL_GENRE } from "../util/constants";

const eventInitialState = {
	events: [],
	genres: [],
	user: {}
};

function eventReducer(state = eventInitialState, action) {
	switch (action.type) {
		case FIND_ALL_EVENTS:
			state = { genres: { ...state.genres }, events: action.payload, user: { ...state.user } }
			return state;

		case FIND_ALL_GENRE:
			state = { genres: action.payload.data, events: { ...state.events }, user: { ...state.user } }
			return state;

		default:
			return state;
	}
}

export default eventReducer;
