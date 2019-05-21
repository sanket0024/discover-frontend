import React, { Component } from 'react';
import Navbar from "../navbar/navbar";
import NavbarContainer from "../../containers/navbar/navbar-container"
import "./profile.css";
import Dialog from '@material-ui/core/Dialog';
import UserService from '../../services/user-service';
import { Alert } from 'reactstrap';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.props.findUserById(this.props.match.params.currentUserId);
		this.openEditProfileDialog = this.openEditProfileDialog.bind(this);
		this.closeEditProfileDialog = this.closeEditProfileDialog.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.loadSearchUser = this.loadSearchUser.bind(this);
		this.displayThisUser = this.displayThisUser.bind(this);
		this.renderSearchUsers = this.renderSearchUsers.bind(this);
		this.followThisUser = this.followThisUser.bind(this);
		this.notContainsFollowers = this.notContainsFollowers.bind(this);
		this.validate = this.validate.bind(this);
		this.state = {
			open: false,
			"userid": this.props.user.userid,
			"firstName": this.props.user.firstName,
			"lastName": this.props.user.lastName,
			"phone": this.props.user.phone,
			"username": this.props.user.username,
			"password": this.props.user.password,
			"role": this.props.user.role,
			"email": this.props.user.email,
			"imageUrl": this.props.user.imageUrl,
			"followers": [],
			"following": [],
			"purchasedEvents": this.props.user.purchasedEvents,
			"likedEvents": this.props.user.likedEvents,
			"hostedEvent": this.props.user.hostedEvents
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			open: false,
			"userid": props.user.userid,
			"firstName": props.user.firstName,
			"lastName": props.user.lastName,
			"phone": props.user.phone,
			"username": this.props.user.username,
			"password": props.user.password,
			"role": props.user.role,
			"email": props.user.email,
			"imageUrl": props.user.imageUrl,
			"followers": [],
			"following": [],
			"purchasedEvents": props.user.purchasedEvents,
			"likedEvents": props.user.likedEvents,
			"hostedEvent": props.user.hostedEvents
		});
		let us = UserService.getInstance();
		if (us.findFollowers) {
			us.findFollowers(props.user.userid)
				.then(response => {
					this.setState({
						followers: response
					})
				})
				.catch(err => {
					console.log(err);
				})
		}
		if (us.findFollowing) {
			us.findFollowing(props.user.userid)
				.then(response => {
					this.setState({
						following: response
					})
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	addFollowers(followers) {
		if (!followers) return;
		let followersList = [];
		if (followers && Array.isArray(followers) && followers.length > 0) {
			for (let u of followers) {
				followersList.push(
					<li className="list-li list-group-item shadow-sm border border-secondary card m-1" key={u.userid} onClick={() => this.displayThisUser(u)} >
						{u.firstName} {u.lastName}
					</li>
				);
			}
		}
		return followersList;
	}

	addFollowing(following) {
		if (!following) return;
		let followingList = [];
		if (following && Array.isArray(following) && following.length > 0) {
			for (let u of following) {
				followingList.push(
					<li className="list-li list-group-item shadow-sm border border-secondary card m-1" key={u.userid} onClick={() => this.displayThisUser(u)} >
						{u.firstName} {u.lastName}
					</li>
				);
			}
		}
		return followingList;
	}

	addPurchasedEvents(purchased) {
		if (!purchased) {
			return;
		}
		let purchasedEvents = [];
		for (let e of purchased) {
			purchasedEvents.push(
				<li className="list-li list-group-item  shadow-sm border border-secondary card m-1" key={e.originalId}>
					{e.name}
				</li>
			)
		}
		return purchasedEvents;
	}

	addLikedEvents(liked) {
		if (!liked) {
			return;
		}
		let likedEvents = [];
		for (let e of liked) {
			likedEvents.push(
				<li className="list-li list-group-item  shadow-sm border border-secondary card m-1" key={e.originalId}>
					{e.name}
				</li>
			)
		}
		return likedEvents;
	}

	hostingEvents(owned) {
		if (!owned) {
			return;
		}
		let ownedEvents = [];
		for (let e of owned) {
			ownedEvents.push(
				<li className="list-li list-group-item shadow-sm border border-secondary card m-1" key={e.originalId}>
					{e.name}
				</li>
			)
		}
		return ownedEvents;
	}

	openEditProfileDialog() {
		this.setState({
			open: true,
			"userid": this.props.user.userid,
			"firstName": this.props.user.firstName,
			"lastName": this.props.user.lastName,
			"phone": this.props.user.phone,
			"username": this.props.user.username,
			"password": this.props.user.password,
			"role": this.props.user.role,
			"email": this.props.user.email,
			"imageUrl": this.props.user.imageUrl
		})
	}

	closeEditProfileDialog() {
		this.setState({
			open: false
		})
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submit = () => {
		this.props.userUpdate({
			...this.state,
			"firstName": this.state.firstName,
			"lastName": this.state.lastName,
			"phone": this.state.phone,
			"username": this.state.email,
			"password": this.state.password,
			"role": this.state.role,
			"email": this.state.email
		});
		this.closeEditProfileDialog();
	}

	loadSearchUser = () => {
		this.props.searchUsers(this.state.user_search);
	}

	renderSearchUsers = () => {
		if (!this.props.users) {
			return;
		}
		let us = [];
		for (let u of this.props.users) {
			us.push(
				<li key={u.userid} className="list-li" onClick={() => this.displayThisUser(u)}>
					{u.firstName} {u.lastName}
				</li>
			)
		}
		return us;
	}

	displayThisUser = (u) => {
		this.setState({
			"userid": u.userid,
			"firstName": u.firstName,
			"lastName": u.lastName,
			"phone": u.phone,
			"password": u.password,
			"role": u.role,
			"email": u.email,
			"imageUrl": u.imageUrl,
			"followers": this.props.user.followers,
			"purchasedEvents": u.purchasedEvents,
			"likedEvents": u.likedEvents,
			"hostedEvent": u.hostedEvent
		})
		let us = UserService.getInstance();
		us.findFollowers(u.userid)
			.then(response => {
				this.setState({
					followers: response
				})
			})
			.catch(err => {
				console.log(err);
			})
		us.findFollowing(u.userid)
			.then(response => {
				this.setState({
					following: response
				})
			})
			.catch(err => {
				console.log(err);
			})

	}

	followThisUser() {
		let us = UserService.getInstance();
		us.followThisUser(this.state.userid);
		let self = this;
		setTimeout(function () {
			us.findFollowers(self.state.userid)
				.then(response => {
					self.setState({
						followers: response
					})
				})
				.catch(err => {
					console.log(err);
				})
		}, 1000);
	}

	notContainsFollowers() {
		if (this.state.followers) {
			for (let u of this.state.followers) {
				if (this.props.user.userid === u.userid) {
					return false;
				}
			}
		}
		return true;
	}

	validate() {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(this.state.email).toLowerCase())) {
			return "Invalid email address";
		}
		else if (this.state.password.length < 5) {
			return "Password length should be at least 5 characters long";
		}
		else {
			return undefined;
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<NavbarContainer></NavbarContainer>
				<div className="profile">
					<div className="row ml-1">
						<div className="jumbotron col-md-4 col-xs-12 col-sm-4 col-lg-4 img-style">
							{
								this.state.imageUrl && this.state.imageUrl !== "" && this.state.imageUrl !== null ? (
									<img alt="User Pic"
										src={this.state.imageUrl}
										id="profile-image1"
										className="img-circle img-responsive" />
								) : (
										<img alt="User Pic"
											src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
											id="profile-image1"
											className="img-circle img-responsive" />
									)
							}
						</div>
						<div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 profile-data ml-lg-3 ml-lg-3">
							{
								this.props.user.userid === this.state.userid &&
								<div className="edit-profile mt-2" onClick={this.openEditProfileDialog}>
									<i className="fas fa-user-edit fa-2x"></i>
								</div>
							}
							{
								this.notContainsFollowers() && this.props.user.userid !== this.state.userid &&
								<div className="edit-profile mt-2" onClick={this.followThisUser}>
									<i class="fas fa-user-plus fa-2x"></i>
								</div>
							}
							<div className="container">
								<h1 className="user-name">{this.state.firstName} {this.state.lastName}</h1>
								<p>as  <b>{this.state.role}</b></p>
							</div>
							<br></br>
							<hr></hr>
							<ul className="details list-group">
								<li className="list-group-item"><i className="fas fa-envelope mr-4"></i>{this.state.email}</li>
								<p></p>
								<li className="list-group-item"><i className="fas fa-mobile mr-4"></i>{this.state.phone}</li>
								<p></p>
								<li className="list-group-item"><i className="fas fa-key mr-4"></i>***</li>
							</ul>
							<hr></hr>
						</div>
						<div className="col-md-4 col-xs-12 col-sm-4 col-lg-3 user-search-jumbo ml-lg-3 ml-lg-3">
							<div className="container row">
								<input
									className="my-2 col-9 form-control"
									type="text"
									placeholder="user search"
									name="user_search"
									value={this.state.usersearch}
									onChange={this.handleChange}>
								</input>
								<i className="col-2 mt-2 ml-2 fas fa-search search-button fa-2x"
									onClick={this.loadSearchUser}></i>
							</div>
							<ul className="user-list-ul">
								{this.renderSearchUsers()}
							</ul>
						</div>
					</div>
					<hr></hr>
					<div className="row">
						<div className="col-md-4 col-lg-4">
							<div className=" col jumbotron jumbotron-label">Followers <i className="fas fa-link"></i></div>
							<ul className="list-group col event-followers-list-ul">
								{this.addFollowers(this.state.followers)}
							</ul>
						</div>
						<div className="col-md-4 col-lg-4">
							<div className="col text-center user-follow-followers"><i className="fas fa-users fa-10x"></i></div>
						</div>
						<div className="col-md-4 col-lg-4">
							<div className="jumbotron col jumbotron-label">Following <i className="fas fa-paperclip"></i></div>
							<ul className="col event-followers-list-ul list-group">
								{this.addFollowing(this.state.following)}
							</ul>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-4 col-lg-4">
							<div className="jumbotron col jumbotron-label">Purchased Events <i className="fas fa-dollar-sign"></i></div>
							<ul className="col event-followers-list-ul list-group">
								{this.addPurchasedEvents(this.state.purchasedEvents)}
							</ul>
						</div>
						<div className="col-md-4 col-lg-4">
							<div className="jumbotron col jumbotron-label">Liked Events <i className="fas fa-heart"></i></div>
							<ul className="col event-followers-list-ul list-group">
								{this.addLikedEvents(this.state.likedEvents)}
							</ul>
						</div>
						{
							(this.state.role === "Host" || this.state.role === "host") &&
							<div className="col-md-4 col-lg-4 pb-1">

								<div className="jumbotron col jumbotron-label">Hosting <i className="fab fa-houzz"></i></div>
								<ul className="col event-followers-list-ul list-group">
									{this.hostingEvents(this.state.hostedEvent)}
								</ul>
							</div>
						}
					</div>
				</div >

				<Dialog
					open={this.state.open}
					onClose={this.closeEditProfileDialog}
					fullWidth="lg"
					aria-labelledby="form-dialog-title">
					<div className="container login-container">
						<br></br>
						{
							this.validate() ? (
								<Alert color="danger">
									{this.validate()}
								</Alert>
							) : (
									<p></p>
								)
						}
						<br></br>
						<h2>Profile Update</h2>
						<br></br>
						<div className="container">
							<div className="close-icon" onClick={this.closeEditProfileDialog}>
								<i className="fa-2x far fa-times-circle"></i>
							</div>
							<div className="form-group">
								<label>First Name</label>
								<input
									type="text"
									name="firstName"
									className="form-control"
									id="input-firstName"
									placeholder="Alice"
									value={this.state.firstName}
									onChange={this.handleChange}>
								</input>
							</div>
							<div className="form-group">
								<label>Last Name</label>
								<input
									type="text"
									name="lastName"
									className="form-control"
									id="input-lastName"
									placeholder="Greeen"
									value={this.state.lastName}
									onChange={this.handleChange}>
								</input>
							</div>
							<div className="form-group">
								<label>Username - <small>Email will be your username</small></label>
								<input
									type="text"
									name="email"
									className="form-control"
									id="input-username"
									placeholder="abc@xyz.com"
									value={this.state.email} disabled>
								</input>
							</div>
							<div className="form-group">
								<label>*Email</label>
								<input
									type="text"
									name="email"
									className="form-control"
									id="input-email"
									placeholder="abc@xyz.com"
									value={this.state.email}
									onChange={this.handleChange}>
								</input>
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input
									type="text"
									name="phone"
									className="form-control"
									id="input-phone"
									placeholder="xxx-xxx-xxxx"
									value={this.state.phone}
									onChange={this.handleChange}>
								</input>
							</div>
							{/* <div className="form-group">
								<label>Role</label>
								<select
									name="role"
									className="form-control"
									id="input-role"
									value={this.state.role}
									onChange={this.handleChange}>
									<option value="explorer">Explorer</option>
									<option value="host">Host</option>
								</select>
							</div> */}
							<div className="form-group">
								<label>Image URL</label>
								<input
									type="text"
									name="imageUrl"
									className="form-control"
									id="input-imageUrl"
									placeholder="https://url_to_your_image.com"
									value={this.state.imageUrl}
									onChange={this.handleChange}>
								</input>
							</div>
							<div className="form-group">
								<label>*Password</label>
								<input
									type="password"
									name="password"
									className="form-control"
									id="input-password"
									placeholder="***"
									value={this.state.password}
									onChange={this.handleChange}>
								</input>
							</div>
							<button
								className="btn"
								onClick={this.submit}
								disabled={this.validate()}>
								Update
							</button>
						</div>
						<br></br>
					</div>
				</Dialog>
			</div >
		);
	}
}

export default Profile;
