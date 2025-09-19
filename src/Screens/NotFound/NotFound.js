import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargando: true
        }
    }

    componentDidMount() {
        this.setState({ cargando: false });
    }

    render () {
        if (this.state.cargando) {
            return (
                <div className="notfound-container">
                    <p className="notfound-texto">Cargando...</p>
                </div>
            )
        }

        return (
            <div className="notfound-container">
                <h1 className="notfound-titulo"> ¿Te perdiste? </h1>
                <p className="notfound-texto"> Lo sentimos, no pudimos encontrar esa página. </p>
                <p className="notfound-texto-arriba-boton"> Encontrarás mucho para explorar en nuestra página principal. </p>
                <Link to="/" className="notfound-boton"> Ir al Inicio </Link>
            </div>
        )
    }
}

export default NotFound;


