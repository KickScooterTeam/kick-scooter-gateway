import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import tokenDecoder from "../utils/tokenDecoder";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #3949ab 30%, #5c6bc0 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        position: 'absolute',
        zIndex:'1300',
        top:'85vh'
    },
});

export default function TripButton() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [scooterId, setScooterId] = useState('');
    const [tripStatus, setTripStatus] = useState(false);

    const handleChange = e => {
        setScooterId(e.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleStart = (e) => {
        e.preventDefault();
        setOpen(false);
        const token = tokenDecoder();

        const payload = {
            "userId": token,
            "scooterId": scooterId
        }

        axios.post("/trip-service/trips/start", payload)
            .then((res) => {
                if (res.status === 200) {
                    console.log('trip has started');
                    setTripStatus(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleFinish = (e) => {
        const token = tokenDecoder();
        const payload = {
            "userId": token,
            "scooterId": scooterId
        }

        axios.post("/trip-service/trips/finish", payload)
            .then((res) => {
                if (res.status === 200) {
                    console.log('trip has ended');
                    setTripStatus(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (!tripStatus) {
        return (
            <>
                <CssBaseline/>
                <Grid container justify="center">
                    <Button className={classes.root} onClick={handleClickOpen}>
                        Scan QR code
                    </Button>
                    <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Enter scooter id</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Scooter Id"
                                fullWidth
                                value={scooterId}
                                onChange={handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleStart} color="primary">
                                Start ride
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </>
        );
    } else return (
        <Grid container justify="center">
            <Button className={classes.root} onClick={handleFinish}>
                Finish trip
            </Button>
        </Grid>
    )
}