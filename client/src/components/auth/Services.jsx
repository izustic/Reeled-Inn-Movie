import React, { Component } from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../Assets/Screenshot 2023-04-01 at 14.11.17-fotor-bg-remover-20230401141413.png";

class Services extends Component {
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
							<h1>OUR SERVICES</h1>
							<p>
								Fix It is a centralized platform that connects users who need
								maintenance services with approved facility managers. In our
								in-app chat platform, Users can create maintenance requests for
								services such as carpentry, electrical work, plumbing, and
								housekeeping, and our facility managers can respond with a price
								and completion time. Fix It is user-friendly, and our approved
								facility managers deliver exceptional services every time. Join
								Fix It today for all your maintenance needs.
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

export default Services;
