import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Greeting(props) {
    const classes = useStyles();

    useEffect(() => {
        setTimeout(()=>{
            props.history.push('/sign-in')
        },5000)
    })

    return (
        <Container maxWidth="md" className={classes.paper}>
            <Grid>
                <Typography variant="h3">
                    Registration is successful, please check your email
                    to complete registration
                </Typography>
                <Typography variant="h5">
                    You will be redirected to the login page in 5 seconds
                </Typography>
            </Grid>
        </Container>
    );
}