import React,{ Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from "../auth"
import {itemTotal} from "./CartHelper"
import "./menu.css"


const isActive = (history, path) =>{
	if(history.location.pathname === path){
		return {color: "black", background: "orange"}
	} else{
		return {color: "#ffffff"}
	}
}

const Menu =({history})=>{


	return(
		
			<nav className="navbar navbar-expand-lg navbar-light bg-dark" >
				  <Link className="navbar-brand" to="/" variant="dark" style={{color: "white"}}>HOUSE OF GOODIZ</Link>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				    <span ><i className="fas fa-bars" style={{color: "white"}}></i></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarNav">
				    <ul className="navbar-nav ml-auto">
				      
				      <li className="nav-item">
							<Link style={ isActive(history, "/shop") }className="nav-link" to="/shop">Shop</Link>
						</li>

						<li className="nav-item">
							<Link style={ isActive(history, "/cart") }
								className="nav-link" 
								to="/cart"><i className="fas fa-shopping-cart"></i> Cart
								<sup>
								<small>
								{itemTotal()}<
								/small>
								</sup>
							</Link>
						</li>
				      {isAuthenticated() && isAuthenticated().user.role === 0 && (

							<li className="nav-item">
								<Link style={ isActive(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
							</li>

						)}
						
						{isAuthenticated() && isAuthenticated().user.role === 1 && (

							<li className="nav-item">
								<Link style={ isActive(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard"><i className="fas fa-user-lock" ></i> Admin</Link>
							</li>
						)}
				      {!isAuthenticated() && (
							<Fragment>
								<li className="nav-item">
								<Link style={ isActive(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
								</li>

								<li className="nav-item">
								<Link style={ isActive(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
								</li>
							</Fragment>
						)}
				       {isAuthenticated() && (
							<li className="nav-item">
								<span style={{ cursor: "pointer", color: "white"}} className="nav-link" onClick={() => signout(() =>{
									history.push("/")
								})}
								>
								Signout
								</span>
							</li>
						)}
				    </ul>
				  </div>
			</nav>
	)
}


export default withRouter(Menu)
