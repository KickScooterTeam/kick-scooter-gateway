import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AccountActivation(props) {
    const classes = useStyles();
    const [isActivated, setActivated] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        activateAccount();
    }, []);

    const activateAccount = () => {
        const token = props.match.params.token;

        axios.get(`/identity-service/accounts/activate/` + token)
            .then((res) => {
                if (res.status === 204) {
                    setActivated(true);
                    setLoad(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoad(true)
            });
    }

    if (load) {
        return (
            <Container maxWidth="md">
                <Grid>
                    <Typography variant="h3" aria-disabled={false}>
                        {isActivated
                            ? 'Your account is activated, you can login now'
                            : 'This is incorrect token, please check your input'
                        }
                    </Typography>
                </Grid>
            </Container>
        );
    } else
        return (
            <div className={classes.root}>
                <LinearProgress />
                <LinearProgress color="secondary" />
            </div>
        )
}