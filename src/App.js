import React, { Component } from 'react';
import Add from './components/products/Add';
import List from './components/products/List';
import Container from '@material-ui/core/Container';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { initializeDB } from './service/dbService';

class App extends Component {

  constructor() {
    super();
    initializeDB();
  }

  render() {
    return (
      <Container component="main">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={List} />
            <Route path="/test" exact component={Add} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;