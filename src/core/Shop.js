import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Layout from "./Layout"
import {getCategories, getFilteredProducts} from "./ApiCore"
import Checkbox from "./Checkbox"
import RadioBox from "./RadioBox"
import {prices} from "./FixedPrices"
import Card from "./Card"
import "./Shop.css";



const Shop = () =>{
	const [myFilters, setMyFilter] = useState({
		filters: {
			categories: [],
			price: []
		}
	})
	const [categories, setCategories] = useState([])
	const [error, setError] = useState(false)
	const [skip, setSkip] = useState(0)
	const [limit, setLimit] = useState(6)
	const [filteredResults, setFilteredResults] = useState([])
	const [size, setSize] = useState(0)

	const init = () => {
		getCategories()
			.then(data =>{
				if(error.data){
					setError(error.data)
				} else {
					setCategories(data)
				}
			})
	}

	const loadFilteredResults = newFilters =>{
		getFilteredProducts(skip, limit, newFilters)
			.then(data =>{
				if(data.error){
					setError(data.error)
				} else {
					setFilteredResults(data.data)
					setSize(data.size)
					setSkip(0)
				}
			})
	}



	const loadMore = newFilters =>{
		let toSkip = skip + limit;
		getFilteredProducts(toSkip, limit, myFilters.filters)
			.then(data =>{
				if(data.error){
					setError(data.error)
				} else {
					setFilteredResults([...filteredResults, ...data.data])
					setSize(data.size)
					setSkip(toSkip)
				}
			})
	}


	const loadMoreButton = () =>{
		return(
			size > 0 && size >= limit && (
				<button className="btn btn-primary" onClick={loadMore}>Load More</button>
			)
		)
	}


	useEffect(() =>{
		init();
		loadFilteredResults(skip, limit, myFilters.filters)
	}, [])


	const handleFilters = (filters, filterBy) => {
		// console.log("SHOP", filters, FilterBy)
		const newFilters = {...myFilters}
		newFilters.filters[filterBy] = filters

		if(filterBy =="price"){
			let priceValues = handlePrice(filters)
			newFilters.filters[filterBy] = priceValues
		}

		loadFilteredResults(myFilters.filters)
		setMyFilter(newFilters)
	}

	const handlePrice = value =>{
		const data = prices;
		let array = [];

		for(let key in data){
			if(data[key]._id === parseInt(value)){
				array = data[key].array
			}
		}
		return array;
	}


	
	return(

		<Layout title="Homepage" description="Node js Ecommerce App" >

		<helmet>
				<title>Shop page</title>
				<meta 
					name="description"
					content="Make shopping here"  
				/>

				<meta 
					name="keywords"
					content="Choose from our list of products and shop. Buy Shoes, Bags, Shirts, Underwears, Polo Jeans "  
				/>
			</helmet>

			<div className="ShopRow" style={{backgroundColor: "white"}}>
				<div className="ShopRow1">
					<div className="filterDiv">
						<div>
							<h4 style={{fontSize: "27px"}}>Filter By Categories</h4>
							<ul>
								<Checkbox categories={categories} 
									handleFilters={filters => 
										handleFilters(filters, "category")
									} 
								/>
							</ul>
						</div>

						<div>
							<h4 style={{fontSize: "27px"}}>Filter By Price</h4>
							<div style={{ paddingLeft: "30px"}}>
							<RadioBox prices={prices} 
								handleFilters={filters => 
									handleFilters(filters, "price")
								} 
							/>
							</div>
						</div>

					</div>

						
					<div className="cardRow">
							{filteredResults.map((product, i )=>(
								<div className="cardRow2">
									<Card key={i} product={product} />
								</div>
							))}
						{loadMoreButton()}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Shop