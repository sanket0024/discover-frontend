import React, { Component } from 'react';
import "./ticket-master-home-events.css";
import {Link} from "react-router-dom";

class TicketMasterHomeEvents extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div>
					<span className="random-text1">&nbsp; Live</span>
					<span className="random-text2">&nbsp; Love</span>
					<span className="random-text3">&nbsp; Laugh</span>
					<span className="random-text4">&nbsp; and</span>
					<span className="random-text5">&nbsp; Explore</span>
				</div>
				<br></br>
				<br></br>
				<div className="card-deck">
					{
						this.props.events.events.slice(0, 4).map(event =>
							<Link className="card" key={event.id} to={`/details/${event.id}`}>
								<img className="card-img-top" src={event.images[0].url} alt="Card cap"></img>
								<div className="card-body">
									<h5 className="card-title">{event.name}</h5>
								</div>
								<div className="card-footer">
									<div>
										{event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}, {event._embedded.venues[0].country.countryCode}
									</div>
									<div>
										{event.dates.start.localDate}
									</div>
								</div>
							</Link>
						)
					}
				</div>
				<div className="card-deck mt-4">
					{
						this.props.events.events.slice(4, 8).map(event =>
							<Link className="card" key={event.id} to={`/details/${event.id}`}>
								<img className="card-img-top" src={event.images[0].url} alt="Card cap"></img>
								<div className="card-body">
									<h5 className="card-title">{event.name}</h5>
								</div>
								<div className="card-footer">
									<div>
										{event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}, {event._embedded.venues[0].country.countryCode}
									</div>
									<div>
										{event.dates.start.localDate}
									</div>
								</div>
							</Link>
						)
					}
				</div>
				<div className="card-deck mt-4">
					{
						this.props.events.events.slice(8, 12).map(event =>
							<Link className="card" key={event.id} to={`/details/${event.id}`}>
								<img className="card-img-top" src={event.images[0].url} alt="Card cap"></img>
								<div className="card-body">
									<h5 className="card-title">{event.name}</h5>
								</div>
								<div className="card-footer">
									<div>
										{event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}, {event._embedded.venues[0].country.countryCode}
									</div>
									<div>
										{event.dates.start.localDate}
									</div>
								</div>
							</Link>
						)
					}
				</div>
				<div className="card-deck mt-4">
					{
						this.props.events.events.slice(12, 16).map(event =>
							<Link className="card" key={event.id} to={`/details/${event.id}`}>
								<img className="card-img-top" src={event.images[0].url} alt="Card cap"></img>
								<div className="card-body">
									<h5 className="card-title">{event.name}</h5>
								</div>
								<div className="card-footer">
									<div>
										{event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}, {event._embedded.venues[0].country.countryCode}
									</div>
									<div>
										{event.dates.start.localDate}
									</div>
								</div>
							</Link>
						)
					}
				</div>
			</div>
		);
	}
}

export default TicketMasterHomeEvents;
