import React, { Component } from "react";
import "./admin.css";
import Row from "./row";
import NavbarContainer from "../../containers/navbar/navbar-container";

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.props.findAllUsers();
		this.state = {
			userid: "",
			usernameFld: "",
			passwordFld: "",
			firstName: "",
			lastName: "",
			role: ""
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRoleChange = this.handleRoleChange.bind(this);
	}
	handlePasswordChange(event) {
		this.setState({ passwordFld: event.target.value });
	}
	handleRoleChange(event) {
		this.setState({ role: event.target.value });
	}
	handleUsernameChange(event) {
		this.setState({ usernameFld: event.target.value });
	}
	handleFirstNameChange(event) {
		this.setState({ firstName: event.target.value });
	}
	handleLastNameChange(event) {
		this.setState({ lastName: event.target.value });
	}

	editUser = user => {
		this.setState({
			userid: user.userid,
			usernameFld: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			passwordFld: user.password,
			role: user.role
		});
	};

	updateUser = () => {
		var user = {
			userid: this.state.userid,
			password: this.state.passwordFld,
			username: this.state.usernameFld,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			role: this.state.role
		}
		this.props.adminUserUpdate(user);
	}

	render() {
		return (
			<div className="container-fluid">
				<NavbarContainer></NavbarContainer>
				<div className="admin-panel text-center">
					<h3 className="text-center">Admin Panel</h3>
				</div>
				<table
					className="table table-hover table-responsive-md"
					id="adminTable"
				>
					<thead>
						<tr className="admin-panel text-light">
							<th scope="col">Username</th>
							<th scope="col">Password</th>
							<th scope="col">First Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">Role</th>
							<th scope="col">&nbsp;</th>
						</tr>
						<tr>
							<th scope="col">
								<input
									id="usernameFld"
									className="form-control"
									placeholder="username"
									value={this.state.usernameFld}
									onChange={this.handleUsernameChange.bind(this)}
								/>
							</th>
							<th scope="col">
								<input
									id="password​Fld​"
									className="form-control"
									placeholder="password"
									value={this.state.passwordFld}
									onChange={this.handlePasswordChange.bind(this)}
								/>
							</th>
							<th scope="col">
								<input
									id="firstName​Fld​"
									className="form-control"
									placeholder="First Name"
									value={this.state.firstName}
									onChange={this.handleFirstNameChange.bind(this)}
								/>
							</th>
							<th scope="col">
								<input
									id="lastName​Fld​"
									className="form-control"
									placeholder="Last Name"
									value={this.state.lastName}
									onChange={this.handleLastNameChange.bind(this)}
								/>
							</th>
							<th scope="col">
								<select
									id="role​Fld​"
									className="form-control"
									value={this.state.role}
									onChange={this.handleRoleChange.bind(this)}
								>
									{/* <option value="admin">Admin</option> */}
									<option value="explorer">Explorer</option>
									<option value="host">Host</option>
								</select>
							</th>
							<th scope="col">
								<div className="d-flex flex-row">
									{/* <button
										id="searchUserButton"
										type="button"
										className="btn btn-default btn-sm ml-2 ml-sm-2"
									>
										<i className="fas fa-search" />
									</button> */}
									<button
										id="updateUserButton"
										type="button"
										className="btn btn-default btn-sm"
										onClick={this.updateUser}
									>
										<innerHeight className="far fa-check-circle" />
									</button>
									{/* <button
										id="addUserButton"
										type="button"
										className="btn btn-default btn-sm"
									>
										<i className="fas fa-plus" />
									</button> */}
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.map(user => (
							<Row
								user={user}
								deleteUser={this.props.deleteUser}
								editUser={this.editUser}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
