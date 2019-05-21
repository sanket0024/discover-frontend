const eventInitialState = {
	eventDetail: {},
	localEventDetail: {}
};

export default function eventDetailReducer(state = eventInitialState, action) {
	switch (action.type) {
		case "GET_EVENT_DETAIL":
			state = { eventDetail: action.payloadS, localEventDetail: action.payloadL }
			return state;
		case "LIKE_EVENT":
			state = { eventDetail: { ...state.eventDetail }, localEventDetail: action.payload }
			return state;
		case "PURCHASE_EVENT":
			state = { eventDetail: { ...state.eventDetail }, localEventDetail: action.payload }
			return state;
		case "GET_LOCAL_EVENT":
			state = { eventDetail: { ...state.eventDetail }, localEventDetail: action.payload }
			return state;
		default:
			return state;
	}
}
