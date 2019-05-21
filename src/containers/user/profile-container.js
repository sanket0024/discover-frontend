import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from "../../components/user/profile";
import {
	currentUser,
	userSingIn,
	userRegister,
	userSignOut,
	userUpdate,
	findUserById,
	searchUsers
} from "../../actions/actions";

const stateToPropertyMapper = state => {
	return {
		loggedInUser: state.userReducer.loggedInUser,
		user: state.userReducer.user,
		users: state.userReducer.users
	}
};

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		currentUser,
		userSingIn,
		userRegister,
		userSignOut,
		userUpdate,
		findUserById,
		searchUsers
	}, dispatch);
}

const ProfileContainer = connect(
	stateToPropertyMapper,
	matchDispatchToProps
)(Profile);

export default ProfileContainer;
