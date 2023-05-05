


import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useEffect, useState } from "react";
import AdminChat from "./adminChat";
import {useNavigate} from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import './chat.css'

firebase.initializeApp({
	apiKey: "AIzaSyBR4n-8MKm-HRMYVtXQXFuu0E8DXirJpGA",
	authDomain: "chatify-58088.firebaseapp.com",
	projectId: "chatify-58088",
	storageBucket: "chatify-58088.appspot.com",
	messagingSenderId: "338210562329",
	appId: "1:338210562329:web:cc42f9d7803e81c510a588",
	measurementId: "G-YF1LG38TQ2",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatLog() {

  const navigate = useNavigate();



  const [user] = useAuthState(auth);
	const [currentUserId, setCurrentUserId] = useState(null);

	useEffect(() => {
		if (user) {
			// Create user document in Firestore on sign-in
			const userRef = firestore.collection("users").doc(user.uid);
			userRef.get().then((doc) => {
				if (!doc.exists) {
					userRef.set({
						uid: user.uid,
						displayName: user.email,
						email: user.email,
						photoURL: user.photoURL,
					});
				}
			});
		}
	}, [user]);

	const handleChatClick = (userId) => {
		console.log('Clicked!')
		setCurrentUserId(userId);
    navigate(`/chat-log/${userId}`);
	};

	return (
		<div className="App">
			<header className="header">
				<h1>Send Requests and Responses</h1>
				<SignOut />
			</header>

			<section className="chat-list">
				{user && !currentUserId && (
					<ChatList user={user} handleChatClick={handleChatClick} />
				)}
				{user && currentUserId && <AdminChat userId={currentUserId} />}
				{!user && <SignIn />}
			</section>
		</div>
	);
}

function SignIn() {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const signInWithEmail = () => {
		// const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithEmailAndPassword(email, password)
		.catch((error) => {
      setError(error.message);
    });
	};

  return (
    <>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="button sign-in" onClick={signInWithEmail}>
        Sign in with Email
      </button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  );
}

function SignOut() {
	return (
		auth.currentUser && (
			<button className="button sign-out" onClick={() => auth.signOut()}>
				Sign Out
			</button>
		)
	);
}

function ChatList({ user, handleChatClick }) {
	const [users, setUsers] = useState([]);


	useEffect(() => {
		const unsubscribe = firestore.collection("users").onSnapshot((snapshot) => {
			const usersData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(usersData);
		});

		return unsubscribe;
	}, []);

 

	return (
		<div className="chat-log">
			<h2>Users</h2>
			<ul>
				{users.map((userData) => (
					<li key={userData.id}>
						<div className="user-label">{userData.email}</div>
						<div className='btn-wrap'>
							<button className='button' onClick={() => handleChatClick(userData.id)}>
								Respond
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ChatLog;
