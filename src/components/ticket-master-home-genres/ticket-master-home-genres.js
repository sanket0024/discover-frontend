import React, { Component } from 'react';
import "./ticket-master-home-genres.css";
import { Link } from "react-router-dom";

class TicketMasterHomeGenres extends Component {

	constructor(props) {
		super(props);
		this.addGenres = this.addGenres.bind(this);
	}

	addGenres() {
		const genres = this.props.genres;
		const genresRender = [];
		for (const i in genres) {
			if (genres[i].id !== undefined) {
				genresRender.push(
					<Link key={genres[i].id} to={`/classification/${genres[i].name}`} >
						<img src={require("../../static/" + genres[i].name + ".jpg")} alt={genres[i].name}></img>
						<div className="centered">{genres[i].name}</div>
					</Link>);
			}
		}
		return genresRender;
	}

	render() {
		return (
			<div className="container-fluid genres-section">
				<div><h1>Popular categories to explore</h1></div>
				<div className="row">
					{this.addGenres()}
				</div>
				<br></br>
				<br></br>
			</div>
		);
	}
}

export default TicketMasterHomeGenres;
