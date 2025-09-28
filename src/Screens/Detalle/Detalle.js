import React, { Component } from "react";
import "./styles.css";

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            carga: true,
            textoBoton: '',
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const tipo = this.props.match.params.tipo; 
        const apiKey = "cc9626b1c01cc6df9ddb2a9c71454130";

        let elementosFavoritos = []
        if (tipo === 'pelicula') {
            elementosFavoritos = localStorage.getItem('PeliculasFavoritas')
        } else {
            elementosFavoritos = localStorage.getItem('SeriesFavoritas')
        }
        console.log(elementosFavoritos)
        if (elementosFavoritos != null) {
            elementosFavoritos = JSON.parse(elementosFavoritos)
        } else {
            elementosFavoritos = []
        }
        if (elementosFavoritos.includes(id)) {
            this.setState({ textoBoton: 'Eliminar de favoritos' })
        } else {
            this.setState({ textoBoton: 'Agregar a favoritos' })
        }

        let url = "";

        if (tipo === "pelicula") {
            url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        } else if (tipo === "serie") {
            url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    datos: data,
                    carga: false
                });
            })
            .catch(error => console.log(error));
    }

    manejarFavoritos() {
        let elementosFavoritos = []
        if (this.props.match.params.tipo === 'pelicula') {
            elementosFavoritos = localStorage.getItem('PeliculasFavoritas')
        } else {
            elementosFavoritos = localStorage.getItem('SeriesFavoritas')
        }
        console.log(elementosFavoritos)
        if (elementosFavoritos != null) {
            elementosFavoritos = JSON.parse(elementosFavoritos)
        } else {
            elementosFavoritos = []
        }
        console.log(elementosFavoritos)
        let listaActualizada = elementosFavoritos
        if (elementosFavoritos.includes(this.props.match.params.id)) { 
            listaActualizada = elementosFavoritos.filter(idFavorito => { return idFavorito !== this.props.match.params.id })
            this.setState({ textoBoton: 'Agregar a favoritos' })
        } else {
            console.log(this.props.match.params.id)
            listaActualizada.push(this.props.match.params.id)
            this.setState({ textoBoton: 'Eliminar de favoritos' })
        }
        console.log(listaActualizada)
        if (this.props.match.params.tipo === 'pelicula') {
            localStorage.setItem('PeliculasFavoritas', JSON.stringify(listaActualizada))
        } else {
            localStorage.setItem('SeriesFavoritas', JSON.stringify(listaActualizada))
        }
    }

    render() {
        const datos = this.state.datos;

        return (
            <div className="detalle-card">
                {this.state.carga ? (
                    <p className="detalle-texto"> Cargando... </p>
                ) : (
                    <>
                        <img
                            className="detalle-imagen"
                            src={`https://image.tmdb.org/t/p/w500${datos.poster_path}`}
                            alt={datos.title || datos.name}
                        />
                        <h4 className="detalle-texto">{datos.title || datos.name}</h4>
                        <p className="detalle-texto">{datos.overview}</p>
                        {datos.release_date && (
                            <p className="detalle-texto">Fecha de estreno: {datos.release_date}</p>
                        )}
                        {datos.first_air_date && (
                            <p className="detalle-texto">Primera emisión: {datos.first_air_date}</p>
                        )}
                        {datos.genres && (
                            <p className="detalle-texto">
                                Géneros: {datos.genres.map(genero => `${genero.name}`).join(", ")}
                            </p>
                        )}
                        {datos.runtime && (
                            <p className="detalle-texto">Duración: {datos.runtime} minutos</p>
                        )}
                        {datos.vote_average && (
                            <p className="detalle-texto">Calificación: {datos.vote_average}</p>
                        )}
                        <button onClick={() => this.manejarFavoritos()} className="detalle-boton"> {this.state.textoBoton} </button>
                    </>
                )}
            </div>
        );
    }
}

export default Detalle;