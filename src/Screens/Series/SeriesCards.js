import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./styles.css"

class SeriesCards extends Component {
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
                <article className="single-card-tv">
                    <img src={`https://image.tmdb.org/t/p/w500${this.props.serie.poster_path}`} alt={this.props.serie.original_name} className="card-img-top" />
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.serie.original_name}</h5>
                        {this.state.verMas && <p className="text">{this.props.serie.overview}</p>} 
                        <button className="btn btn-info btn-sm" onClick={() => this.cambiarEstado()}>{this.state.textoBoton}</button>
                        {/*<Link to={`/RUTADETALLE/${this.props.serie.id}`} className="btn btn-primary">Ver más/>  */}
                    </div>
                </article>

            </>
        )
    }
}

export default SeriesCards;