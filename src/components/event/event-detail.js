import React from 'react'
import Navbar from "../navbar/navbar";
import "./event-detail.css"
import AttractionCardItem from "./attraction-card-item";
import NavbarContainer from '../../containers/navbar/navbar-container';

class EventDetail extends React.Component {
	constructor(props) {
		super(props)
		this.id = props.match.params.id
        this.state = {
            liked: false,
            hosted: false,
			purchase: false
        }
	}


	likeEvent = () => {
		if (this.props.user.username === undefined) {
			alert("Please log in to like events")
		}else {
			const tempLikeFlag = !this.state.liked
			this.setState({
				liked: tempLikeFlag,
				hosted: this.state.hosted
			})
			this.props.likeEvent(this.props.localEventDetail)
		}
    }

	purchaseEvent = () => {
		console.log(this.props.user)
		if (this.props.user.username === undefined) {
			alert("Please log in to purchase tickets")
		}else {
			const tempPurchaseFlag = true
			this.setState({
				liked : this.state.liked,
				hosted: this.state.hosted,
				purchase: tempPurchaseFlag
			}, () => this.props.purchaseEvent(this.props.localEventDetail))

		}
	}

	hostEvent = () => {
		if (this.props.user.username === undefined) {
			alert("Please log in to purchase tickets")
		}else {
			this.props.hostEvent(this.props.localEventDetail)
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.user !== undefined && nextProps.user.purchasedEvents !== undefined && !this.state.purchase) {
			const alreadyPurchased =  (nextProps.user.purchasedEvents.filter(
				event => event.originalId ===  this.props.match.params.id).length > 0)
			this.setState({
				liked : this.state.liked,
				hosted: this.state.hosted,
				purchase: alreadyPurchased
			})
		}
		if (nextProps.user !== undefined && nextProps.user.likedEvents !== undefined && !this.state.liked) {
			const alreadyLiked =  (nextProps.user.likedEvents.filter(
				event => event.originalId ===  this.props.match.params.id).length > 0)
			this.setState({
				liked : alreadyLiked,
				hosted: this.state.hosted,
				purchase: this.state.purchase
			})
		}
	}

	componentDidMount() {
		this.getEventDetail()
	}

	getEventDetail = () => {
		this.props.getEventDetail(this.id)
	}

	getLocalEventDetail = () => {
		console.log("Id ::" + this.id)
		this.props.getLocalEventDetail(this.id)
		console.log(this.props.localEventDetail)
	}

	render() {
		return (
			<div>
				<NavbarContainer></NavbarContainer>
				{this.props.eventDetail !== undefined && this.props.eventDetail.name !== undefined && <div className="container-fluid mt-5 pt-5">
					<div className="row">
						<div className="col-md-8">
							<img src={this.props.eventDetail.images[0].url}
								className="img-fluid">
							</img>
						</div>
						<div className="col-md-4 card rounded p-2">
							<div className="container-fluid m-3">
								<div className="row event-item-heading">
									{this.props.eventDetail.name !== undefined ? this.props.eventDetail.name : "Festval"}
								</div>
								<div className="row event-item-text mt-5">
									{this.props.eventDetail.dates.start.localDate}
								</div>
								<div className="row event-item-text mt-2">
									Promoter : {this.props.eventDetail.promoter !== undefined ? this.props.eventDetail.promoter.name : "Not Available"}
								</div>
								<div className="row event-item-text mt-2">
									{this.props.eventDetail._embedded.venues[0].name}
								</div>
								<div className="row event-item-text mt-2">
									{this.props.eventDetail._embedded.venues[0].country.name}
								</div>
								<div className="row event-item-text mt-2">
									Genre: {this.props.eventDetail.classifications[0].segment.name}
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 card rounded p-2">
                            <div className="row ml-2 mr-2 mb-2 align-items-center justify-content-between">
                                <div className="col-4">
									{!this.state.liked && <i className="btn fas fa-heart fa-2x" onClick={() => this.likeEvent()}></i>}
									{this.state.liked && <i className="btn fas fa-heart fa-2x heart-red"></i>}
									<span className="ml-2">Likes: {this.props.localEventDetail.totalLikes}</span>
								</div>
                                <div className="col-4">
									{!this.props.localEventDetail.hosted && <i className="btn btn-primary btn-block"  onClick={() => this.hostEvent()} >Host this Event</i>}
									{this.props.localEventDetail.hosted && <button className="btn btn-secondary btn-block" disabled>Not Available to Host</button>}
								</div>
                            </div>
						</div>
						<div className="col-md-4 card rounded p-2">
							{!this.state.purchase && <button className="btn btn-primary p-2 btn-block text-align-center"
							onClick={() => this.purchaseEvent()}>
								Purchase
                            </button>}
							{this.state.purchase && <button className="btn btn-secondary p-2 btn-block text-align-center"
															 disabled>
								Event Already Purchased
							</button>}
						</div>
					</div>
					<div className="row mt-2 card event-item-heading shadow-sm p-2">
						Attractions
                    </div>
					<div className="row ">
						<div className="card-deck m-3">
							{this.props.eventDetail._embedded.attractions.map(attraction => <AttractionCardItem attraction={attraction} key={attraction.id} />)}
						</div>
					</div>
				</div>}
				{(this.props.eventDetail === undefined || this.props.eventDetail.name === undefined) && <div className="mt-5 pt-5 container-fluid">
					<i className="event-item-text">
						It is not you, it is not us.
						It is the third party api. Which went crazy on the 20th.
						Please reload.
					</i>
				</div>}
			</div>
		)
	}
}

export default EventDetail;
