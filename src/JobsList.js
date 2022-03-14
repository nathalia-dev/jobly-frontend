import React, {useState, useEffect, useContext} from "react";
import { Redirect } from "react-router-dom"
import JoblyApi from "./api"
import useFields from "./hooks/useFields";
import JobCard from "./JobCard";
import CurrentUserContext from "./CurrentUserContext";


function JobsList() {
  const [jobs, setJobs] = useState([])
  const [formData, handleChange, resetFormData] = useFields({title: ""})
  const currentUser = useContext(CurrentUserContext);


  async function fetchData(formData) {
    setJobs(await JoblyApi.getJobs(formData))
  }


  useEffect (() => {
    fetchData(formData)
  }, [])

  async function handleSubmit (e) {
    e.preventDefault();
    resetFormData()
    fetchData(formData)

  }

  function isUserLoggedIn() {
    return (
    
      <div>
        <div className="container mt-3">
          <form onSubmit = {handleSubmit}>
            <input type="text" name="title" placeholder="Search a job" value={formData.title} onChange={handleChange} className="form-control"></input>
            <button className="btn btn-primary m-3">Search</button>
          </form>
        </div>
          {jobs.map((job) => (
            <JobCard job={job}/>
          ))}
      </div>
    );
  }

  return (
    
    <div>
      {currentUser? isUserLoggedIn(): <Redirect to="/"/>}
    </div>
  );
}

export default JobsList;