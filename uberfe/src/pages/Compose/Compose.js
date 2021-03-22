import { useHistory } from "react-router-dom";
import { saveAuthorisation, isAuthorised } from "../../utils/auth";
import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { DatePicker, moment } from "react-datepicker";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import "./Compose.css";

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
    const [startDate, setStartDate] = useState(new Date());

    const handleSourceChange = (event, values) => {
        setSource(values);
        console.log(event.target.value);
    };
    const handleDestChange = (event) => {
        setDestination(event.target.value);
        console.log(event.target.value);
    };
    //   const [source, setCity] = React.useState("");

    //   const handleChange = (event) => {
    //     setCity(event.target.value);
    //   };
    // async launch POST
    const postTweet = async (user, source, destination, travel_date) => {
        const paramdict = {
            user: user,
            source: source,
            destination: destination,
            travel_date: travel_date,
        };

        try {
            if (source === destination) {
                alert(
                    "Source and Destination cannot be same. Please enter different values "
                );
            } else {
                const config = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paramdict),
                };
                // 18.215.49.36
                // for local: "http://localhost:5000/book",
                // for prod : "http://18.215.49.36:5000/book",
                const response = await fetch(
                    "http://18.215.49.36:5000/book",
                    config
                );
                //const json = await response.json()
                console.log(user);
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
                alert("booking done posted!");
            }
        } catch (error) {
            console.log(error);
            alert("exception on send");
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        postTweet(username, source, destination, travel_date);
        console.log(getCurrentDate());
        // alert("booking done posted!");
    }
    //   const yesterday = moment().subtract(1, "day");
    //   const disablePastDt = (current) => {
    //     return current.isAfter(yesterday);
    //   };
    function getCurrentDate(separator = "-") {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let time =
            (newDate.getHours() < 10
                ? `0${newDate.getHours()}`
                : `${newDate.getHours()}`) +
            ":" +
            (newDate.getMinutes() < 10
                ? `0${newDate.getMinutes()}`
                : `${newDate.getMinutes()}`);
        return `${year}${separator}${
            month < 10 ? `0${month}` : `${month}`
        }${separator}${date}T${time}`;
    }
    function getfutureDate(separator = "-") {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 1;
        let time = "23:59";

        return `${year}${separator}${
            month < 10 ? `0${month}` : `${month}`
        }${separator}${date}T${time}`;
    }
    return (
        <React.Fragment>
            <Paper className={classes.paper} elevation={6}>
                <div className={classes.container}>
                    <Typography component="h1" variant="h5">
                        {"Booking"}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            required
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
                        />

                        <h1></h1>
                        <Autocomplete
                            id="source"
                            options={options}
                            getOptionLabel={(option) => option.title}
                            inputValue={source.value}
                            onChange={(e, v) => setSource(v.title)}
                            style={{ width: 650 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Source"
                                    variant="outlined"
                                    required
                                />
                            )}
                        />
                        <h1></h1>
                        <Autocomplete
                            id="destination"
                            inputValue={destination.value}
                            onChange={(e, v) => setDestination(v.title)}
                            options={options}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 650 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    value={destination}
                                    label="Destination"
                                    variant="outlined"
                                    required
                                />
                            )}
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
                            //   for date change type = date
                            type="datetime-local"
                            inputProps={{
                                // min: new Date().toLocaleString() + "",
                                min: getCurrentDate(),
                                max: getfutureDate(),
                                // min: "2021-03-22T17:30",
                                // max: "2022-03-22T23:30",
                            }}
                            defaultValue=""
                            autoFocus
                            required
                        />
                        {/* <DatePicker isValidDate={disablePastDt} /> */}
                        {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              //   minDate={moment().toDate()}
              placeholderText="Select a day"
            /> */}

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
const options = [
    { title: "Acton" },
    { title: "Albany" },
    { title: "Auburn" },
    { title: "Baldwin" },
    { title: "Baldwin Harbor" },
    { title: "Baltimore" },
    { title: "Bedford" },
    { title: "Bloomingdale" },
    { title: "Boston" },
    { title: "Bridgeton" },
    { title: "Essex" },
    { title: "Farmington" },
    { title: "New York City" },
    { title: "Providence" },
    { title: "Worcester" },
    { title: "Cambridge" },
    { title: "Lowell" },
    { title: "Framingham" },
    { title: "Salem" },
    { title: "Syracuse" },
    { title: "Ithaca" },
];
export default Compose;
