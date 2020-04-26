import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MaskedInput from 'react-text-mask';
import axios from "axios";
import tokenDecoder from "../utils/tokenDecoder";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';

import {lightGreen, red} from '@material-ui/core/colors'
import Container from "@material-ui/core/Container";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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

function CardMenu({cardInfo, handleDeleteCard}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const token = tokenDecoder();


    const handleSetDefaultCard = e => {
        e.preventDefault();

        const payload = {
            "userUUID": token,
            "last4": cardInfo.last4
        };

        console.log(payload);
        axios.put(`/payment-service/cards/default`, payload).then((res) => {
            console.log(payload);
            if (res.status === 200) {
                setAnchorEl(null);
                console.log(res.data);
            }
        }).catch((error) => {
            alert(error)
        }) //todo catch 403 payment required

    };


    return (
        <>
            <IconButton
                aria-label="more"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>

            <Menu
                id="customized-menu"
                onClose={handleClose}
                aria-haspopup="true"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
            >
                <MenuItem onClick={handleSetDefaultCard}>
                    <ListItemIcon>
                        <BookmarkIcon fontSize="small" style={{color: lightGreen[500]}}/>
                    </ListItemIcon>
                    <ListItemText primary="Set default"/>
                </MenuItem>


                <MenuItem onClick={handleDeleteCard(cardInfo)}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" style={{color: red[500]}}/>
                    </ListItemIcon>
                    <ListItemText primary="Delete"/>
                </MenuItem>
            </Menu>
        </>
    );
}

function Cards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards()
    });

    const token = tokenDecoder();
    const handleDeleteCard = cardInfo => {
        return e => {
            e.preventDefault();

            const payload = {
                "userUUID": token,
                "last4": cardInfo.last4
            };

            axios.delete(`/payment-service/cards`, {data: payload}).then((res) => {
                console.log(payload);
                if (res.status === 200) {
                    getCards();
                }
            }).catch((error) => {
                alert(error)
            })
        }
    };

    const getCards = () => {

        axios.get( `/payment-service/cards/` + token)
            .then((res) => {
                if (res.status === 200) {
                    setCards(res.data);
                }
            })
            .catch((error) => {
                console.log(error); //
            })
    };


    return (
        <>
            {cards.map((card) => (
                <Card key={card.last4} className={useStyles.cardItem} style={{
                    width: "322px",
                    background: 'linear-gradient(45deg, #9FA8DA 30%, #7986CB 70%)',
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                    position: "relative", borderRadius: "10px",
                    margin: 15
                }}
                >
                    <CardHeader
                        avatar={
                            <img src={require(`../icons/${card.brand}.svg`)} alt={"cardLogo"} width={30}/>
                        }
                        action={
                            <CardMenu cardInfo={card} handleDeleteCard={handleDeleteCard}/>
                        }
                        title={
                            <div>
                                {card.defaulted
                                    ? <Typography>Default </Typography>
                                    : null
                                }
                            </div>}

                    />
                    <div className={useStyles.details}>
                        <CardContent className={useStyles.content}>
                            <Typography component="h5" variant="h5" color="textSecondary">
                                •••• •••• •••• {card.last4}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </>
    );
}


function CardCvcInputTemplate(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

function CardNumberInputTemplate(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

function DateInputTemplate(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

function NewCardTemplate() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [card, setCard] = useState({
        userUUID: '',
        cardNumber: '',
        yearMonth: '',
        cvc: '',
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setCard(prevState => ({
            ...prevState, [name]: value
        }))
    };


    const token = tokenDecoder();
    const handleAddCard = e => {
        e.preventDefault();
        const payload = {
            "cardNumber": card.cardNumber,
            "cvc": card.cvc,
            "userUUID": token,
            "yearMonth": card.yearMonth,
        };
        console.log(payload);
        axios.post( `/payment-service/cards`, payload).then((res) => {
            console.log(payload);
            if (res.status === 200) {
                console.log(res.data);
                setOpen(false);
            }
        }).catch((error) => {
            alert(error)
        })
    };


    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={handleClickOpen} variant="contained" className={useStyles.cardItem} style={{
                width: "322px",
                background: 'linear-gradient(80deg, #C5CAE9 30%, #9FA8DA 90%)',
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                position: "relative",
                borderRadius: "10px",
                margin: 15,
                padding: 10,
            }}>
                Add a new card
                <AddCircleOutlineIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new card</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="cardNumber"
                        label="Card number"
                        fullWidth
                        required
                        onChange={handleChange}
                        value={card.cardNumber}
                        InputProps={{
                            inputComponent: CardNumberInputTemplate,
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Expiration date"
                        name="yearMonth"
                        value={card.yearMonth}
                        required
                        InputProps={{
                            inputComponent: DateInputTemplate,
                        }}
                        onChange={handleChange}
                        fullWidth

                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="cvc"
                        name="cvc"
                        value={card.cvc}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            inputComponent: CardCvcInputTemplate,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddCard} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}


export default function Payment() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon> <PaymentRoundedIcon/></ListItemIcon>
                <ListItemText primary='Payment'/>
            </ListItem>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Payment info
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List>
                    <Cards/>
                    <NewCardTemplate/>
                </List>
            </Dialog>
        </div>
    );
}