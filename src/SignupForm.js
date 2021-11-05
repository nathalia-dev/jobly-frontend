import React from "react";
import useFields from "./hooks/useFields"
import { useHistory } from "react-router-dom";


function SignupForm({signUp}) {
  const INITIAL_STATE = {username: "", password: "", firstName: "", lastName: "", email:""}
  const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const resApi = await signUp(formData)
    if (resApi !== undefined) {
      alert(resApi.error)
    } else {
      resetFormData()
      history.push("/")
    }
  }


  return (
    <div className="container mt-3">
        <h1 className="display-5 my-3"> Sign In </h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleChange} className="form-control my-1"></input>
          <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} className="form-control my-1"></input>
          <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} className="form-control my-1"></input>
          <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} className="form-control my-1"></input>
          <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="form-control my-1"></input>
          <button className="btn btn-primary my-3">Sign Up</button>
        </form>
    </div>

  );
}

export default SignupForm;