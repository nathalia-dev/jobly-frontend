import React, {useContext} from "react";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";
import JoblyApi from "./api"
import { Redirect, useHistory } from "react-router";


function ProfileForm() {

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
  const [formData, handleChange, resetFormData] = useFields({firstName: currentUser? currentUser.firstName : "" , lastName: currentUser? currentUser.lastName : "" , email: currentUser? currentUser.email : "" })
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await JoblyApi.updateUser(formData, currentUser.username);
    if (Array.isArray(res)) {
      alert("Please, do not leave any field blank.")
    } else {
      setCurrentUser(await JoblyApi.getUser(currentUser.username));
      resetFormData();
      history.push("/")
    }
  }

  function userIsLoggedIn() {

    return (
      <div className="container">
        <h1 className="display-5 my-3"> Edit Your Profile </h1>
        <form onSubmit={handleSubmit}>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label"> Username </label>
            <div class="col-sm-10">
              <p className="form-control" id="profile-username"> <strong>{currentUser.username}</strong></p>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="firstName" className="col-sm-2 col-form-label"> First Name </label>
            <div class="col-sm-10">
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control"></input>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
            <div class="col-sm-10">
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control"></input>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control"></input>
            </div>
          </div>

          <button className="btn btn-primary my-3"> SAVE </button>

        </form>
      </div>

    )
  }

  return (
    <div>
        {currentUser? userIsLoggedIn() : <Redirect to="/"/>}
    </div>
  );
}

export default ProfileForm;