const searchInitialState = {
    searchResults: [{ }]
};

export default function classificationReducer(state = searchInitialState, action) {
    switch (action.type) {
        case "SEARCH_CLASSIFICATION_EVENTS":
            state = {searchResults: action.payload}
            return state
        default:
            return state;
    }
}
