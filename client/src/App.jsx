import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/admindashboard/Admindashboard";
import CreateOrganization from "./components/admindashboard/CreateOrganization";
import Contact from "./components/auth/Contact";
import Home from "./components/auth/Home";
import Login from "./components/auth/Login";
import Services from "./components/auth/Services";
import SignUp from "./components/auth/SignUp";
import ChatLog from "./components/chat/chatLog";
import UserChat from "./components/chat/userChat";
import Error from "./components/error";
import AdminOrg from "./components/organizations/admin-org";
import Organization from "./components/organizations/organizations.jsx";
import UserDashboard from "./components/userdashboard/Userdashboard";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/user-dashboard" element={<UserDashboard />} />
					<Route path="/admin-dashboard" element={<AdminDashboard />} />
					<Route path="/create-organization" element={<CreateOrganization />} />
					<Route path="/organization" element={<Organization />} />
					<Route path="/admin-org" element={<AdminOrg />} />
					<Route path="/user-chat" element={<UserChat />} />
					<Route path="/chat-log" element={<ChatLog />} />
					<Route path="/chat-log/:userId" element={<ChatLog />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
