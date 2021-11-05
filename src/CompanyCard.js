import React from "react";
import { NavLink } from "react-router-dom";

function CompanyCard({ company }) {
	return (
		<div className="d-flex justify-content-center">
			<div className="card m-3" style={{ width: "35rem" }}>
				<div className="card-body">
					<NavLink to={`companies/${company.handle}`}>
						<div>
							<h3 className="card-title">{company.name}</h3>
							<p className="card-text">{company.description}</p>
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default CompanyCard;
