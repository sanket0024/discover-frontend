import React, { Component } from "react";

export default class row extends Component {
	render() {
		return (
			<tr className="wbdv-template wbdv-hidden">
				<td scope="row" className="wbdv-username">
					{this.props.user.username}
				</td>
				<td className="wbdv-password">{this.props.user.password}</td>
				<td className="wbdv-first-name">{this.props.user.firstName}</td>
				<td className="wbdv-last-name">{this.props.user.lastName}</td>
				<td>
					<select className="wbdv-role" value={this.props.user.role} disabled>
						<option value="admin">Admin</option>
						<option value="explorer">Explorer</option>
						<option value="host">Host</option>
					</select>
				</td>
				<td className="wbdv-actions">
					<div className="d-flex flex-row">
						&nbsp;
            <button
							type="button"
							className="wbdv-remove-user-button btn btn-default btn-sm"
							onClick={this.props.deleteUser.bind(this, this.props.user.userid)}
						>
							<i className="fas fa-trash-alt" />
						</button>
						&nbsp;
            {this.props.user.role !== "admin" &&
							<button
								type="button"
								className="wbdv-edit-user-button btn btn-default btn-sm"
								onClick={this.props.editUser.bind(this, this.props.user)}
							>
								<i className="fas fa-pencil-alt" />
							</button>
						}
					</div>
				</td>
			</tr>
		);
	}
}
