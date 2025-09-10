import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./styles.css"

class PeliculasCards extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <article className="single-card-movie">
                    <img src={`https://image.tmdb.org/t/p/w500${this.props.pelicula.poster_path}`} alt={this.props.pelicula.original_title} className="card-img-top" />
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.pelicula.original_title}</h5>
                        <p className="card-text">{this.props.pelicula.overview}</p>
                        {/*<Link to={`/RUTADETALLE/${this.props.pelicula.id}`} className="btn btn-primary">Ver más/>  */}
                    </div>
                </article>

            </>
        )
    }
}

export default PeliculasCards;