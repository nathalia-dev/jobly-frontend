import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import JoblyApi from "./api";

function JobCard({ job }) {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [applied, setApplied] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function hasUserAppliedForThisJob() {
		if (currentUser.applications.indexOf(job.id) !== -1) {
			setApplied(true);
		} else {
			setApplied(false);
		}
	}

	useEffect(() => {
		hasUserAppliedForThisJob();
	}, [hasUserAppliedForThisJob]);

	async function applyForJob() {

		const res = await JoblyApi.userApplyForJob(currentUser.username, job.id);
		setCurrentUser(await JoblyApi.getUser(currentUser.username));

	}

	return (
		<div className="d-flex justify-content-center">
			<div className="card m-3" style={{ width: "35rem" }}>
				<div className="card-body">
					<h3 className="card-title">{job.title}</h3>
					<h5 className="card-text">{job.companyName}</h5>
					<p className="card-text">Salary: {job.salary}</p>
					<p className="card-text">Equity: {job.equity}</p>

					{applied ? (
						<button className="btn btn-danger">APPLIED</button>
					) : (
						<button onClick={applyForJob} className="btn btn-outline-danger">
							APPLY
						</button>
					)}

				</div>
			</div>
		</div>
	);
}

export default JobCard;
