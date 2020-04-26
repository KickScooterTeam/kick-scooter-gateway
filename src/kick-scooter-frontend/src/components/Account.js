import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import tokenDecoder from "../utils/tokenDecoder";
import axios from "axios";

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

export default function Account(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        const token = tokenDecoder();

        axios.get(`/identity-service/accounts/` + token)
            .then((res) => {
                if (res.status === 200) {
                    setUser({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon> <PersonOutlineRoundedIcon/></ListItemIcon>
                <ListItemText primary='Account'/>
            </ListItem>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Account
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary={user.firstName + ' ' + user.lastName}/>
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary={user.email}/>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}