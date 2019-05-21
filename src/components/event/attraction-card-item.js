import React from 'react'

const AttractionCardItem = ({ attraction }) =>
	<div className="col-sm-12 col-lg-2 col-md-4 p-1 my-1 text-truncate border shadow-sm rounded">
		<div className="card m-0 p-0">
			<img className="card-img-top img-fluid" src={attraction.images[0].url} alt="Card image cap" />
			<div className="card-body">
				<h5 className="card-title">{attraction.name}</h5>
			</div>
			<div className="card-footer">
				<small className="text-muted">Last updated 3 mins ago</small>
			</div>
		</div>
	</div>

export default AttractionCardItem
