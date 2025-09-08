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
            <div className="character-card" >
                <img className= "imagen" src= {this.props.pelicula.poster_path} alt={this.props.pelicula.original_title}></img>
                <h4 className="text">{this.props.pelicula.original_title}</h4> {/*agregar que te mande al detalle*/}
                <h4 className="text">{this.props.pelicula.overview}</h4> 

            </div>  
        )
    }
}

export default PeliculasCards;