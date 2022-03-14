import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. It is possible to pass a filter by name. */

  static async getCompanies({name}){
    let res;

    if (name.length) {
      res = await this.request(`companies?name=${name}`)
    } else {
      res = await this.request(`companies`)
    }
    
    return res.companies

  }

   /** Get all jobs. It is possible to pass a filter by job title. */

  static async getJobs({title}) {
    let res;
    if (title.length) {
      res = await this.request(`jobs?title=${title}`)
    } else {
      res = await this.request(`jobs`)
    }

    return res.jobs
  }

   /** Post request to do the login */

  static async login(loginFormData) {
    try {
      let res = await this.request(`auth/token`, loginFormData, "post")
      return res.token
    } catch (e) {
      return e
    }

  }

   /** Post request to register a new user */

  static async signUp(signUpFormData) {
    try {
      let res = await this.request(`auth/register`, signUpFormData, "post")
      return res.token
    } catch (e) {
      return e
    }

  }

   /** Get an user by username . */

  static async getUser(username) {
    let res = await this.request(`users/${username}`)
    return res.user
  }


  /** Update the user profile . */

  static async updateUser(profileFormData, username) {
    try {
      let res =  await this.request(`users/${username}`, profileFormData, "patch")
      return res.user
    } catch (e) {
      return e
    }

  }

  /** Post request to apply for a job  */

  static async userApplyForJob (username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
    return res
  }

}

export default JoblyApi