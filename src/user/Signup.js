import React, {useState} from "react"
import { Link, Redirect } from "react-router-dom"
import Layout from "../core/Layout"
import { signup } from "../auth"
import { helmet } from "react-helmet"


const Signup = () =>{

	const [values, setValues] = useState({
			name: "",
			email: "",
			password: "",
			error: "",
			success: false
	})

		 const { name, email, password, success, error } = values;


		const handleChange = Name => event => {
			setValues({...values, error: false, [Name]: event.target.value})
		}

		

		 const clickSubmit = event =>{
		 	event.preventDefault()
		 	setValues({...values, error: false})
			signup({name, email, password})
				.then(data =>{
					if(data.error){
						setValues({...values, error: data.error, success: false})
					} else {
						setValues({
						...values, 
						name:"",
						email:"",
						password:"",
						error: "",
						success: true 
					})
					}
				})
	 	}

	 		

	const signUpForm = () =>(

		<form style={{margin: "20px", backgroundColor:"black", padding: "20px", borderRadius: "7px"}}>
			<div className="text-center mb-3" style={{color: "white", fontSize: "20px"}}><strong>Signup Form</strong></div>
				  <div className="mb-3">
					    <label className="form-label" style={{color: "white"}}>Name</label>
					    <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
				  </div>

				  <div className="mb-3">
					    <label className="form-label" style={{color: "white"}}>Email</label>
					    <input onChange={handleChange("email")} type="email" className="form-control" value={email} />
				  </div>

				  <div className="mb-3">
					    <label className="form-label" style={{color: "white"}}>Password</label>
					    <input onChange={handleChange("password")} type="password" className="form-control"  value={password}/>
				  </div>

				  <button onClick={clickSubmit} type="submit" className="btn btn-primary">Submit</button>
		</form>


	);

	const showSuccess = () =>(
	 	<div className="alert alert-info" style={{display: success ? "" : "none" }}><h5>Signup successful. Please <Link to="/signin">Signin</Link></h5></div>
	)

	const showError = () =>(
	 	<div className="alert alert-danger" style={{display: error ? "" : "none" }} >{ error }</div>
	)

	const redirectUser = (success) => {
		if(success){
			return <Redirect to="/signin" />
		}
	}


	return(
		<Layout 
			title="Signup page" 
			description="Signup to node js app"
			className="container col-md-4 offset-md-4"
		>
			<helmet>
				<title>Signup</title>
				<meta 
					name="description"
					content="Please Sign up to continue"  
				/>

				<meta 
					name="keywords"
					content="Signup to get access to amazing deals"  
				/>
			</helmet>
			{showSuccess()}
			{showError()}
			{signUpForm()}
			{redirectUser(success)}
		</Layout>
	)

}


export default Signup