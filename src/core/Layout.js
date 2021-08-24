import React from "react"
import {Link} from "react-router-dom"
import Typed from 'react-typed';
import Menu from "./Menu" 
import Footer from "./Footer" 
import "./menu.css"
import "./Card.css"

const Layout = ({
	title="title", 
	description="description", 
	className, 
	children
}) => (
		<div>
			<Menu />
			
			<div className="Header">
				<div className="Header2">
					<div>
						<h1>Shopping Made Easy With <br/>House Of Goodies</h1>
						<button className="btn btn-lg btn-primary">Get Started</button>
					</div>
					<img src="/images/image.png" />
				</div>
			</div>
			<div className={className}>{children}</div>
			<Footer />

		</div>
);

export default Layout