import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom"
import ShowImage from "./ShowImage"
import "./Card.css"
import { addItem, updateItem, removeItem } from "./CartHelper"

	const Card = ({
		product, 
		showDisplayButton = true, 
		addToCartButton = true, 
		cartUpdate = false, 
		showRemoveProductButton = false,
		setRun = f => f,
		run = undefined 
	}) =>{

		const [redirect, setRedirect] = useState(false)
		const [count, setCount] = useState(product.count)


		const ShowViewButton = (showDisplayButton) =>(
			showDisplayButton && (
				<Link to={`/product/${product._id}`}>
					<button style={{width: "114px",  
						color: "white", 
						border: "none", 
						background: "gray",
						margin: "4px",
						borderRadius: "4px"
					}}>Read More</button>
				</Link>
			)
		)


		//This function removes cart button in the cart page from the card component.


		const cartButton = (addToCartButton) => {
			return(
				addToCartButton && (
				<button style={{width: "110px",  
						color: "#007185", 
						border: "none", 
						background: "none",
						margin: "4px",
						borderRadius: "4px"
					}} onClick={addToCart}>Shop Now ></button>
				) 
			)
			
		}

		//This function removes the increment/decrement button at the cart page in the home page but shows it in the add to cart page

		const handleChange = productId => event => {
			setRun(!run)
			setCount(event.target.value < 1 ? 1 : event.target.value)
			if(event.target.value >= 1){
				updateItem(productId, event.target.value)
			}
		}

		const showCartUpdate = (cartUpdate) => {
			return (
				cartUpdate && (
					<div>
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text">Qty</span>
							</div> 
								<span className="inputNumber"><input type="number" className="form-control" value={count} onChange={handleChange(product._id)} /></span>
						</div>
					</div>
				)
			)
		}

	


		const showRemoveButton = (showRemoveProductButton) => {
			return(
				showRemoveProductButton && (
				<button 
					style={{width: "140px", 
							borderRadius: "4px", 
							backgroundColor: "gray", 
							color: "white", 
							border: "none",  
							backgroundColor: "red"}} 
					onClick={() => {
						removeItem(product._id)
						setRun(!run)
					}}
				>
				Remove Product

				</button>
				) 
			)
			
		}

		const addToCart = () =>{
			addItem(product, ()=>{
				setRedirect(true)
			})
		}

		const shoudRedirect = redirect =>{
			if(redirect){
				return <Redirect to="/cart" />
			}
		}


		const showStock = (quantity) =>{
			return(
				quantity > 0 ? <span>In stock</span> : <span>Out of Stock</span>
			)
		}
		


		return(

				<div className="divTop2">
					<div className="marginDiv">
						<div className="imageDiv">
							{shoudRedirect(redirect)}
							<Link to={`/product/${product._id}`}><ShowImage item={product} url="product" /></Link>
						</div>

						<div style={{paddingLeft: "2px"}}>
					 		{product.name}
					 	</div>

					 	<div style={{paddingLeft: "2px"}} >
					 		<strong>₦{product.price}</strong>
					 	</div>

					 	{showCartUpdate(cartUpdate)}
					 	{showRemoveButton(showRemoveProductButton)}
					 	<div>
							<div className="buttons">
{/*					 			{ShowViewButton(showDisplayButton)}
*/}					 			{cartButton(addToCartButton)}
					 		</div>	
					 	</div>
					</div>
				</div>
		)
	}

export default Card

						