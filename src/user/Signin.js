import React, {useState} from "react"
import { Redirect } from "react-router-dom"
import Layout from "../core/Layout"
import { signin, authenticate, isAuthenticated } from "../auth"
import { helmet } from "react-helmet"

const Signin = () =>{
	

	const [values, setValues] = useState({
			email: "",
			password: "",
			error: "",
			loading: false,
			redirectToReferrer: false
	})

		 const { email, password, error, loading, redirectToReferrer } = values;
		 const {user} = isAuthenticated();


		const handleChange = Name => event => {
			setValues({...values, error: false, [Name]: event.target.value})
		}
		

		const clickSubmit = event =>{
		 	event.preventDefault()
		 	setValues({...values, error: false, loading: true})
			signin({ email, password })
				.then(data =>{
					if(data.error){
						setValues({...values, error: data.error, loading: false })
					} else {
						authenticate(data, ()=>{
							setValues({
								...values, 
								redirectToReferrer: true
							})
						})
					}
				})
	 	}

	 		

	const signUpForm = () =>(

		<form style={{margin: "20px", backgroundColor:"black", padding: "20px", borderRadius: "7px"}}>
				
				<div className="text-center mb-3" style={{color: "white", fontSize: "20px"}}><strong>Signin Form</strong></div>
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

	const showError = () =>(
	 	<div className="alert alert-danger" style={{display: error ? "" : "none" }}>{error}</div>
	)

	const showLoading = () =>(
	 	loading && (<div className="alert alert-info"><strong>Loading...</strong></div>)
	)

	const redirectUser = () =>{
		if(redirectToReferrer){
			if(user && user.role === 1){
				return <Redirect to="/admin/dashboard" />
			} else{
				return <Redirect to="/user/dashboard" />
			}
		}
	}


	return(
		<Layout 
			title="Signin page" 
			description="Signin to node js app"
			className="container col-md-4 offset-md-4"
		>
			<helmet>
				<title>Signin</title>
				<meta 
					name="description"
					content="Please Sign in to continue"  
				/>

				<meta 
					name="keywords"
					content="Signin to ecommerce site, buy products"  
				/>
			</helmet>
			{redirectUser()}
			{showLoading()}
			{showError()}
			{signUpForm()}
		</Layout>
	)

}


export default Signin