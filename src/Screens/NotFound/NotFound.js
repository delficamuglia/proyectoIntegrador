import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

class NotFound extends Component {
    render () {
        return (
            <div className="container">
                <h1 className="titulo"> ¿Te perdiste? </h1>
                <p className="texto"> Lo sentimos, no pudimos encontrar esa página. </p>
                <p className="texto-arriba-boton"> Encontrarás mucho para explorar en nuestra página principal. </p>
                <Link to="/" className="boton"> Ir al Inicio </Link>
            </div>
        )
    }
}

export default NotFound;

