import React, { Component } from 'react';
import Add from './components/products/Add';
import List from './components/products/List';
import Container from '@material-ui/core/Container';

import { HashRouter, Route } from 'react-router-dom';
import { initializeDB } from './service/dbService';

class App extends Component {

  constructor() {
    super();
    initializeDB();
  }

  render() {
    return (
      <Container component="main">
        <HashRouter>
            <Route path="/" exact component={List} />
            <Route path="/test" exact component={Add} />
        </HashRouter>
      </Container>
    );
  }
}

export default App;