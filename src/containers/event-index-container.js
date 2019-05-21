import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root-reducer';
import EventContainer from "./events/event-container";
import SearchList from "../components/search/SearchList";
import SearchContainer from "./search/search-container";
import SearchListItem from "../components/search/SearchListItem";
import EventDetail from "../components/event/event-detail";
import ProfileContainer from "./user/profile-container";
import EventDetailContainer from "./events/event-detail-container";
import AdminContainer from "../containers/user/admin-container";
import ClassificationContainer from "./search/classification-container";

const store = createStore(RootReducer, applyMiddleware(thunk));

class EventIndexContainer extends Component {

	render() {
		return (
			<Router>
				<Provider store={store}>
					<Route path="/" exact
						render={() =>
							<EventContainer />
						}
					/>
					<Route path="/search/:keyword/:country" exact
						component={SearchContainer} />
					<Route path="/classification/:keyword" exact
						component={ClassificationContainer} />
					<Route path="/user/:currentUserId/profile" exact
						component={ProfileContainer} />
					<Route path="/details/:id" exact
						component={EventDetailContainer} />
					<Route path="/admin" exact component={AdminContainer} />
				</Provider>

			</Router>
		)
	}
}

export default EventIndexContainer;
