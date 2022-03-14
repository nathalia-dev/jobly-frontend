import React, {useState, useEffect } from "react";

/* A custom hook created to facilited the implemetation of local storage .*/ 

const useLocalStorageState = (key, defaultValue = null)=>  {
    const [state, setState] = useState(() => {
        let value = JSON.parse(window.localStorage.getItem(key)) || defaultValue
        return value
    })
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
}

export default useLocalStorageState;