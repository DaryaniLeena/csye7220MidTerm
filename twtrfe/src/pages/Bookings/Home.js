import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import BookingList from "./BookingList";
import "../../App.css";
//import axios from 'axios';

const THome = () => {
    const [bookings, setBookings] = React.useState([]);

    const [error, setError] = React.useState("");

    const getBookings = () => {
        let url = "http://18.215.49.36:5000/bookings-results";
        return fetch(url, {
            method: "GET",
            headers: new Headers({
                "content-type": "application/json",
            }),
        })
            .catch(() => Promise.reject({ error: "network-error" }))
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((err) => Promise.reject(err));
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            getBookings()
                .then((data) => {
                    if (data) {
                        console.log(data);
                        console.log("*******");
                        const { results } = data;
                        console.log(results);
                        setBookings([...results]);
                        console.log(bookings);
                        // setLoading(false);
                    } else {
                        setError("No Booking Found");
                    }
                })
                .catch((err) => setError(err.status_message));
        };
        fetchData();
    }, []);

    return (
        <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
            {bookings.length == 0 ? (
                <div class-name="error-message">
                    You do not have any bookings
                </div>
            ) : (
                <BookingList bookings={bookings} />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "whitesmoke",
        marginTop: "60px",
    },
    centering: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        height: "100vh",
    },
});

export default THome;
