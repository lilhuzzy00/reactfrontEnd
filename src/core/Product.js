import React, {useState, useEffect} from "react";
import {read, listRelated} from "./ApiCore";
import Card from "./Card";
import "./Product.css";
import ShowPhoto from "./ShowPhoto";
import Layout from "./Layout"
import moment from "moment"


const Products = (props) => {

	const [product, setProduct] = useState({})
	const [related, setRelated] = useState([])
	const [error, setError] = useState(false)

	const singleProduct = productId =>{
		read(productId)
		.then(data =>{
			if(data.error){
				setError(data.error)
			} else{
				setProduct(data)
				listRelated(data._id)
					.then(data => {
						if(data.error){
							setError(data.error)
						} else {
							setRelated(data)
						}
					})
			}
		})
	} 

	useEffect(()=>{
		const productId = props.match.params.productId
		singleProduct(productId)
	}, [props])


	return(

		<Layout>
				<div className="singleProductPage" style={{backgroundColor: "white", paddingTop: "10px", paddingBottom: "110px"}} >
					<div className="imageRow">
						<ShowPhoto item={product} url="product" />
					</div>
					<div className="ProductDescription" style={{color: "white"}}>
						<p style={{color: "black"}}><h3>{product.name}</h3></p>
						<p style={{color: "black"}}>{product.description}</p>
						<p style={{color: "black"}}><strong>Category: {product.category && product.category.name}</strong></p>
						<hr />
						<p style={{color: "black"}}><i>{moment(product.createdAt).fromNow()}</i></p>
						
					</div>
				</div>
				

				<div className="related1"  style={{paddingBottom: "20px", paddingTop: "20px", backgroundColor: "white"}}>
							<h5 style={{textAlign: "center"}}>Related products</h5>
							<hr />
							<div className="related" style={{ paddingTop: "20px"}}>
								{related.map((p, i)=>(
									<Card key={i} product={p} />
								))}
							</div>
						
				</div>
		</Layout>
	)
}




export default Products