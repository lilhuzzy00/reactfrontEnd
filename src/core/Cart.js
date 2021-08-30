import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom"
import Layout from "./Layout"
import Card from "./Card"
import { getCart, removeItem } from "./CartHelper"
import Checkout from "./Checkout"
import "./Card.css"
import "./Checkout.css"
import {Helmet} from "react-helmet";


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
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Checkout Page</title>
				<meta name="description" content="Pay for products bought here"/>
			</Helmet>
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
