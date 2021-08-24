import React, {useState, useEffect} from "react"
import {Redirect} from "react-router-dom"
import Layout from "../core/Layout"
import {isAuthenticated} from "../auth"
import {read, update, updateUser} from "./ApiUser"


const Profile = ({match}) => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false
	})

	const {token} = isAuthenticated();
	const {name, email, password, error, success} = values;

	const init = (userId) => {
		read(userId, token)
			.then(data => {
				if(data.error){
					setValues({...values, error: true})
				}else {
					setValues({...values, name: data.name, email: data.email})
				}
			})
	}

	useEffect(()=>{
		init(match.params.userId)
	}, [])

	const handleChange = name => e =>{
		setValues({...values, error: false, [name]: e.target.value})

	}

	const clickSubmit = (e) => {
		e.preventDefault();
		update(match.params.userId, token, {name, email, password})
			.then(data => {
				if(data.error){
					console.log(data.error);
				} else {
					updateUser(data, () => {
						setValues({
							...values, 
							name: data.name, 
							email: data.email, 
							success: true
						})
					})
				}
			})
	}

	const redirectUser = (success) => {
		if(success){
			return <Redirect to="/cart" />
		}
	}

	const profileUpdate = (name, email, password) => (
		<form style={{marginTop: "20px", marginBottom: "20px"}}>
				  <div className="form-group mb-3">
					    <label className="form-label" style={{color: "white"}}>Name</label>
					    <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
				  </div>

				  <div className="form-group mb-3">
					    <label className="form-label" style={{color: "white"}}>Email</label>
					    <input onChange={handleChange("email")} type="email" className="form-control" value={email} />
				  </div>

				  <div className="form-group mb-3">
					    <label className="form-label" style={{color: "white"}}>Password</label>
					    <input onChange={handleChange("password")} type="password" className="form-control"  value={password}/>
				  </div>

				  <button onClick={clickSubmit} type="submit" className="btn btn-primary">Submit</button>
		</form>

	)

		return (
			<Layout>
				<div className="row">
					<div className="col-4 offset-4">
						{profileUpdate(name, email, password)}
						{redirectUser(success)}
					</div>
				</div>
			</Layout>
		)
	
}



export default Profile;