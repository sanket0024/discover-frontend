import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Admin from "../../components/admin/admin";
import { findAllUsers, deleteUser, adminUserUpdate } from "../../actions/actions";

const stateToPropertyMapper = state => {
  console.log("admin container");
  console.log(state);
  return {
    loggedInUser: state.userReducer.loggedInUser,
    user: state.userReducer.user,
    users: state.userReducer.users
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      findAllUsers,
      deleteUser,
      adminUserUpdate
    },
    dispatch
  );
}

const AdminContainer = connect(
  stateToPropertyMapper,
  matchDispatchToProps
)(Admin);

export default AdminContainer;
