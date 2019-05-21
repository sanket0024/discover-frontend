import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	currentUser,
	userSingIn,
	userRegister,
	userSignOut
} from "../../actions/actions";
import Navbar from '../../components/navbar/navbar';

const stateToPropertyMapper = state => {
	return {
		user: state.userReducer.user
	}
};

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		userSingIn,
		currentUser,
		userRegister,
		userSignOut,
	}, dispatch);
}

const NavbarContainer = connect(
	stateToPropertyMapper,
	matchDispatchToProps
)(Navbar);

export default NavbarContainer;
