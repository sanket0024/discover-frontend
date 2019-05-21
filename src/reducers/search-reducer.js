const searchInitialState = {
	searchResults: [{ }]
};

export default function searchReducer(state = searchInitialState, action) {
    switch (action.type) {
        case "SEARCH_EVENTS":
            state = {searchResults: action.payload}
            return state
        default:
            return state;
    }
}
