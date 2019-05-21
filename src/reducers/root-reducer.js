import { combineReducers } from 'redux';
import eventReducer from "./event-reducer";
import userReducer from './user-reducer';
import searchReducer from "./search-reducer"
import eventDetailReducer from "./event-detail-reducer"
import classificationReducer from "./classification-reducer";
export default combineReducers({
	eventReducer,
	userReducer,
	searchReducer,
	eventDetailReducer,
	classificationReducer
});
