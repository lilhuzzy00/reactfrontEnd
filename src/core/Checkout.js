import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import { braintreeClientToken, processPayment, createOrder } from "./ApiCore";
import {emptyCart} from "./CartHelper";
import Card from "./Card";
import { isAuthenticated } from "../auth" ;
import DropIn from "braintree-web-drop-in-react";
import "./Checkout.css";


const Checkout = ({ products }) => {

	const [data, setData] = useState({
		success: false,
		loading: false,
		error: "",
		clientToken: null,
		instance: {},
		address: ""
	})

const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;

const getToken = (userId, token) => {
	braintreeClientToken(userId, token)
		.then(data => {
			if(data.error){
				setData({...data, error: data.error})
			} else {
				setData({clientToken: data.clientToken})
			}
		})
}

useEffect(()=>{
	getToken(userId, token);
}, [])

const handleAddress = (event) => {
	setData({...data, address: event.target.value})
}

	
const getTotal = () => {
	return products.reduce((currentValue, nextValue)=>{
		return currentValue + nextValue.count * nextValue.price
	}, 0)
}

const showCheckout = () =>(
	isAuthenticated() ? <div>{showDropIn()}</div> : <Link to="/signin">Signin</Link>
)

let deliveryAddress = data.address;

const buy = () => {
	setData({loading: true});
	// Send nonce to your server
	//nonce = data.instance.requestPaymentMethod()

	let nonce;
	var getNonce = data.instance.requestPaymentMethod()
		.then(data =>{
			// console.log(data)
			nonce = data.nonce
			// once you have nonce (card type, card number), send nonce as paymentMethodNonce to the backend
			// Also send total to be charged
			// console.log(
			// 	"send nonce and total to process", 
			// 	nonce, 
			// 	getTotal(products)
			// )

			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getTotal(products)
			}
			processPayment(userId, token, paymentData)
				.then(response => {
					console.log(response);

					const createOrderData = {
						products: products,
						transaction_id: response.transaction.id,
						amount: response.transaction.amount,
						address: deliveryAddress
					}

					createOrder(userId, token, createOrderData)
						.then(response => {

							//Empty Cart

							emptyCart(()=>{
								console.log("Payment success and empty cart")
								setData({loading: false, success: true});
							})
						})
					
				})
				.catch((error) => {
					setData({loading: false});
				})

		})
		.catch(error => {
			console.log("dropIn error", error)
			setData({...data, error: error.message})
		})
}

const showError = (error) => (
	<div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error}</div>
)

const showSuccess = (success) => (
	<div 
		className="alert alert-info" 
		style={{display: success ? "" : "none"}}
	>
		Thank you! Your Payment was successful
	</div>
)

const showLoading = (loading) =>(
	loading && (
		<div className="alert alert-info">Loading...</div>
	)
)

const showDropIn = () => (
		<div className="firstshowDropIn" onBlur={()=> setData({...data, error: ""})}>
			{data.clientToken !== null && products.length > 0 ? (
				<div className="showDropIn">
					<div className="form-group mb-3">
						<label className="text-muted">Delivery Address:</label>
						<textarea className="form-control textArea" 
							onChange={handleAddress} 
							value={data.address}
							placeholder="Please Enter Your Address" 
							style={{width: "700px"}}
						/>
					</div>
					
						<DropIn 
							options={{
								authorization: data.clientToken,
								paypal: {
									flow: "vault"
								}
							}}
							onInstance={(instance) => (data.instance = instance)}
						/>
						<button onClick={buy} style={{width: "150px", marginBottom: "10px"}} className="btn btn-success btn-block">Pay</button>
				</div>
			) : null }
		</div>
)

	return (
		<div>
			<div><h3 style={{color: "black"}}>Total: ₦{getTotal()}</h3></div>
			{showLoading(data.loading)}
			{showSuccess(data.success)}
			{showError(data.error)}
			{showCheckout()}
		</div>
	)
}


export default Checkout;