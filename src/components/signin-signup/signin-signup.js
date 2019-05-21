import React, { Component } from 'react';
import "./signin-signup.css";
import { Alert } from 'reactstrap';

class SigninSignup extends Component {

	constructor(props) {
		super(props);
		this.state = { email: "", pass: "", confirmpass: "" }
		this.handleChange = this.handleChange.bind(this);
		this.validate = this.validate.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submit = () => {
		if (this.props.dialog === "signin") {
			this.props.userSingIn({ email: this.state.email, pass: this.state.pass });
		}
		else {
			this.props.userRegister({ email: this.state.email, pass: this.state.pass });
		}
		this.props.closeSignInModal();
	}

	validate() {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (this.props.dialog === "signup") {
			if (!re.test(String(this.state.email).toLowerCase())) {
				return "Invalid email address";
			}
			if (this.state.pass.length < 5) {
				return "Password length should be at least 5 characters long";
			}
			if (this.state.confirmpass !== this.state.pass) {
				return "Confirm password not equal to password";
			}
		}
		else if (this.props.dialog === "signin") {
			if (this.state.email === "") {
				return "Email cannot be blank";
			}
			if (this.state.pass === "") {
				return "Password cannot be blank";
			}
		}
		else {
			return undefined;
		}
	}


	render() {
		return (
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
				{
					this.props.dialog === "signin" ? (
						<h2>Login</h2>
					) : (
							<h2>Signup</h2>
						)
				}
				<br></br>
				<div>
					<div className="close-icon" onClick={this.props.closeSignInModal}>
						<i className="fa-2x far fa-times-circle"></i>
					</div>
					<div className="form-group">
						<label>*Email address</label>
						<input
							type="email"
							name="email"
							className="form-control"
							id="input-email"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							onChange={this.handleChange}>
						</input>
					</div>
					<div className="form-group">
						<label>*Password</label>
						<input
							type="password"
							name="pass"
							className="form-control"
							id="input-password"
							placeholder="Password"
							onChange={this.handleChange}>
						</input>
					</div>
					{
						this.props.dialog === "signup" ? (
							<div className="form-group">
								<label>*Confirm Password</label>
								<input
									type="password"
									name="confirmpass"
									className="form-control"
									id="confirm-password"
									placeholder="Password"
									onChange={this.handleChange}>
								</input>
							</div>
						) : (
								<p></p>
							)
					}
					<br></br>
					<button
						className="btn"
						onClick={this.submit}
						disabled={this.validate()}>
						Submit
					</button>
					{/* uncomment if you want to add oauth
					<div className="google-api">
						<i className="ml-4 fa-2x fab fa-google"></i>
					</div> */}
				</div>
				<br></br>
			</div>
		);
	}
}

export default SigninSignup;