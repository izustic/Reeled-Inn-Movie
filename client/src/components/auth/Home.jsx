import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Screenshot 2023-04-01 at 14.11.17-fotor-bg-remover-20230401141413.png";

export class Home extends Component {
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
						<div id="writeUp">
							<h1>ABOUT US</h1>
							<p>
								Fix It is a leading platform connecting users with approved
								facility managers for all their maintenance needs. We provide a
								centralized system for managing maintenance requests, ensuring
								that they are addressed promptly by highly trained and
								experienced facility managers. Our platform is designed to be
								user-friendly, allowing users to easily create maintenance
								requests and track their history. With Fix It, users can be
								assured of quality services and seamless experiences. Join Fix
								It today and experience the convenience of having all your
								maintenance needs met in one centralized platform.
							</p>
							<li>
								<Link to="/Login">Login</Link>
							</li>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default Home;
