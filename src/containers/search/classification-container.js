import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchClassifications } from "../../actions/actions";
import ClassificationList from "../../components/classification/classification-list";

const stateToPropertyMapper = state => {
	return { searchResults: state.classificationReducer.searchResults }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		searchClassifications
	}, dispatch);
}

const ClassificationContainer = connect(
	stateToPropertyMapper,
	matchDispatchToProps
)(ClassificationList);

export default ClassificationContainer;
