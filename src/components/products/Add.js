import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import styles from './Add.css';
import { dbInstance } from '../../service/dbService';

class Add extends Component {

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

    handleSubmit(event) {
        dbInstance.post({
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
                [event.target.name] : (event.target.type !== "checkbox") ? event.target.value : event.target.checked
            }
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <>
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
                                onChange={this.handleChange}
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
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Add);