import React from "react"
import Layout from "../core/Layout"
import {isAuthenticated} from "../auth"
import {Link} from "react-router-dom"

const AdminDashboard = () =>{

	const { user: { name, email, role } } = isAuthenticated()

	const adminInfo = () =>(
		<div className="card mb-5 mt-5 ">
			<h4 className="card-header">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">{name}</li>
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">{role === 1 ? "Admin" : "Registered User" }</li>
				</ul>
		</div>
	)

	const adminHistory = () =>(
		<div className="card mb-5">
			<h4 className="card-header">Admin History</h4>
				<ul className="list-group">
					<li className="list-group-item">History</li>
				</ul>
		</div>
	)

	const adminLink = () =>(
		<div className="card mb-5 mt-5">
			<h4 className="card-header">Admin Link</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/create/category" className="nav-link">Create Category</Link>
					</li>

					<li className="list-group-item">
						<Link to="/create/product" className="nav-link">Create Product</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/products" className="nav-link">Manage Products</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/orders" className="nav-link">View Orders</Link>
					</li>
				</ul>
		</div>
	)

	return(
		<Layout title={`Howdy ${name}`} Description="Admin Dashboard" className="container-fluid">

			<div className="row">
				<div className="col-md-3">
					{adminLink()}
				</div>

				<div className="col-md-9">
					{adminInfo()}
					{adminHistory()}
				</div>
			</div>

		</Layout>

	)
}

export default AdminDashboard