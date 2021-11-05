import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";


function Home() {
  const {currentUser, changeCurrentUserState} = useContext(CurrentUserContext)
  return (
    <div>
        {currentUser? <h1 className="display-3 my-5"> Welcome {currentUser.username.toUpperCase()} </h1>:<h1 className="display-1 my-5"> Welcome to Jobly </h1>}
    </div>
  );
}

export default Home;