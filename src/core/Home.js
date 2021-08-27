import React,{useState, useEffect} from "react";
import Layout from "./Layout";
import {getProducts, productByCategory} from "./ApiCore";
import Card from "./Card";
import "./Card.css";

// import Searched from "./Search";


const Home = () =>{
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [gentShoes, setGentShoes] = useState([]);
	const [shirts, setShirts] = useState([]);
	const [trouser, setTrousers] = useState([]);
	// const [productsFromCategoryy, setProductsFromCategoryy] = useState([]);
	// const [productsBySell, setProductsBySell] = useState([]);
	const [error, setError] = useState(false);

		
	const loadProductsByArrival = () =>{
		getProducts("createdAt")
			.then(data =>{
				if(data.error){
					setError(data.error)
				}else{
					setProductsByArrival(data)
				}
			})
	}


	const loadProductsByShoes = () =>{
		productByCategory("611ecc9391e78c1d88b04ca4")
			.then(data =>{
				if(data.error){
					setError(data.error)
				}else{
					setGentShoes(data)
				}
			})
	}


	const loadShirts = () =>{
		productByCategory("611eccb091e78c1d88b04ca5")
			.then(data =>{
				if(data.error){
					setError(data.error)
				}else{
					setShirts(data)
				}
			})
	}

	const loadTrousers = () =>{
		productByCategory("611ecc6991e78c1d88b04ca3")
			.then(data =>{
				if(data.error){
					setError(data.error)
				}else{
					setTrousers(data)
				}
			})
	}

	// const loadProductsBySell = () =>{
	// 	getProducts("sold")
	// 		.then(data =>{
	// 			if(data.error){
	// 				setError(data.error)
	// 			}else{
	// 				setProductsBySell(data)
	// 			}
	// 		})
	// }


	useEffect(() =>{
		loadProductsByArrival()
		loadProductsByShoes()
		loadShirts()
		loadTrousers()
	}, [])


	return(
		<Layout title="Homepage" description="Node js Ecommerce App">

{/*				<Searched />
*/}				<div className="firstDiv" style={{backgroundColor: "white"}}>
				<div className="h4Div"><h4 style={{fontSize: "1.25rem", fontWeight: "bold", color: "white"}} >Best Seller</h4></div>
					<div>
						<div className="divTop">
							{productsByArrival.map((product, i)=>(
								<Card key={i} product={product} />
							))}
						</div>
					</div>	
				</div>


				<div className="firstDiv" style={{backgroundColor: "white"}}>
				<div className="h4Div"><h4 style={{fontSize: "1.25rem", fontWeight: "bold", color: "white"}} >Ladies & Gent Shoes</h4></div>
					<div>
						<div className="divTop">
							{gentShoes.map((product, i)=>(
								<Card key={i} product={product} />
							))}
						</div>
					</div>	
				</div>

				<div className="firstDiv" style={{backgroundColor: "white"}}>
				<div className="h4Div"><h4 style={{fontSize: "1.25rem", fontWeight: "bold", color: "white"}} >Shirts & Polo</h4></div>
					<div>
						<div className="divTop">
							{shirts.map((product, i)=>(
								<Card key={i} product={product} />
							))}
						</div>
					</div>	
				</div>


				<div className="firstDiv" style={{backgroundColor: "white"}}>
				<div className="h4Div"><h4 style={{fontSize: "1.25rem", fontWeight: "bold", color: "white"}} >Trousers For Men & Women</h4></div>
					<div>
						<div className="divTop">
							{trouser.map((product, i)=>(
								<Card key={i} product={product} />
							))}
						</div>
					</div>	
				</div>

				{/*<div className="firstDiv" style={{backgroundColor: "white"}}>
				<div className="h4Div"><h4 style={{fontSize: "1.25rem", fontWeight: "bold", color: "white"}} >Best Seller</h4></div>
					<div>
						
						<div className="divTop">
							{productsBySell.map((product, i)=>(
								<Card key={i} product={product} />
							))}
						</div>
					</div>	
				</div>*/}	

		</Layout>
	)
}


export default Home