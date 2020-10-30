import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import styles from './App.css';

class App extends Component {

  db = null;
  remoteDb = null;
  sync = null;

  constructor(props) {
    super();

    this.state = {
      name: '',
      stock: '',
      position: false
  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.db = new PouchDB("store-manager");
    this.remoteDb = new PouchDB(
      "http://localhost:5984/store-manager", { skip_setup: true, auth: { username: 'admin', password: 'admin' } }
    );
    this.sync = this.db.sync(this.remoteDb, {
      live: true,
      retry: true
    });
  }

  handleSubmit(event) {
    this.db.post({
      name: this.state.name,
      createdAt: Date.now(),
      stock: parseInt(this.state.stock),
      position: this.state.position
    }).then(function () {
      console.log("Document created");
    }).catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState(
        {
            [event.target.name]
                : event.target.value
        }
    )
}

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Créer un nouveau produit
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={this.state.name} onChange={this.handleChange}
            />
            <TextField
              id="stock"
              margin="normal"
              fullWidth
              label="Stock"
              type="number"
              name="stock"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={this.state.stock} onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox
                id="positon"
                name="position"
                color="primary"
                value={this.state.position} onChange={this.handleChange}
              />
              }
              label="Position"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Envoyer
            </Button>
          </form>
        </div>
      </Container>

    
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);