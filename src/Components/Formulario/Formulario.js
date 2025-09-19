import React, {Component} from "react"
import { withRouter } from "react-router-dom"
import './Formulario.css'
// hacer css del formulario 

class Formulario extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: "",
            tipo: '',
        }
    }

    prevenirRecarga(event) {
        event.preventDefault()
        this.props.history.push("/busqueda/" + this.state.tipo + '/'+ this.state.busqueda)
        console.log(event);
        
    }

    controlarCambios(event){
        console.log(event.target.value);

        this.setState({
            busqueda: event.target.value
        }, ()=> console.log(this.state.busqueda))
        
    }

    controlarTipo(event){
        console.log(event.target.value);

        this.setState({
            tipo: event.target.value
        }, ()=> console.log(this.state.tipo))
        
    }

    render() {        
        return(
            <>
            
            <form  onSubmit={(event)=>this.prevenirRecarga(event)}>
                <input  type="text" onChange={(event)=> this.controlarCambios(event)} value={this.state.busqueda}/>

                <h1> Peliculas </h1>
                <input type="radio" name="tipo" onChange={(event)=> this.controlarTipo(event)} value='movie' />

                <h1> Series </h1>
                <input type="radio" name="tipo" onChange={(event)=> this.controlarTipo(event)} value='tv' />
                 
                <button type="submit"> Buscar</button>
            </form>
            
            </>
            
        )
    }
}

export default withRouter(Formulario);