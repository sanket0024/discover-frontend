import React, { Component } from 'react';
import "./navbar.css";
import SigninSignup from '../signin-signup/signin-signup';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';


class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dialog: "",
			open: false,
			usersearch: ""
		};
		this.openSignInModal = this.openSignInModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.currentUser();
	}

	openSignInModal = () => {
		this.setState({
			open: true,
			dialog: "signin"
		});
	}

	openSignUpModal = () => {
		this.setState({
			open: true,
			dialog: "signup"
		});
	}

	closeSignInModal = () => {
		this.setState({
			open: false,
			dialog: ""
		});
	};

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-sm fixed-top">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navitems" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse global-navbar" id="navitems">
						<Link className="link" to="/"><p className="navbar-brand brand-name">Discover</p></Link>
						<div className="form-inline my-2 my-lg-0 mr-5">
							{
								this.props.user && this.props.user.userid ? (
									<div className="row">
										<div
											className="col nav-links my-2 dropdown ml-2">
											{this.props.user.firstName}
											<b className="caret"></b>
											<ul className="dropdown-menu p-1" id="menu1">
												{
													this.props.profile !== "true" &&
													<Link className="link" to={`/user/${this.props.user.userid}/profile`}>
														<li className="ml-2">Profile</li>
													</Link>

												}
												<Link to="/" className="link">
													<li className=" ml-2" onClick={this.props.userSignOut}>Signout</li>
												</Link>
                                                {this.props.user.role === "admin" && (
                                                    <Link className="link" to={`/admin`}>
                                                        <li className="ml-2">Admin Panel</li>
                                                    </Link>
                                                )}
											</ul>
										</div>
										<div className="col">
										</div>
									</div>
								) : (
										<div className="row">
											<div
												onClick={this.openSignInModal}
												className="col nav-links my-2 mr-3">
												Sign In
										</div>
											<div
												onClick={this.openSignUpModal}
												className="col-flex nav-links my-2">
												Sign Up
										</div>
										</div>
									)
							}
						</div>
					</div>
				</nav>

				<Dialog
					open={this.state.open}
					onClose={this.closeSignInModal}
					fullWidth="lg"
					aria-labelledby="form-dialog-title">
					<SigninSignup
						user={this.props.user}
						closeSignInModal={this.closeSignInModal}
						dialog={this.state.dialog}
						userSingIn={this.props.userSingIn}
						userRegister={this.props.userRegister}>
					</SigninSignup>
				</Dialog>
			</div >
		);
	}
}

export default Navbar;
