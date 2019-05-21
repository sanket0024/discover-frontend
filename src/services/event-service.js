import { BASEURL, APIKEY, BASEURL_LOCAL } from "../util/constants";

let _singleton;
class EventService {

	static getInstance() {
		if (_singleton === undefined) {
			_singleton = new EventService();
		}
		return _singleton;
	}

	fetchAllEvents = () => {
		let params = {
			method: "GET",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}
		return fetch(BASEURL + "/events.json?size=16&page=1&stateCode=MA&apikey=" + APIKEY, params)
			.then(res => {
				return res.json();
			})
	}

	searchEvents = (keyword, country) => {
		let params = {
			method: "GET",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}
		return fetch(BASEURL + "/events.json?keyword=" + keyword + "&countryCode=" + country + "&size=20&apikey=" + APIKEY, params)
			.then(res => {
				return res.json();
			}).catch(err => console.log("Errrrooorr ::" + err))
	}



	searchClassificationEvents = (keyword) => {
		let params = {
			method: "GET",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}
		return fetch(BASEURL + "/events.json?apikey=" + APIKEY + "&countryCode=US&classificationName=" + keyword, params)
			.then(res => {
				return res.json();
			}).catch(err => console.log("Errrrooorr ::" + err))
	}

	fetchAllGenres = () => {
		let p = new Promise((resolve, reject) => {
			resolve({
				"data": [{ "id": "KnvZfZ7vAde", "name": "Basketball" }, { "id": "KnvZfZ7v7l1", "name": "Theatre" }, { "id": "KnvZfZ7vAdI", "name": "Hockey" }, { "id": "KnvZfZ7vAeA", "name": "Rock" }, { "id": "KnvZfZ7vAv1", "name": "Hip-Hop" }, { "id": "KnvZfZ7vAeF", "name": "World" }, { "id": "KnvZfZ7vAJ6", "name": "Latin" }, { "id": "KnvZfZ7vAdE", "name": "Football" }, { "id": "KnvZfZ7vAev", "name": "Pop" }, { "id": "KnvZfZ7vA7d", "name": "Martial Arts" }, { "id": "KnvZfZ7vA7k", "name": "Motorsports" }, { "id": "KnvZfZ7vAvF", "name": "Dance" }, { "id": "KnvZfZ7vAeE", "name": "Festivals" }, { "id": "KnvZfZ7vAdv", "name": "Baseball" }],
				"status": 'SUCCESS'
			});
		});
		return p;
	}


	// get event details

	getEventDetail = (id) => {
		let params = {
			method: "GET",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}
		return fetch(BASEURL + "/events/" + id + "?apikey=" + APIKEY, params)
			.then(res => {
				return res.json();
			}).catch(err => console.log("Errrrooorr ::" + err))
	}


	getLocalEventDetail = (id) => {
		let params = {
			method: "GET",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}
		return fetch(BASEURL_LOCAL + "/event/" + id, params)
			.then(res => {
				return res.json();
			}).catch(err => console.log("Errrrooorr ::" + err))
	}


	updateEvent = (id, event) => {
		console.log(event)
		const params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"Content-Type": "application/json",
			},
			credentials: 'include',
			method: "PUT",
			body: JSON.stringify(event)
		};
		return fetch(BASEURL_LOCAL + "/api/event/" + id, params).then(res => res.json()).catch(err => console.log("Errrrooorr ::" + err))
	}

	//like event

	likeEvent = (tempEvent) => {
		const params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"Content-Type": "application/json",
			},
			credentials: 'include',
			method: "PUT",
			body: JSON.stringify(tempEvent)
		};
		return fetch(BASEURL_LOCAL + "/api/user/like", params).then(res => res.json()).catch(err => console.log("Errrrooorr ::" + err))
	}

	//purchase event

	purchaseEvent = (tempEvent) => {
		const params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"Content-Type": "application/json",
			},
			credentials: 'include',
			method: "PUT",
			body: JSON.stringify(tempEvent)
		};
		return fetch(BASEURL_LOCAL + "/api/user/purchase", params).then(res => res.json()).catch(err => console.log("Errrrooorr ::" + err))
	}

	//host event

	hostEvent = (tempEvent) => {
		const params = {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"Content-Type": "application/json",
			},
			credentials: 'include',
			method: "PUT",
			body: JSON.stringify(tempEvent)
		};
		return fetch(BASEURL_LOCAL + "/api/user/host", params).then(res => res.json()).catch(err => console.log("Errrrooorr ::" + err))
	}
}

export default EventService;
