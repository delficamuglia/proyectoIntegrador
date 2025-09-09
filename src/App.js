import React from 'react';
import Home from "./screens/Home/Home"
import Peliculas from "./screens/Peliculas/Peliculas"
import Series from "./screens/Series/Series"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/peliculas" component={Peliculas}  />
        <Route path="/series" component={Series}  />
      </Switch>
      <Footer />

    </React.Fragment>

  );
}

export default App;
