import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getEventDetail, getLocalEventDetail, likeEvent, purchaseEvent, hostEvent} from "../../actions/actions";
import EventDetail from "../../components/event/event-detail";

const stateToPropertyMapper = state => {
    return {
        eventDetail: state.eventDetailReducer.eventDetail,
        localEventDetail: state.eventDetailReducer.localEventDetail,
        user: state.userReducer.loggedInUser
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getEventDetail,
        getLocalEventDetail,
        likeEvent,
        purchaseEvent,
        hostEvent
    }, dispatch);
}

const EventDetailContainer = connect(
    stateToPropertyMapper,
    matchDispatchToProps
)(EventDetail);

export default EventDetailContainer;
