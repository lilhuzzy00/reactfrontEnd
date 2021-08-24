import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom"
import Layout from "./Layout"
import Card from "./Card"
import { getCart, removeItem } from "./CartHelper"
import Checkout from "./Checkout"
import "./Card.css"
import "./Checkout.css"

const Cart = ()=> {
	const [items, setItem] = useState([])
	const [run, setRun] = useState(false)

	useEffect(()=>{
		setItem(getCart())
	}, [run])

	const getAllItemsInCart = items =>(
		<div>
			{items.map((product, i)=> (
				<
					Card key={i} 
					product={product} 
					addToCartButton={false} 
					cartUpdate={true} 
					showDisplayButton={false}
					showRemoveProductButton = {true}
					setRun={setRun}
					run={run} 
				/>
			))}
		</div>
	)

	const ItemNotFound = () => (
		<div className="alert alert-info"><h5> No item was found <Link to="/shop">Continue Shopping</Link> </h5></div>
	)

	return (
		<Layout>
			<helmet>
				<title>Checkout</title>
				<meta 
					name="description"
					content="Please Checkout Here"  
				/>

				<meta 
					name="keywords"
					content="Make payments for products here"  
				/>
			</helmet>

			<div className="cart">
				<div className="cartRow">
					<div style={{marginTop: "20px"}}>
						{items.length > 0 ? getAllItemsInCart(items) : ItemNotFound() }
					</div>

					<div className="cartRow2" style={{marginTop: "10px"}}>
						<Checkout products={items} />
					</div>
				</div>
			</div>
		</Layout>

	)
}



export default Cart
