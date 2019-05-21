import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TicketMasterHome from "../../components/ticket-master-home/ticket-master-home";
import {
	findAllEvents,
	findAllGenres,
	userSingIn,
	userRegister,
	currentUser,
	userSignOut
} from "../../actions/actions";

const stateToPropertyMapper = state => {
	return {
		events: state.eventReducer.events,
		genres: state.eventReducer.genres,
		user: state.userReducer.user
	}
};

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		findAllEvents,
		findAllGenres,
		userSingIn,
		userRegister,
		currentUser,
		userSignOut
	}, dispatch);
}

const Events = connect(
	stateToPropertyMapper,
	matchDispatchToProps
)(TicketMasterHome);

export default Events;
