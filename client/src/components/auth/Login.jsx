import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Screenshot 2023-04-01 at 14.11.17-fotor-bg-remover-20230401141413.png";

class Login extends Component {
	render() {
		return (
			<div className="body">
				<main className="auth-main">
					<section id="a">
						<img src={logo} alt="Logo"></img>
					</section>
					<section id="b">
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/Services">Services</Link>
								</li>
								<li>
									<Link to="/Contact">Contact</Link>
								</li>
							</ul>
						</nav>

						<form action="" method="get">
	
							<input type="email" placeholder="Email"></input>
							<input type="text" placeholder="Password"></input>

							<button type="submit">Submit</button>
						</form>

						<footer className="auth-footer">
							<p>
								Don't have an account? &nbsp;
								<Link to="/Sign-Up">Click Here</Link>
							</p>
						</footer>
					</section>
				</main>
			</div>
		);
	}
}

export default Login;
