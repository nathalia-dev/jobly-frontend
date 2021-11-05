import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import CompaniesList from "./CompaniesList";
import CompanyDetails from "./CompanyDetails";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";

function Routes({login, signUp}){
    return (
        <Switch>
        <Route exact path="/">
            <Home />
        </Route>

        <Route exact path="/companies">
            <CompaniesList />
        </Route>

        <Route path="/companies/:handle">
            <CompanyDetails />
        </Route>

        <Route exact path="/jobs">
            <JobsList />
        </Route>

        <Route exact path="/login">
            <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
            <SignupForm signUp={signUp}/>
        </Route>

        <Route exact path="/profile">
            <ProfileForm />
        </Route>

        <Route>
            <p> PAGE NOT FOUND </p>
        </Route>
    </Switch>
    )
}

export default Routes;