import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import "./ticket-master-home.css";
import TicketMasterHomeEvents from "../ticket-master-home-events/ticket-master-home-events";
import TicketMasterHomeGenres from "../ticket-master-home-genres/ticket-master-home-genres";
import { Link } from "react-router-dom";
import { Alert } from 'reactstrap';
import NavbarContainer from '../../containers/navbar/navbar-container';
import { isoCountries } from '../../util/constants.js'

class TicketMasterHome extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: "music",
			country: "US"
		}
		this.handleChange = this.handleChange.bind(this);
	}


	keyWordChange = (event) => {
		this.setState(
			{
				keyword: event.target.value
			});
	}

	componentDidMount() {
		this.props.findAllEvents();
		this.props.findAllGenres();
	}

	addCountryOption = () => {
		let countryOptions = []
		for (let k in isoCountries) {
			countryOptions.push(<option value={`${k}`} > {isoCountries[k]}</option >)
		}
		return countryOptions
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<div>
				<NavbarContainer></NavbarContainer>
				<div className="mb-4">
					<div className="images-and-search">
						<ul className="slideshow">
							<li><span></span></li>
							<li><span></span></li>
							<li><span></span></li>
							<li><span></span></li>
							<li><span></span></li>
						</ul>
						<div className="search-fourm container-fluid">
							<div className="search-fourm-content">
								<form className="search-form">
									<div className="container search-form-content">
										<div className="event-looking-for flex-looking-for-on form-item-padding row">
											<div className="col text-light search-labels">Looking For</div>
											<div className="col text-light search-labels">In</div>
										</div>
										<div className="event-looking-for flex-looking-for-on form-item-padding row">
											<input className="search-field col typeahead" type="text" placeholder="Events"
												onChange={this.keyWordChange}
											></input>
											<select
												className="search-field col typeahead ml-4 mt-3 form-control"
												value={this.state.country}
												onChange={this.handleChange}
												name="country">
												{
													this.addCountryOption()
												}
											</select>
											{/* <input className="search-field col typeahead ml-4" type="text" placeholder="City, Country"></input> */}
										</div>
										<div className="event-looking-for flex-looking-for-on form-item-padding row">
											<Link className="btn search-button" to={`/search/${this.state.keyword}/${this.state.country}`}>Search</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<div>
					{
						this.props.events !== undefined && this.props.events._embedded !== undefined ? (
							<TicketMasterHomeEvents
								events={this.props.events._embedded}>
							</TicketMasterHomeEvents>
						) : (
								<div></div>
							)
					}
				</div>
				<br></br>
				<br></br>
				<br></br>
				<div>
					<TicketMasterHomeGenres
						key={this.props.genres.length}
						genres={this.props.genres}>
					</TicketMasterHomeGenres>
				</div>
			</div>
		);
	}
}

export default TicketMasterHome;
