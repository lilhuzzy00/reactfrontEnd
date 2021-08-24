import React, {useState, useEffect} from "react"
// import { Link } from "react-router-dom"
import Layout from "../core/Layout"
import { createProduct, getCategories } from "./ApiAdmin"
import {isAuthenticated} from "../auth"
import "./product.css"

const AddProduct = () => {

	const {user, token} =isAuthenticated()

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		photo: "",
		loading: false,
		error: "",
		createdProduct: "",
		redirectToProfile: false,
		formData: ""
		
	})


	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		loading,
		error,
		createdProduct,
		redirectToProfile,
		formData

	} = values

	const init = () =>{
		getCategories().then(data => {
			if(data.error){
				setValues({...values, error: data.error})
			} else {
				setValues({...values, categories: data, formData: new FormData()})
			}
		})
	}

	useEffect(()=>{
		init()
	}, [])


	const handleChange = name => event => {
			const value = name === 'photo' ? event.target.files[0] : event.target.value
			formData.set(name, value)
			setValues({...values, [name]: value})
	}


	const clickSubmit = (event) =>{
		event.preventDefault()
		setValues({...values, error: "", loading: true})
		createProduct(user._id, token, formData)
			.then(data => {
				if(data.error){
					setValues({...values, error: data.error})
				} else {
					setValues({
						...values,
						name: "",
						description: "",
						price: "",
						quantity: "",
						photo: "",
						loading: false,
						createdProduct: data.name
					})
				}
			})

	}


	const newPostForm = () =>(

		<form className="mb-3" onSubmit={clickSubmit}>

			<h4>Add Photo</h4>
			<div className="form-group">
				<label className="btn btn-secondary ">
					<input type="file" onChange={handleChange('photo')} name="photo" accept="image/*" />
				</label>
			</div>

			<div className="form-group">
				<label className="text-muted mt-4 mb-2">Name</label>
				<input type="text" onChange={handleChange('name')} className="form-control" value={name} />
			</div>

			<div className="form-group">
				<label className="text-muted mt-4 mb-2">Description</label>
				<textarea style={{height: "140px"}} className="form-control" onChange={handleChange('description')} value={description} />
			</div>

			<div className="form-group">
				<label className="text-muted mt-4 mb-2">Price</label>
				<input type="number" onChange={handleChange('price')} className="form-control" value={price} />
			</div>

			<div className="form-group">
				<label className="text-muted mt-4 mb-2">Category</label>
				<select onChange={handleChange('category')} className="form-control">
					<option>Select Category</option>
					{categories && categories.map((c, i) => (
						<option key={i} value={c._id}>{c.name}</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label className="text-muted mt-4 mb-2">Shipping</label>
				<select onChange={handleChange('shipping')} className="form-control">
					<option>Please Select</option>
					<option value="0">No</option>
					<option value="1">Yes</option>
				</select>
			</div>

			<div className="form-group">
				<label className="text-muted mt-4 mb-2">Quantity</label>
				<input type="number" onChange={handleChange('quantity')} className="form-control" value={quantity} />
			</div>

			<button type="submit" className="btn btn-primary mt-4">Add Product</button>

		</form>

	)

	const showError = () =>(
		<div className="alert alert-danger" style={{display: error ? "" : "none" }} ><h5>{error}</h5></div>
	)

	const showSuccess = () =>(
		<div className="alert alert-info" style={{display: createdProduct ? "" : "none" }} ><h5>{`${createdProduct} is created`}</h5></div>
	)


	const ShowLoading = () => (
		loading && (
			<div className="alert alert-info">Loading...</div>
		)
	)
	

	return(
			<Layout 
				title="Signin page" 
				description="Signin to node js app"
				className="container col-md-8 offset-md-2"
			>
			<div className="mb-4 productCss">
				{ShowLoading()}
				{showSuccess()}
				{showError()}
				{newPostForm()}	
			</div>
		</Layout>
	)
}




export default AddProduct