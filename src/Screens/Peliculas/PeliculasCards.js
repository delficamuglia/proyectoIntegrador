import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./styles.css"

class PeliculasCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verMas: false,
            textoBoton: "Ver más",
            esFavorito: false,
        }
    }

    componentDidMount() {
        let peliculasIds = localStorage.getItem("PeliculasFavoritas") //buscamos la lista de favs
        if (peliculasIds !== null) { //si hay akgo en localStorage
            let favoritos = JSON.parse(peliculasIds) //convierte en string
            if (favoritos.includes(String(this.props.pelicula.id))) { //verifica si ese ID está en la lista de favoritos
                this.setState({ esFavorito: true }) //si la serie esta devuelve true 
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
        const id = this.props.pelicula.id
        let favoritos = []

        let peliculasIds = localStorage.getItem("PeliculasFavoritas")
        if (peliculasIds !== null) {
            favoritos = JSON.parse(peliculasIds)
        }

        favoritos.push(JSON.stringify(id))
        localStorage.setItem("PeliculasFavoritas", JSON.stringify(favoritos))
        console.log(localStorage);
        this.setState({
            esFavorito: true
        })
    }

    quitarDeFavoritos(props) {
        let favoritos = []

        let peliculasIds = localStorage.getItem("PeliculasFavoritas")
        if (peliculasIds !== null) {
            favoritos = JSON.parse(peliculasIds)
        }

        let nuevoFav = favoritos.filter(unId => unId !== String(this.props.pelicula.id))
        localStorage.setItem("PeliculasFavoritas", JSON.stringify(nuevoFav))
        console.log(localStorage);
        this.setState({
            esFavorito: false,
        })
    }

    render() {
        return (
            <>
                <article className="single-card-movie">
                    <Link to={`/detalle/pelicula/${this.props.pelicula.id}`}> 
                    <img src={`https://image.tmdb.org/t/p/w500${this.props.pelicula.poster_path}`} alt={this.props.pelicula.original_title} className="card-img-top" />
                    </Link>
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.pelicula.original_title}</h5>
                        {this.state.verMas && <p className="text">{this.props.pelicula.overview}</p>}
                        <button className="btn btn-info btn-sm" onClick={() => this.cambiarEstado()}>{this.state.textoBoton}</button>
                        {/*<Link to={`/RUTADETALLE/${this.props.pelicula.id}`} className="btn btn-primary">Ver más/>  */}
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

export default PeliculasCards;