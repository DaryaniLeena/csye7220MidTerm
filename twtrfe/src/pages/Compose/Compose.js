import { useHistory } from "react-router-dom";
import { saveAuthorisation, isAuthorised } from "../../utils/auth";
import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(720 + theme.spacing(6))]: {
            width: 900,
            marginLeft: "auto",
            marginRight: "auto",
        },
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
            3
        )}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        width: 192,
        height: 192,
        color: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: `100%`,
    },
}));

const Compose = () => {
    const classes = useStyles();
    const history = useHistory();
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [travel_date, setTravelDate] = useState("");
    const [username, setUsername] = useState("");

    // async launch POST
    const postTweet = async (user, source, destination, travel_date) => {
        const paramdict = {
            user: user,
            source: source,
            destination: destination,
            travel_date: travel_date,
        };

        try {
            const config = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paramdict),
            };
            // 18.215.49.36
            const response = await fetch(
                "http://18.215.49.36:5000/book",
                config
            );
            //const json = await response.json()
            if (response.ok) {
                //return json
                //return response
                console.log("success on send.");
            } else {
                alert("launch: failure on send!");
            }

            try {
                const data = await response.json();
                console.log("on reply:");
                console.log(data);
            } catch (err) {
                console.log(err);
                alert("exception on reply!");
            }
        } catch (error) {
            console.log(error);
            alert("exception on send");
        }
    };

    function handleSubmit(event) {
        event.preventDefault();

        // const priv = true;
        // //const username = 'Elon Musk';
        // const myArray = ["women", "men"];
        // const img_gender = myArray[Math.floor(Math.random() * myArray.length)];
        // const img_index = Math.floor(Math.random() * 100) + 1;
        // const img_url =
        //     "https://randomuser.me/api/portraits/" +
        //     img_gender +
        //     "/" +
        //     img_index.toString() +
        //     ".jpg";

        postTweet(username, source, destination, travel_date);
        alert("booking done posted!");
    }

    return (
        <React.Fragment>
            <Paper className={classes.paper} elevation={6}>
                <div className={classes.container}>
                    <Typography component="h1" variant="h5">
                        {"Booking"}
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <TextField
                            value={username}
                            onInput={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            label={"User Name"}
                            name="username"
                            autoComplete="username"
                            autoFocus
                            required
                        />
                        <TextField
                            value={source}
                            onInput={(e) => setSource(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="source"
                            label={"Source"}
                            name="source"
                            autoComplete="source"
                            autoFocus
                            required
                        />
                        <TextField
                            value={destination}
                            onInput={(e) => setDestination(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="destination"
                            label={"Destination"}
                            name="destination"
                            autoComplete="destination"
                            autoFocus
                        />
                        <TextField
                            value={travel_date}
                            onInput={(e) => setTravelDate(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="travel_date"
                            label={"Travel Date"}
                            name="travel_date"
                            type="date"
                            defaultValue="2021-04-15"
                            autoFocus
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {"Submit"}
                        </Button>
                    </form>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    ></div>
                </div>
            </Paper>
        </React.Fragment>
    );
};

export default Compose;
