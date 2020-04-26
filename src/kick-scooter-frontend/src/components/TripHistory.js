import Typography from "@material-ui/core/Typography";
import React, {useState, useEffect} from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import HistoryIcon from '@material-ui/icons/History';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import getIdFromToken from '../utils/tokenDecoder';
import axios from 'axios';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TripHistory(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [trips, setTrips] = useState([]);


    useEffect(() => {
        const id = getIdFromToken();

        axios.get( "/trip-service/trips/" + id + '/history')
            .then(response => {
                setTrips(response.data);
            })
            .catch((error) =>
                console.log(error)
            )
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon> <HistoryIcon/></ListItemIcon>
                <ListItemText primary='History'/>
            </ListItem>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Trip History
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper style={{backgroundColor: '#cfe8fc', width: 500}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>TripTime</TableCell>
                                <TableCell>Distance</TableCell>
                                {/*<TableCell>Price</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.tripId}>
                                    <TableCell>{new Date(trip.tripStarts).toLocaleString()}</TableCell>
                                    <TableCell>{moment.duration(trip.tripTime).humanize()}</TableCell>
                                    <TableCell>{trip.distance}</TableCell>
                                    {/*{axios.get('http://localhost:8080/payment-service/payment/history/'+trip.tripId)*/}
                                    {/*    .then(response=>{setPayment(response.data);})}*/}
                                    {/*<TableCell>{payment.amount}</TableCell>*/}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Dialog>
        </div>
    );
}