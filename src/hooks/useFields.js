import React, { useState } from "react";

/* A custom hook created to facilited the React Form process.*/ 

const useFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        const { value, name } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const resetFormData = () => {
        setFormData(initialState)
    }

    return [formData, handleChange, resetFormData]
}

export default useFields