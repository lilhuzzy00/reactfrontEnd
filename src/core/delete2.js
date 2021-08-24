	{/*<div className="footer">
			<div className="contact">
				<span><a href="https://wa.me/2348182082429"><i style={{color: "green", width: "30px"}} class="fab fa-whatsapp-square"></i></a></span>
				<span><a href="https://web.facebook.com/House-Of-Goodies-111631077831213"><i style={{ width: "30px"}} class="fab fa-facebook"></i></a></span>
				<span></span>
				<span></span>
			</div>
			<div className="copyright">
				<p style={{color: "white"}}>Copyright &copy; 2021</p>
			</div>
			</div>*/}

mongodb+srv://MyProject:God$power22@herokuproject.a1zef.mongodb.net/test

.firstDiv {
	display: flex;
	justify-content: center;
	width: 100vw;
	height: auto;
	margin-top: 12px;
/*	background-color: black !important;
*/}

.firstDiv2 {
	display: flex;
	justify-content: center;
	width: 100vw;
	height: auto;
	background-color: white;
	padding-top: 16px;
	margin-top: 12px;
/*	background-color: black !important;
*/}



.divTop {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 95vw;
	height: auto;
	margin-bottom: 12px;
}
.buttons {
	display: flex;
	justify-content: center;
	padding-bottom: 10px;
}

/* For image sizing */

img {
	width: 100%;
	height: 200px;
}


.divTop2 {
	display: flex;
	justify-content: center;
	width: 250px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	margin-bottom: 20px;
	background-color: white;

}

.marginDiv {
	width: 220px;
	margin-top: 10px;
}

h4 {
	font-size: 40px;
    margin-left: 20px;
    margin-bottom: 15px
}

.Header {
	min-height: 80vh;
	background-image: linear-gradient(60deg, #3e32a8, #7c2fad);		
	margin: 0;
	padding: 0;
}


.Header2 {
	display: flex;
	justify-content: space-between;

}
.Header2 img {
	width: 600px;
	height: auto;
}

.Header2 h1 {
	font-family: sans-serif;
	color: white;
	font-weight: 900;
	margin-left: 90px;
	margin-top: 100px;
}

.Header2 button {
	margin-left: 90px;
	background-color: white !important;
	color: black;
	margin-top: 20px;
}


.searchForm {
	margin-top: 20px;
}

.inputRow {
	display: flex;
	justify-content: flex-start;
	padding-left: 20px; 
}

.inputRow2 {
	display: flex;
	justify-content: flex-start;
	padding-left: 20px; 
}

.inputNumber input[type=number] {
	width: 130px;
	margin-left: 7px;
}


.cartRow {
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	background-color: white;
}


.showDropIn1 textarea {
	width: 700px !important;
}

.footer {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 20vh;
	/*background-image: linear-gradient(60deg, #3e32a8, #7c2fad);*/
	background-color: black;
	align-items: center;
	align-content: center;
}

.copyright {
	display: flex;
	justify-content: center;
}

.bg-dark {
	background-color: black !important;
}

#navbarNav {
	margin-right: 10px;
}
.collapse {
	display: flex;
	justify-content: flex-end !important;
}
.navbar-brand {
	font-family: "Sonsie One", cursive;
	font-weight: 900;
/*	font-family: 'Bungee Shade', cursive;
*/
}


@media screen and (max-width: 360px){
	.Header {
		width: 100%;
		min-height: 20vh;
	}
	
	.Header2 {
		display: flex;
		justify-content: space-around;
	}
	.Header2 button{
		display: none;
	}
	.Header2 img {
		width: 40px;
		height: auto;
	}
	.Header2 h1 {
		margin-left: 0;
		margin-right: 0;
		font-size: 14px;
	}

	.navbar-brand {
		font-family: Helvetica;
		font-size: 14px;
	}

}

@media screen and (max-width: 411px){
	.Header {

		width: 100%;
		min-height: 20vh;
	}
	
	.Header2 {
		display: flex;
		justify-content: space-evenly;
	}
	.Header2 button{
		display: none;
	}
	.Header2 img {
		width: 140px;
		height: auto;
	}
	.Header2 h1 {
		margin-top: 10px;
		margin-left: 0;
		margin-right: 0;
		font-size: 14px;
	}
	.Header2 button {
		margin-left: 10px;
		margin-top: 10px;
	}

	.navbar-brand {
		font-family: Helvetica;
		font-size: 14px;
	}

}

@media screen and (max-width: 320px){
	.Header {
		width: 100% !important;
		min-height: 20vh;
	}
	
	.Header .Header2 {
		display: flex;
		justify-content: center;
	}
	.Header2 button{
		display: none;
	}
	.Header .Header2 img {
		width: 170px;
		height: auto;
	}
	.Header2 h1 {
		width: 140px;
		margin-top: 10px;
		margin-left: 0;
		margin-right: 0;
		font-size: 14px;
	}
	.Header2 button {
		margin-left: 10px;
		margin-top: 10px;
	}
	.nav {
		width: 100%;
	}

	.navbar-brand {
		font-family: Helvetica;
		font-size: 14px;
	}
}

@media screen and (max-width:  414px){
	.Header {
		min-height: 20vh;
		min-width: 100vw;
	}
	.Header2 {
		display: flex;
		justify-content: space-around;
	}
	.Header2 img {
		width: 200px;
		height: 200px;
	}
	.Header2 h1 {
		margin-left: 17px;
		margin-top: 3px;
	}
	.Header2 button {
		display: none;
	}

	.navbar-brand {
		font-family: Helvetica;
		font-size: 14px;
	}

}

@media screen and (max-width:  375px){
	.Header {
		display: flex;
		align-items: center;
		min-height: 20vh;
		min-width: 100vw;
	}
	.Header2 {
		display: flex;
		justify-content: space-around;
	}
	.Header2 img {
		width: 160px;
		height: auto;
	}

	.Header2 h1 {
		font-weight: bold;
		margin-top: 30px;
	}

	.navbar-brand {
		font-family: Helvetica;
		font-size: 14px;
	}

}


@media screen and (max-width: 414px){
	.h4Div {
		text-align: center;
	}
}


@media screen and (max-width: 768px){
	.Header {
		width: 100%;
		min-height: 20vh;
	}
	.Header2 {
		display: flex;
		justify-content: space-around;
	}

	.Header2 img {
		width: 400px;
		height: auto;
	}

	.Header2 h1 {
		margin-top: 10px;
	}

	.h4Div {
		text-align: center;
	}
}

@media screen and (max-width: 1024px){
	.Header {
		width: 100vw;
		min-height: 30vh;
	}
	.Header2 {
		display: flex;
		justify-content: space-around;

	}
}

@media screen and (max-width: 540px){
	.Header {
		width: 100vw;
		min-height: 30vh;
	}
	.Header2 {
		display: flex;
		justify-content: space-around;
	}
	.Header2 img {
		width: 200px;
		height: 200px;
	}
	.Header2 button {
		display: none;
	}
}

@media screen and (max-width: 280px){
	.Header {
		width: 100vw;
		min-height: 20vh;
	}
	.Header2 {
		display: flex;
		justify-content: space-around;
	}
	.Header2 img {
		width: 120px;
		height: auto;
	}
	.Header2 button {
		display: none;
	}
}
@media screen and (max-width: 776px){
	.h4Div {
		text-align: center;
	}
}


@media screen and (max-width: 809px){
	.h4Div {
		text-align: center;
	}
}