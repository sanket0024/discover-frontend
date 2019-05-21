import { BASEURL_LOCAL } from "../util/constants";
let _singleton;

class UserService {

	static getInstance() {
		if (_singleton === undefined) {
			_singleton = new UserService();
		}
		return _singleton;
	}


	getCurrentUser = () => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "POST",
		};
		return fetch(BASEURL_LOCAL + "/api/loggedin", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			})
	}

	createUser = (user) => {
		console.log(user);
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"Content-Type": "application/json",
			},
			credentials: 'include',
			method: "POST",
			body: JSON.stringify({ "firstName": "Anonymous", "username": user.email, "email": user.email, "password": user.pass, "role": "explorer" })
		};
		return fetch(BASEURL_LOCAL + "/api/regi	ster", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	signIn = (userName, password) => {
		console.log("Siggggnnnnn INnnnnNNNNNN")
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "POST",
			body: JSON.stringify({ "username": userName, "password": password })
		};
		return fetch(BASEURL_LOCAL + "/api/login", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				alert("Invalid login attempt");
				console.log(err);
			})
	}

	findAllUsers = () => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json"
			},
			credentials: 'include',
			method: "GET"
		};
		return fetch(BASEURL_LOCAL + "/api/users", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	findUserById = (userId) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "GET"
		};
		return fetch(BASEURL_LOCAL + "/api/users/" + userId, params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	updateUser = (user) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "PUT",
			body: JSON.stringify(user)
		};
		return fetch(BASEURL_LOCAL + "/api/user/" + user.userid, params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	deleteUser = (userId) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			method: "DELETE"
		};
		return fetch(BASEURL_LOCAL + "/api/delete-user/" + userId, params)
			.then(function (response) {
				// return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	logout = () => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "POST"
		};
		return fetch(BASEURL_LOCAL + "/api/logout", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			})
	}

	findFollowers = (userId) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "GET"
		};
		return fetch(BASEURL_LOCAL + "/api/user/" + userId + "/followers", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	findFollowing = (userId) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "GET"
		};
		return fetch(BASEURL_LOCAL + "/api/user/" + userId + "/following", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	followThisUser = (userid) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "PUT"
		};
		console.log(BASEURL_LOCAL + "/api/user/follow/" + userid);
		return fetch(BASEURL_LOCAL + "/api/user/follow/" + userid, params)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	searchUsers = (key) => {
		var params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method: "GET"
		};
		return fetch(BASEURL_LOCAL + "/api/user/search/?firstname=" + key + "&username=&lastname=&role=", params)
			.then(function (response) {
				return response.json();
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}

export default UserService;
