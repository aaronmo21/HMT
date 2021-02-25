import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import { grommet } from 'grommet/themes';
import { Grommet } from 'grommet';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LocationsPage from './LocationsPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Grommet theme={grommet}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/LocationsPage">
              <LocationsPage />
            </Route>
          </Switch>
        </div>
        </Grommet>
      </Router>
    );
  }
}

export default App;