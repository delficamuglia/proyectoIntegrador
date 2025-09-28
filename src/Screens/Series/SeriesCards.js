import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./styles.css"

class SeriesCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verMas: false,
            textoBoton: "Ver más",
            esFavorito: false
        }
    }

    componentDidMount() {
        let seriesIds = localStorage.getItem("SeriesFavoritas") 
        if (seriesIds !== null) { 
            let favoritos = JSON.parse(seriesIds) 
            if (favoritos.includes(String(this.props.serie.id))) { 
                this.setState({ esFavorito: true }) 
            }
        }
    }

    cambiarEstado() {
        this.setState({
            verMas: !this.state.verMas,
            textoBoton: this.state.verMas ? "Ver más" : "Ver menos"

        })
    }

    agregarAFavoritos() {
        const id = this.props.serie.id
        let favoritos = []

        let seriesIds = localStorage.getItem("SeriesFavoritas")
        if (seriesIds !== null) {
            favoritos = JSON.parse(seriesIds)
        }

        favoritos.push(JSON.stringify(id))
        localStorage.setItem("SeriesFavoritas", JSON.stringify(favoritos))
        console.log(localStorage);
        this.setState({
            esFavorito: true
        })
    }

    quitarDeFavoritos() {
        let favoritos = []
        const id = this.props.serie.id

        let seriesIds = localStorage.getItem("SeriesFavoritas")
        if (seriesIds !== null) {
            favoritos = JSON.parse(seriesIds)
        }

        let nuevoFav = favoritos.filter(unId => unId !== String(this.props.serie.id))
        localStorage.setItem("SeriesFavoritas", JSON.stringify(nuevoFav))
        console.log(localStorage);
        this.setState({
            esFavorito: false
        })

        if (this.props.filtrarSeries) {
            this.props.filtrarSeries(id)
        }
    }

    render() {
        return (
            <>
                <article className="single-card-tv">
                    <Link to={`/detalle/serie/${this.props.serie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${this.props.serie.poster_path}`} alt={this.props.serie.original_name} className="card-img-top" />
                    </Link>
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.serie.original_name}</h5>
                        {this.state.verMas && <p className="texto-cards">{this.props.serie.overview}</p>}
                        <button className="btn btn-info btn-sm" onClick={() => this.cambiarEstado()}>{this.state.textoBoton}</button>
                        {this.state.esFavorito ?
                            <button className="btn btn-info btn-sm" onClick={() => this.quitarDeFavoritos()}>★</button>
                            : <button className="btn btn-info btn-sm" onClick={() => this.agregarAFavoritos()}>☆</button>
                        }
                    </div>
                </article>

            </>
        )
    }
}

export default SeriesCards;