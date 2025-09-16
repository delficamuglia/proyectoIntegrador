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
        let datosEnLocalStorage = localStorage.getItem("Favoritos") //buscamos la lista de favs
        if (datosEnLocalStorage !== null) { //si hay akgo en localStorage
            let favoritos = JSON.parse(datosEnLocalStorage) //convierte en string
            if (favoritos.includes(this.props.serie.id)) { //verifica si ese ID está en la lista de favoritos
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
        const id = this.props.serie.id
        let favoritos = []

        let datosEnLocalStorage = localStorage.getItem("Favoritos")
        if (datosEnLocalStorage !== null) {
            favoritos = JSON.parse(datosEnLocalStorage)
        }

        favoritos.push(id)
        localStorage.setItem("Favoritos", JSON.stringify(favoritos))
        console.log(localStorage);
        this.setState({
            esFavorito: true
        })
    }

    quitarDeFavoritos() {
        {/*Cómo hago para que desaparezca en el momento que toco*/ }
        const id = this.props.serie.id
        let favoritos = []

        let datosEnLocalStorage = localStorage.getItem("Favoritos")
        if (datosEnLocalStorage !== null) {
            favoritos = JSON.parse(datosEnLocalStorage)
        }

        let nuevoFav = favoritos.filter(unId => unId !== id)
        localStorage.setItem("Favoritos", JSON.stringify(nuevoFav))
        console.log(localStorage);
        this.setState({
            esFavorito: false
        })
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
                        {this.state.verMas && <p className="text">{this.props.serie.overview}</p>}
                        <button className="btn btn-info btn-sm" onClick={() => this.cambiarEstado()}>{this.state.textoBoton}</button>
                        {/*<Link to={`/RUTADETALLE/${this.props.serie.id}`} className="btn btn-primary">Ver más/>  */}
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