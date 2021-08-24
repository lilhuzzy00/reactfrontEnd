import React,{useState, useEffect} from "react";
import {getCategories, list} from "./ApiCore"
import Card from "./Card"
import "./Card.css"


const Search = () => {
	const [data, setData] = useState({
		categories: [], 
		category: "",
		results: [],
		search: "",
		searched: false

	})
	const {categories, category, results, search, searched} = data;

	const loadCategories = () => {
		getCategories()
			.then(data => {
				if(data.error){
					console.log(data.error)
				} else {
					setData({...data, categories: data})
				}
			})
	}

	useEffect(() =>{
		loadCategories()
	}, [])


	const searchData = () =>{
		if(search){
			list({search: search || undefined, category: category})
				.then(response => {
					if(response.error){
						console.log(response.error)
					} else {
						setData({...data, searched: true, results: response})
					}
			})
		}
	}

	const searchSubmit = (e) =>{
		e.preventDefault()
		searchData()
	}

	const searchedMessage = (searched, results) => {
		if(searched && results.length > 0){
			return `${results.length} products found`
		} 

		if(searched && results.length < 1){
				return `No product was found`
		}
	}



	const handleChange = name =>event=>{
		setData({...data, [name]: event.target.value, searched: false})
	}


	const searchedProducts = (results = []) =>{
		return(
			<div>
				<h3>
					{searchedMessage(searched, results)}
				</h3>
				<div className="row">
					{results.map((product, i)=>(
						<Card key={i} product={product} />
					))}
				</div>
			</div>
		)
	}

	

	
	const searchForm = () => (

		<form className="searchForm" onSubmit={searchSubmit}>
			<span className="input-group-text">
				<div className="input-group input-group-lg">
					<div className="input-group-text">
						<select className="btn mr-2" onChange={handleChange("category")}>
							<option className="" value="Any">Pick Category</option>
							{categories.map((c, i)=>(
								<option key={i} value={c._id}>{c.name}</option>
							))}
						</select>
					</div>
					<input 
						type="search" 
						onChange={handleChange("search")}
						className="form-control"
					/>
				</div>
				<div className="btn input-group-append" style={{border: "none"}}>
					<button className="input-group-text">Search</button>
				</div>
			</span>
		</form>

	)




	return(
		<div className="container mb-3">
			{searchForm()}
			{searchedProducts(results)}
		</div>
	)
}


export default Search
