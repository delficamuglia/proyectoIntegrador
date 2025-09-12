import React from 'react';
import Home from "./Screens/Home/Home"
import Peliculas from "./Screens/Peliculas/Peliculas"
import Series from "./Screens/Series/Series"
import NotFound from "./Screens/NotFound/NotFound"
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
        <Route component={NotFound} />
      </Switch>
      <Footer />

    </React.Fragment>

  );
}

export default App;
