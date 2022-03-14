import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import CurrentUserContext from "./CurrentUserContext";

function App() {
	const [token, setToken] = useLocalStorage("token");
	const [currentUser, setCurrentUser] = useState(undefined);

	async function login(loginFormData) {
		const userToken = await JoblyApi.login(loginFormData);
		if (Array.isArray(userToken)) {
			return {error: userToken}
		} else {
			setToken(userToken)
		}	
	}

	async function signUp(signUpFormData) {
		const userToken = await JoblyApi.signUp(signUpFormData)
		if (Array.isArray(userToken)) {
			return {error: userToken}
		} else {
			setToken(userToken)
		}	
	}

	async function logout() {
		setToken(null)
	}

	/* Function that verifies if there is a token. 
	** If it does, the currentUser will be the user provided by the token. 
	** If it doenst have a token, the currentUser will be set to null 
	*/
	async function changeCurrentUserState() {
		if (token) {
			const username = jwt.decode(token).username;
			JoblyApi.token = token;
			let res;
			try {
				res = await JoblyApi.getUser(username) 
			} catch (e) {
				console.log(e)
			}
			setCurrentUser(res);
		} else {
			setCurrentUser(null)
			JoblyApi.token = null
		}
	}

	useEffect(() => {
		changeCurrentUserState();
	}, [token]);

	if (currentUser === undefined) {
		return <div> ...Loading </div>
	}
	
	return (
		<div className="App">
			<CurrentUserContext.Provider value={{currentUser: currentUser, setCurrentUser: setCurrentUser}}>
				<NavBar logout={logout}/>
				<Routes login={login} signUp={signUp}/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
