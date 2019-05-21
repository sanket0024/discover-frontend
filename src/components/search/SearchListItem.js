import React from 'react'
import "./SearchListItem.css"
import { Link } from "react-router-dom";
const SearchListItem = ({ event, id }) =>
	<Link className="row m-3 border-sm round shadow-sm p-2" to={`/details/${id}`}>
		<div className="col-lg-2 col-sm-0">
			<img className="img-search" src={event !== undefined ? event.images[0].url : event.name} alt="Card cap"></img>
		</div>
		<div className="col-lg-10 col-sm-12 search-content text-left">
			<div className="container-fluid search-item-heading ml-5">
				<div className="row search-item-heading">
					{event.name}
				</div>
				<div className="row search-item-text">
					{event.dates.start.localDate}
				</div>
				<div className="row search-item-text">
					{event._embedded.venues[0].name}
				</div>
				<div className="row search-item-text">
					{event._embedded.venues[0].city !== undefined ? event._embedded.venues[0].city.name : "CITY: N/A"}
				</div>
				<div className="row search-item-text">
					{event._embedded.venues[0].country === undefined ? "N/A" : event._embedded.venues[0].country.name}
				</div>
			</div>
		</div>
	</Link>


export default SearchListItem;
