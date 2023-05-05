import React, { Component } from "react";
import {
	FaFacebookSquare,
	FaInstagramSquare,
	FaLinkedin,
	FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../Assets/Screenshot 2023-04-01 at 14.11.17-fotor-bg-remover-20230401141413.png";

class Contact extends Component {
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
							<div className="socials">
								<h1>CONTACT US</h1>
								<div className="social">
									<FaFacebookSquare />
									<FaInstagramSquare />
									<FaTwitterSquare />
									<FaLinkedin />
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default Contact;
