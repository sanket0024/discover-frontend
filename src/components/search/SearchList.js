import React from 'react'
import SearchListItem from "./SearchListItem";
import Navbar from "../navbar/navbar";
import "./SearchList.css"
import NavbarContainer from '../../containers/navbar/navbar-container';
import { Link } from "react-router-dom";

class SearchList extends React.Component {
	constructor(props) {
		super(props)
		this.keyword = props.match.params.keyword
		this.country = props.match.params.country
		this.state = {
			keyword: this.keyword
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (this.keyword !== nextProps.match.params.keyword) {

			this.searchEvents()
		} else {

		}
	}

	componentDidMount() {
		this.searchEvents()
	}

	searchEvents = () => {
		this.props.searchEvents(this.keyword, this.country)

	}

	keyWordChange = (event) => {
		this.setState(
			{
				keyword: event.target.value
			});
	}

	render() {
		return (
			<div className="search-bg">
				<div>
					<NavbarContainer></NavbarContainer>
				</div>
				<div className="row m-5 pt-5">
					<input className="eds-field-styled__input" onChange={this.keyWordChange} placeholder={this.keyword}></input>
					<Link className="btn btn-custom p-2" to={`/classification/${this.state.keyword}`}>Search</Link>
				</div>
				{Object.keys(this.props.searchResults).length !== 0 && <div className="container-fluid" style={this.props.searchResults.length > 1 ? {} : { display: 'None' }} >
					{this.props.searchResults.map(event => event.name !== undefined ? <SearchListItem event={event} key={event.id} id={event.id} /> : null)}
				</div>}
				{Object.keys(this.props.searchResults).length === 0 &&
					<div>
						<span className="m-5 search-item-text">
							It is not you, it is not us.
							It is the third party api. Which went crazy on the 20th.
							Please reload.
						</span>
					</div>
				}
			</div>
		)
	}
}



export default SearchList;
