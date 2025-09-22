import React from 'react'
import "./styles.css"
import {Link} from "react-router-dom"
import Formulario from "../Formulario/Formulario"
 

function Header() {

    return (
    <nav> 
      <ul className="logo">  
        <li> MULTIFILMS </li> 
         <li> <Link to="/"> Home </Link> </li>
         <li> <Link to='/favoritos'> Favoritos </Link></li>
         <li> <Link to='/peliculas'> Peliculas </Link> </li>
         <li> <Link to='/series'> Series </Link> </li>
     </ul> 
     <Formulario />

    </nav>
)
}
export default Header