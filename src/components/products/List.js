import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { dbInstance } from '../../service/dbService';
import { withStyles } from "@material-ui/core/styles";
import styles from './List.css';

class List extends Component {

    constructor() {
        super();
        this.state = {
            docs: {},
        }
    }

    componentDidMount() {
        const self = this;
        dbInstance.allDocs(
            { include_docs: true }
        ).then(function (docs) {
            console.log(docs);
            self.setState(
                {
                    docs: docs
                }
            )
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Button className={classes.mt4} variant="contained" color="primary">
                    Ajouter
                </Button>
                <TableContainer className={classes.mt4} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Nom</TableCell>
                                <TableCell align="right">Stock</TableCell>
                                <TableCell align="right">Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.docs.rows?.map((row) => {
                                    return (<TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.doc.name}</TableCell>
                                        <TableCell align="right">{row.doc.stock}</TableCell>
                                        <TableCell align="right">{row.doc.position.toString()}</TableCell>
                                    </TableRow>)
                                }) || []
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(List);