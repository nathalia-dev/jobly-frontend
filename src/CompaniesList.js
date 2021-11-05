import React, {useEffect, useState, useContext} from "react";
import { Redirect } from "react-router-dom"
import JoblyApi from "./api"
import CompanyCard from "./CompanyCard";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";

function CompaniesList() {
  const [companies, setCompanies] = useState([])
  const [formData, handleChange, resetFormData] = useFields({name: ""})
  const currentUser = useContext(CurrentUserContext)
  
  async function fetchData(formData) {
    setCompanies(await JoblyApi.getCompanies(formData))
  }

  useEffect (() => {
    fetchData(formData)
  }, [])
  

  function handleSubmit (e) {
    e.preventDefault();
    resetFormData()
    fetchData(formData)
  }

  function userIsLoggedIn() {
    return (
    
      <div>
        <div className="container my-3">
          <form onSubmit = {handleSubmit}>
            <input type="text" name="name" placeholder="Search a company" value={formData.name} onChange={handleChange} className="form-control"></input>
            <button className="btn btn-primary my-3">Search</button>
          </form>
        </div>

          {companies.map((company) => (
            <CompanyCard company={company}/>
    ))}
      </div>
    );
  }

  return (
    <div>
      {currentUser? userIsLoggedIn() : <Redirect to="/"/> }
    </div>
  );
}

export default CompaniesList;