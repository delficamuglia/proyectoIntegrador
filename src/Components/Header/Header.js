import React from 'react'
import "./styles.css"
import {Link} from "react-router-dom"
// ver si le ponog ver mas al de peliculas y series 
// agregar imagen 

function Header() {

    return (
    <nav> 
      <ul className="logo">  
        <li> Agregar logo </li> 
         <li> <Link to="/"> Home </Link> </li>
         <li>  <Link to='/favoritos'> Favoritos </Link></li>
         <li> <Link to='/peliculas'> Peliculas </Link> </li>
         <li> <Link to='/series'> Series </Link> </li>
     </ul> 

    </nav>
)
}
export default Header