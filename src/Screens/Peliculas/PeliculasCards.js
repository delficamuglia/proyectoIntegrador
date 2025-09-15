import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./styles.css"

class PeliculasCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verMas: false,
            textoBoton: "Ver más",
        }
    }

    cambiarEstado() {
        this.setState({
            verMas: !this.state.verMas,
            textoBoton: this.state.verMas ? "Ver más" : "Ver menos"

        })
    }

    render() {
        return (
            <>
                <article className="single-card-movie">
                    <Link to={`/detalle/id/${this.props.pelicula.id}`}> 
                    <img src={`https://image.tmdb.org/t/p/w500${this.props.pelicula.poster_path}`} alt={this.props.pelicula.original_title} className="card-img-top" />
                    </Link>
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.pelicula.original_title}</h5>
                        {this.state.verMas && <p className="text">{this.props.pelicula.overview}</p>} 
                        <button className="btn btn-info btn-sm" onClick={() => this.cambiarEstado()}>{this.state.textoBoton}</button>
                        {/*<Link to={`/RUTADETALLE/${this.props.pelicula.id}`} className="btn btn-primary">Ver más/>  */}
                    </div>
                </article>

            </>
        )
    }
}

export default PeliculasCards;