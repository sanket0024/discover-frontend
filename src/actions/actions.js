import EventService from "../services/event-service";
import UserService from "../services/user-service";
import {
	FIND_ALL_EVENTS,
	FIND_ALL_GENRE,
	CREATE_USER,
	SEARCH_EVENTS,
	SIGNIN,
	CURRENT_USER,
	SIGNOUT,
	UPDATE_USER,
	FIND_USER_BY_ID,
	SEARCH_USER,
	FIND_ALL_USERS,
	ADMIN_UPDATE_USER
} from "../util/constants";


let es = EventService.getInstance();
let us = UserService.getInstance();

/**
 * Action Creators
 */


/**
 * Event actions
 */
export function findAllEvents() {
	return function (dispatch) {
		var res = es.fetchAllEvents();
		return res.then(response => {
			dispatch(findAllEventsHandler(response));
		})
	}
}

function findAllEventsHandler(e) {
	return {
		type: FIND_ALL_EVENTS,
		payload: e
	}
}

export function findAllGenres() {
	return function (dispatch) {
		var res = es.fetchAllGenres();
		return res.then(response => {
			dispatch(findAllGenresHandler(response));
		})
	}
}

function findAllGenresHandler(e) {
	return {
		type: FIND_ALL_GENRE,
		payload: e
	}
}

// Search actions

export function searchEvents(keyword, country) {
	return function (dispatch) {
		const res = es.searchEvents(keyword, country);
		return res.then(response => dispatch(searchAllEventsHandler(response)));
	}

	function searchAllEventsHandler(response) {
		console.log(response)
		if (response === undefined || response._embedded === undefined) {
			return {
				type: "SEARCH_EVENTS",
				payload: {}
			}
		} else {
			return {
				type: "SEARCH_EVENTS",
				payload: response._embedded.events
			}
		}

	}
}

export function searchClassifications(keyword) {
	return function (dispatch) {
		const res = es.searchClassificationEvents(keyword);
		return res.then(response => dispatch(searchAllEventsHandler(response)));
	}

	function searchAllEventsHandler(response) {
		if (response == undefined) {
			return {
				type: "SEARCH_CLASSIFICATION_EVENTS",
				payload: {}
			}
		} else {
			return {
				type: "SEARCH_CLASSIFICATION_EVENTS",
				payload: response._embedded.events
			}
		}
	}
}

// Event Detail Actions

export function getEventDetail(id) {
	console.log("here at event detail action")
	return function (dispatch) {
		const res = es.getEventDetail(id);
		console.log("action for event detail received")
		return res.then(response => {
			if (response !== undefined) {
				const tempEvent = {
					originalId: id,
					name: response.name,
					price: 0,
					image_url: response.images[0].url
				}
				const res1 = es.updateEvent(id, tempEvent)
				res1.then(res => dispatch(getEventDetailHandler(response, res)))
			} else {
				dispatch(getEventDetailHandler({}, {}))
			}

		});
	}

	function getEventDetailHandler(responseS, responseL) {
		console.log(responseS)
		console.log(responseL)
		return {
			type: "GET_EVENT_DETAIL",
			payloadS: responseS,
			payloadL: responseL
		}
	}
}


export function likeEvent(tempEvent) {
	return function (dispatch) {
		const res = es.likeEvent(tempEvent);
		console.log("action for like event received")
		return res.then(response => dispatch(likeEventHandler(response)));
	}

	function likeEventHandler(response) {
		console.log(response)
		return {
			type: "LIKE_EVENT",
			payload: response
		}
	}
}

export function getLocalEventDetail(id) {
	console.log("here at local event detail action")
	return function (dispatch) {
		const res = es.getLocalEventDetail(id);
		console.log("action for local event detail received")
		return res.then(response => {
			dispatch(getEventDetailHandler(response))
		});
	}

	function getEventDetailHandler(response) {
		console.log(response)
		return {
			type: "GET_LOCAL_EVENT",
			payload: response
		}
	}
}


export function purchaseEvent(tempEvent) {
	return function (dispatch) {
		const res = es.purchaseEvent(tempEvent);
		console.log("action for like event received")
		return res.then(response => dispatch(purchaseEventHandler(response)));
	}

	function purchaseEventHandler(response) {
		console.log(response)
		return {
			type: "PURCHASE_EVENT",
			payload: response
		}
	}
}


export function hostEvent(tempEvent) {
	return function (dispatch) {
		const res = es.hostEvent(tempEvent);
		console.log("action for host event received")
		return res.then(response => dispatch(hostEventHandler(response)));
	}

	function hostEventHandler(response) {
		console.log(response)
		return {
			type: "PURCHASE_EVENT",
			payload: response
		}
	}
}
/**
 * User actions
 */

export function currentUser() {
	return function (dispatch) {
		var res = us.getCurrentUser();
		return res.then(response => {
			dispatch(currentUserHandler(response));
		}).catch(err => {
			console.log(err);
		})
	}
}

function currentUserHandler(u) {
	return {
		type: CURRENT_USER,
		payload: u
	}
}

export function userRegister(u) {
	return function (dispatch) {
		var res = us.createUser(u);
		return res.then(response => {
			dispatch(createUserHandler(response));
		}).catch(err => {
			console.log(err);
		})
	}
}

function createUserHandler(u) {
	console.log(u);
	return {
		type: CREATE_USER,
		payload: u
	}
}

export function userSingIn(u) {
	return function (dispatch) {
		var res = us.signIn(u.email, u.pass);
		return res.then(response => {
			dispatch(userSingInHandler(response))
		}).catch(err => {
			console.log(err);
		});
	}
}

function userSingInHandler(u) {
	return {
		type: SIGNIN,
		payload: u
	}
}

export function userSignOut() {
	return function (dispatch) {
		var res = us.logout();
		return res.then(response => {
			dispatch(userSignOutHandler(response))
		}).catch(err => {
			console.log(err);
		})
	}
}

function userSignOutHandler(u) {
	return {
		type: SIGNOUT,
		payload: u
	}
}

export function userUpdate(u) {
	return function (dispatch) {
		var res = us.updateUser(u);
		return res.then(response => {
			dispatch(userUpdateHandler(response))
		}).catch(err => {
			console.log(err);
		})
	}
}

function userUpdateHandler(u) {
	return {
		type: UPDATE_USER,
		payload: u
	}
}

export function findUserById(id) {
	return function (dispatch) {
		var res = us.findUserById(id);
		return res.then(response => {
			dispatch(findUserByIdHandler(response))
		}).catch(err => {
			console.log(err);
		})
	}
}

function findUserByIdHandler(u) {
	return {
		type: FIND_USER_BY_ID,
		payload: u
	}
}

export function searchUsers(key) {
	return function (dispatch) {
		var res = us.searchUsers(key);
		return res.then(response => {
			dispatch(searchUsersHandler(response));
		}).catch(err => {
			console.log(err);
		})
	}
}

function searchUsersHandler(u) {
	return {
		type: SEARCH_USER,
		payload: u
	}
}

export function findAllUsers() {
	return function (dispatch) {
		var res = us.findAllUsers();
		return res
			.then(response => {
				dispatch(findAllUsersHandler(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

function findAllUsersHandler(u) {
	return {
		type: FIND_ALL_USERS,
		payload: u
	};
}

export function deleteUser(userId) {
	return function (dispatch) {
		us.deleteUser(userId).then(result => {
			var res = us.findAllUsers();
			return res
				.then(response => {
					dispatch(findAllUsersHandler(response));
				})
				.catch(err => {
					console.log(err);
				});
		});
	};
}

export function adminUserUpdate(u) {
	return function (dispatch) {
		us.updateUser(u).then(result => {
			var res = us.findAllUsers();
			return res
				.then(response => {
					dispatch(findAllUsersHandler(response));
				})
				.catch(err => {
					console.log(err);
				});
		});
	}
}
