import React from 'react'
import SearchListItem from "../search/SearchListItem.js";
import Navbar from "../navbar/navbar";
import "../search/SearchList.css"
import NavbarContainer from '../../containers/navbar/navbar-container';
import { Link } from "react-router-dom";

class ClassificationList extends React.Component {
	constructor(props) {
		super(props)
		this.keyword = props.match.params.keyword
		this.state = {
			keyword: this.keyword,
			country: "US"
		}
	}

	// componentWillReceiveProps(nextProps, nextContext) {
	// 	console.log(nextProps)
	// }

	componentDidMount() {
		this.searchEvents()
	}

	searchEvents = () => {
		this.props.searchClassifications(this.keyword)

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
					<Link className="btn btn-custom p-2" to={`/search/${this.state.keyword}/${this.state.country}`}>Search</Link>
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



export default ClassificationList;
