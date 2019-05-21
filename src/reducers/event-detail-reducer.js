const eventInitialState = {
    eventDetail: { },
    localEventDetail: {}
};

export default function eventDetailReducer(state = eventInitialState, action) {
    switch (action.type) {
        case "GET_EVENT_DETAIL":
            state = {eventDetail: action.payloadS, localEventDetail: action.payloadL}
            return state
        case "LIKE_EVENT":
            state = {eventDetail: {...state.eventDetail}, localEventDetail: action.payload}
        case "PURCHASE_EVENT":
            state = {eventDetail: {...state.eventDetail}, localEventDetail: action.payload}
        case "GET_LOCAL_EVENT":
            console.log("Event detail reducer :: GET_LOCAL_EVENT")
            state = {eventDetail: {...state.eventDetail}, localEventDetail: action.payload}
        default:
            return state;
    }
}
