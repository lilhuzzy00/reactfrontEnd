import React, {useState} from "react"
import {API} from "../config"


const ShowPhoto = ({item, url}) =>{
	return(
		<div>
			<img 
				src={`${API}/${url}/photo/${item._id}`}
				alt={item.name}
				className="mb-3"
			/>
		</div>
	)
}

export default ShowPhoto