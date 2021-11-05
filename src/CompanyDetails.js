import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom"
import JoblyApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import JobCard from "./JobCard";

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState([])
  const [jobs, setJobs] = useState([])
  const currentUser = useContext(CurrentUserContext)

  useEffect (() => {
    async function fetchData() {
      setCompany(await JoblyApi.getCompany(handle))
      setJobs(await JoblyApi.getJobs({title: ""}))
    }
    fetchData()
  }, [])

  function userIsLoggedIn() {
    return (
      <div>
          <h1> {company.name} </h1>
          <p> {company.description} </p>
          {jobs.map((job) => {
            if(job.companyHandle === company.handle) {
              return <JobCard job={job}/>
            }
})}
      </div>
    );
  }

  return (
    <div>
          {currentUser ? userIsLoggedIn() : <Redirect to="/"/> }
    </div>

  )
    

}

export default CompanyDetails;