import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./chat.css";

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

function UserChat() {
	const [user] = useAuthState(auth);
	const [hasAccount, setHasAccount] = useState(true);
	const [hasSignedUp, setHasSignedUp] = useState(false);

	useEffect(() => {
		if (user) {
			setHasSignedUp(true); // set to true if user is signed in
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

	const toggleHasAccount = () => {
		setHasAccount((prevHasAccount) => !prevHasAccount);
	};

	const toggleHasSignedUp = () => {
		setHasSignedUp((prevHasSignedUp) => !prevHasSignedUp);
		setHasAccount(true);
	};

	return (
		<div className="App">
			<header className="header">
				<h1>Send Requests and Responses</h1>
				<SignOut />
			</header>

			<section>
				{user && hasAccount && !hasSignedUp ? (
					<SignIn
						hasAccount={hasAccount}
						toggleHasAccount={toggleHasAccount}
						toggleHasSignedUp={toggleHasSignedUp}
					/>
				) : (
					<SignUp toggleHasSignedUp={toggleHasSignedUp} />
				)}
			</section>
		</div>
	);
}

function SignIn(props) {
	const { hasAccount, toggleHasAccount, toggleHasSignedUp } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signInWithEmail = () => {
		auth.signInWithEmailAndPassword(email, password);
	};

	return (
		<>
			<div>
				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button onClick={signInWithEmail}>Sign In</button>
			<p>
				Don't have an account?{" "}
				<span className="link" onClick={toggleHasSignedUp}>
					Sign up
				</span>
			</p>
			<p>
				Forgot your password?{" "}
				<span
					className="link"
					onClick={() => console.log("Forgot password clicked")}
				>
					Reset password
				</span>
			</p>
		</>
	);
}

function SignUp(props) {
	const { toggleHasSignedUp } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signUpWithEmail = () => {
		auth.createUserWithEmailAndPassword(email, password);
	};

	return (
		<>
			<div>
				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button onClick={signUpWithEmail}>Sign Up</button>
			<p>
				Already have an account?{" "}
				<span className="link" onClick={toggleHasSignedUp}>
					Sign in
				</span>
			</p>
		</>
	);
}

function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

function ChatRoom() {
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(25);

	const [messages] = useCollectionData(query, { idField: "id" });
	const [newMessage, setNewMessage] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, photoURL, displayName } = auth.currentUser;

		await messagesRef.add({
			text: newMessage,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
			displayName,
		});

		setNewMessage("");
	};

	return (
		<>
			<main>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
			</main>

			<form onSubmit={sendMessage}>
				<input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type here..."
				/>
				<button type="submit" disabled={!newMessage}>
					Send
				</button>
			</form>
		</>
	);
}

function ChatMessage(props) {
	const { text, uid, photoURL, displayName } = props.message;
	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

	return (
		// eslint-disable-next-line no-undef
		<div className={`${message} ${messageClass}`}>
			<img src={photoURL} alt="User Avatar" />
			<div>
				<p className="name">{displayName}</p>
				<p className="text">{text}</p>
			</div>
		</div>
	);
}

export default UserChat;

// function ChatMessage(props) {
//   const { message, user } = props;
//   const messageClass = message.uid === user.uid ? "sent" : "received";
//   const hasPhoto = messageClass === "sent" && message.photoURL;

//   return (
//     <>
//       <div className={`${messageClass} message`}>
//       {hasPhoto && <img src={message.photoURL} alt="user profile" />}
//       <p>{message.text}</p>
//     </div>
//     </>
//     );
//   }

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import React, { useEffect, useRef, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import './chat.css'

// firebase.initializeApp({
//   apiKey: "AIzaSyBR4n-8MKm-HRMYVtXQXFuu0E8DXirJpGA",
//   authDomain: "chatify-58088.firebaseapp.com",
//   projectId: "chatify-58088",
//   storageBucket: "chatify-58088.appspot.com",
//   messagingSenderId: "338210562329",
//   appId: "1:338210562329:web:cc42f9d7803e81c510a588",
//   measurementId: "G-YF1LG38TQ2",
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// function UserChat() {
//   const [user] = useAuthState(auth);
//   const [hasAccount, setHasAccount] = useState(true);

//   useEffect(() => {
//     if (user) {
//       // Create user document in Firestore on sign-in
//       const userRef = firestore.collection("users").doc(user.uid);
//       userRef.get().then((doc) => {
//         if (!doc.exists) {
//           userRef.set({
//             uid: user.uid,
//             displayName: user.email,
//             email: user.email,
//             photoURL: user.photoURL,
//           });
//         }
//       });
//     }
//   }, [user]);

//   const toggleHasAccount = () => {
//     setHasAccount((prevHasAccount) => !prevHasAccount);
//   };

//   return (
//     <div className="App">
//       <header className="header">
//         <h1>Send Requests and Responses</h1>
//         <SignOut />
//       </header>

//       <section>
//         {user && hasAccount ? (
//           <ChatRoom user={user} />
//         ) : (
//           <SignIn hasAccount={hasAccount} toggleHasAccount={toggleHasAccount} />
//         )}
//       </section>
//     </div>
//   );
// }

// function SignIn(props) {
//   const { hasAccount, toggleHasAccount } = props;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const signInWithEmail = () => {
//     auth.signInWithEmailAndPassword(email, password);
//   };

//   return (
//     <>
//       <div>
//         <label>Email</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </div>
//       <div>
//         <label>Password</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button className="button sign-in" onClick={signInWithEmail}>
//         Sign in with Email
//       </button>
//       {hasAccount ? (
//         <p>
//           Don't have an account?{" "}
//           <button className="link" onClick={toggleHasAccount}>
//             Sign up
//           </button>
//         </p>
//       ) : (
//         <div>
//           <SignUp />
//           <p>Do not violate the community guidelines or you will be banned for life!</p>
//         </div>
//       )}
//     </>
//   );
// }

// // function SignIn(props) {
// //   const { hasAccount, toggleHasAccount } = props;
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const signInWithEmail = () => {
// //     auth.signInWithEmailAndPassword(email, password);
// //   };

// //   return (
// //     <>
// //       <div>
// //         <label>Email</label>
// //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //       </div>
// //       <div>
// //         <label>Password</label>
// //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //       </div>
// //       <button className="button sign-in" onClick={signInWithEmail}>
// //         Sign in with Email
// //       </button>
// //       {hasAccount ? (
// //         <p>
// //           Don't have an account?{" "}
// //           <button className="link" onClick={toggleHasAccount}>
// //             Sign up
// //           </button>
// //         </p>
// //       ) : (
// //         <SignUp />
// //       )}
// //     </>
// //   );
// // }

// function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const signUpWithEmail = () => {
//     auth.createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(user);
//         // You can also update the user profile with additional information like displayName and photoURL
//         // user.updateProfile({
//         //   displayName: "Jane Doe",
//         //   photoURL: "https://example.com/profile.jpg"
//         // })
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//   };

//   return (
//     <>
//       <div>
//         <label>Email</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </div>
//       <div>
//         <label>Password</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button className="button sign-up" onClick={signUpWithEmail}>
//         Sign up with Email
//       </button>
//       <p>Do not violate the community guidelines or you will be banned for life!</p>
//     </>
//   );
// }

// // function SignIn() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   // const signInWithGoogle = () => {
// //   //   const provider = new firebase.auth.GoogleAuthProvider();
// //   //   auth.signInWithPopup(provider);
// //   // };
// //   const signInWithEmail = () => {
// //     auth.signInWithEmailAndPassword(email, password);
// //   };

// //   return (
// //     <>
// //       <div>
// //         <label>Email</label>
// //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //       </div>
// //       <div>
// //         <label>Password</label>
// //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //       </div>
// //       <button className="button sign-in" onClick={signInWithEmail}>
// //         Sign in with Email
// //       </button>
// //       <p>Don't have an account? <SignUp /></p>
// //     </>
// //   );
// // }

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="button sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

// function ChatRoom(props) {
//   const { user } = props;
//   const dummy = useRef();

//   // Create chat room subcollection under current user's document on mount
//   useEffect(() => {
//     const chatRoomRef = firestore
//       .collection("users")
//       .doc(user.uid)
//       .collection("chats")
//       .doc("admin");
//     chatRoomRef.get().then((doc) => {
//       if (!doc.exists) {
//         chatRoomRef.set({
//           createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         });
//       }
//     });
//   }, [user]);

//   const messagesRef = firestore
//     .collection("users")
//     .doc(user.uid)
//     .collection("chats")
//     .doc("admin")
//     .collection("messages");

//   const query = messagesRef.orderBy("createdAt").limit(25);

//   const [messages] = useCollectionData(query, { idField: "id" });

//   const [formValue, setFormValue] = useState("");

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     await messagesRef.add({
//       text: formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       uid: user.uid,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       });
//       setFormValue("");
//       dummy.current.scrollIntoView({ behavior: "smooth" });
//       };

//       return (
//       <>
//       <main className="main">
//       {messages &&
//       messages.map((msg) => <ChatMessage key={msg.id} message={msg} user={user} />)}
//           <span ref={dummy}></span>
//         </main>

//         <form onSubmit={sendMessage} className="form">
//           <input
//             value={formValue}
//             onChange={(e) => setFormValue(e.target.value)}
//             placeholder="Type your message here..."
//           />

//           <button type="submit" disabled={!formValue} className="button">
//             Send
//           </button>
//         </form>
//       </>
//       );
//       }

//       function ChatMessage(props) {
//       const { message, user } = props;
//       const messageClass = message.uid === user.uid ? "sent" : "received";
//       const hasPhoto = messageClass === "sent" && message.photoURL;

//       return (
//         <>
//           <div className={`${messageClass} message`}>
//           {hasPhoto && <img src={message.photoURL} alt="user profile" />}
//           <p>{message.text}</p>
//         </div>
//         </>
//         );
//       }

//       export default UserChat;
