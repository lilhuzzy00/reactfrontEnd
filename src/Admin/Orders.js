import React, {useState, useEffect} from "react"
import Layout from "../core/Layout"
import {isAuthenticated} from "../auth"
import { listOrders, getStatusValues, updateOrderStatus } from "./ApiAdmin"
import moment from "moment"

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);

	const {user, token} = isAuthenticated()

	const loadOrders = () => {
		listOrders(user._id, token).then(data =>{
			if(data.error){
				console.log(data.error);
			} else {
				setOrders(data)
			}
		})
	}

	useEffect(()=>{
		loadOrders()
	},[]);


const loadStatusValues = () => {
		getStatusValues(user._id, token).then(data =>{
			if(data.error){
				console.log(data.error);
			} else {
				setStatusValues(data)
			}
		})
	}

	useEffect(()=>{
		loadOrders()
		loadStatusValues()
	},[]);




	const showOrdersLength = () => {
		if(orders.length > 0){
			return <h1 className="text-danger display-2">Total order is: {orders.length}</h1>
		} else {
			return <h1 className="text-danger">No orders found</h1>
		}

	}

	const showInput = (key, value) =>(
		<div className="input-group mb-2 mr-sm-2">
			<div className="input-group-prepend">
				<div className="input-group-text">{key}</div>
			</div>
			<input type="text" value={value} className="form-control" readOnly />
		</div>
	)

	const handlesStatusChange = (e, orderId) => {
		updateOrderStatus(user._id, token, orderId, e.target.value)
			.then(data=> {
				if(data.error){
					console.log("status update failed")
				} else{
					loadOrders();
				}
			})
	}

	const showStatus = (o) =>(
		<div className="form-control">
			<h3 className="mark mb-4">Status: {o.status}</h3>
			<select className="form-control" onChange={e=> handlesStatusChange(e, o._id)}>
				<option>Status Update</option>
				{statusValues.map((status, index)=>(
					<option key={index} value={status}>{status}</option>
				))}
			</select>
		</div>
	)

	return(
		<Layout>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showOrdersLength()}
					{orders.map((o, oIndex)=>(
						<div key={oIndex} className="mt-5" style={{borderBottom: "1px solid white"}}>
							<h2 className="mb-5" style={{color: "white"}}>
								<span className="bg-primary">
									Order ID: {o._id}
								</span>
							</h2>
							<ul className="list-group mb-2">
								<li className="list-group-item">
									{showStatus(o)}
								</li>
								<li className="list-group-item">
									<strong>Transaction:</strong> {o.transaction_id}
								</li>
								<li className="list-group-item">
									<strong>Amount: </strong> ₦{o.amount}
								</li>
								<li className="list-group-item">
									<strong>Ordered By:</strong> {o.user.name}
								</li>
								<li className="list-group-item">
									<strong>Ordered Date:</strong> {moment(o.createdAt).fromNow()}
								</li>
								<li className="list-group-item">
									<strong>Delivery Address:</strong> {o.address}
								</li>
								
							</ul>
							<h2 style={{color: "white"}}>Total number of products Order are: {o.products.length}</h2>
							{o.products.map((p, pIndex)=>(
								<div className="mb-4" style={{padding: "20px", border: "2px solid white"}} key={pIndex}>
									{showInput("Product name", p.name)}
									{showInput("Product name", p.price)}
									{showInput("Product name", p.count)}
									{showInput("Product name", p._id)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</Layout>
	)


}


export default Orders;