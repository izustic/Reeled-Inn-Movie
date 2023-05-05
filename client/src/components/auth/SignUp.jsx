import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Screenshot 2023-04-01 at 14.11.17-fotor-bg-remover-20230401141413.png";
import "./style.css";
import axios from "axios";

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullName: "",
			email: "",
			password: "",
			userType: "",
			confirmPassword: "",
		};
	}

	postUser = async () => {};

	changeName = (ev) => {
		this.setState({
			fullName: ev.target.value,
		});
	};

	changeEmail = (ev) => {
		this.setState({
			email: ev.target.value,
		});
	};

	changeUserType = (ev) => {
		this.setState({
			userType: ev.target.value,
		});
	};

	changePassword = (ev) => {
		this.setState({
			password: ev.target.value,
		});
	};

	changeConfirmPassword = (ev) => {
		this.setState({
			confirmPassword: ev.target.value,
		});
	};

	submitForm = async (ev) => {
		// console.log(
		// 	`${this.state.fullName} ${this.state.email}  ${this.state.userType}  ${this.state.password}`
		// );
		ev.preventDefault();
		console.log(this.state);
		const response = await axios.post(
			"http://localhost:3000/user/signup",
			this.state
		);
		console.log(response);
		window.location.href='/login'
	};

	render() {
		return (
			<div className="body">
				<main className="auth-main">
					<section id="a">
						<img src={logo} alt="logo"></img>
					</section>

					<section id="b">
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/services">Services</Link>
								</li>
								<li>
									<a href="/contact">Contact</a>
								</li>
							</ul>
						</nav>
						<form onSubmit={this.submitForm}>
							<input
								type="text"
								value={this.state.name}
								onChange={this.changeName}
								placeholder="Full Name"
							></input>
							<input
								type="email"
								value={this.state.email}
								onChange={this.changeEmail}
								placeholder="Email"
							></input>

							<select
								value={this.state.userType}
								onChange={this.changeUserType}
								required
							>
								<option value="" disabled hidden className="usertype">
									User Type
								</option>
								<option>Admin</option>
								<option>User</option>
							</select>

							<input
								type="text"
								value={this.state.password}
								onChange={this.changePassword}
								placeholder="Password"
							></input>
							<input
								type="text"
								value={this.state.confirmPassword}
								onChange={this.changeConfirmPassword}
								placeholder="Confirm Password"
							></input>
							<button type="submit">Submit</button>
						</form>

						<footer className="auth-footer">
							<p>
								Already have an account? <Link to="/Login">Click Here</Link>
							</p>
						</footer>
					</section>
				</main>
			</div>
		);
	}
}

export default SignUp;
