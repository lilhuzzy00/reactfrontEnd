import React, {useState} from "react"
// import { Link } from "react-router-dom"
import Layout from "../core/Layout"
import {createCategory} from "./ApiAdmin"
import {isAuthenticated} from "../auth"



const AddCategory = () =>{

	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const {user, token} = isAuthenticated()

	const handleChange = e =>{
		setError("")
		setName(e.target.value)
	}

	const clickSubmit = e =>{
		e.preventDefault()
		setError("")
		setSuccess(false)
		// Make request to API to create category
		createCategory(user._id, token, {name})
			.then(data =>{
				if(data.error){
					setError(true)
				}else{
					setError("")
					setSuccess(true)
				}

			})

	}

	

	const newCategoryForm = () =>(
		<form onSubmit={clickSubmit} >
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input type="text" onChange={handleChange} className="form-control" value={name} autoFocus required />
			</div>
			<button type="submit" className="btn btn-outline-primary" style={{marginTop: "18px"}}>Create Category</button>
		</form>
	)

	const categoryTitle = () =>{
		return <div style={{color: "#0275d8", marginTop: "30px", marginBottom: "20px"}}><h3>Add A New Category</h3></div>
	}
	
	const showSuccess = () =>{
		if(success){
			return <div><h6 className="alert alert-info">Category was successfully created</h6></div>
		}
	}

	const showErrors = () =>{
		if(error){
			return <div><h6 className="alert alert-danger">{name} category should be unique</h6></div>
		}
	}

	return(
		<Layout 
			title="Category Page" 
			description="Create Category"
			className="container col-md-4 offset-md-4"
		>
		<div style={{ background: "#f7f7f7", padding: "40px", borderRadius: "7px"}}>
		{showSuccess()}
		{showErrors()}
		{categoryTitle()}
		{newCategoryForm()}
		</div>
		</Layout>

	)
}

export default AddCategory