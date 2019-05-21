import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchList from "../../components/search/SearchList";
import {searchEvents} from "../../actions/actions";

const stateToPropertyMapper = state => {
    return {searchResults: state.searchReducer.searchResults}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        searchEvents
    }, dispatch);
}

const SearchContainer = connect(
    stateToPropertyMapper,
    matchDispatchToProps
)(SearchList);

export default SearchContainer;
