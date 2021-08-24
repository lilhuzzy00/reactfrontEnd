import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {getProducts, getProduct, deleteProduct} from "./ApiAdmin";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const {user, token} = isAuthenticated();

	const loadProducts = () =>{
		getProducts()
			.then(data =>{
				if(data.error){
					console.log(data.error)
				} else {
					setProducts(data)
				}
			})
	}

	const destroy = (productId) => {
		deleteProduct(productId, user._id, token)
			.then(data =>{
				if(data.error){
					console.log(data.error)
				} else {
					loadProducts()
				}
			})
	}

	useEffect(()=>{
		loadProducts()
	}, [])


	return(
		<Layout title="Homepage" description="Node js Ecommerce App">
			<div className="row">
				<div className="col-12">
					<ul className="list-group">
						<h2 className="text-center" style={{color: "white"}}>You have a total {products.length} items </h2>
						{products.map((p, i)=>(
							<li key={i} className="list-group-item d-flex justify-content-between align-items-center">
								<strong>{p.name}</strong>
								<Link to={`/admin/product/update/${p._id}`}>
									<span className="badge badge-warning badge-pill" style={{color: "black"}}>Update</span>
								</Link>
								<span 
									onClick={()=> destroy(p._id)}
									className="badge badge-danger badge-pill" style={{color: "red"}}
								>
									Delete
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>

	)
}

export default ManageProducts