import React, {Component} from "react"
import { withRouter } from "react-router-dom"

class Formulario extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: "",
        }
    }

    prevenirRecarga(event) {
        event.preventDefault()
        this.props.history.push("/busqueda/" + this.state.busqueda)
        console.log(event);
        
    }

    controlarCambios(event){
        console.log(event.target.value);

        this.setState({
            busqueda: event.target.value
        }, ()=> console.log(this.state.busqueda))
        
    }

    render() {        
        return(
            <>
            <form onSubmit={(event)=>this.prevenirRecarga(event)}>
                <input type="text" onChange={(event)=> this.controlarCambios(event)} value={this.state.busqueda}/>
                <button type="submit"> Buscar</button>
            </form>
            </>
            
        )
    }
}

export default withRouter(Formulario);