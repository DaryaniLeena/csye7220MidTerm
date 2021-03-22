import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const BookingItem = ({ item: booking }) => {
    return (
        <View style={styles.row}>
            <View style={styles.rowData}>
                <Text style={styles.rowDataText}>
                    Name : {`${booking.user}`}
                </Text>
                <Text style={styles.rowDataText}>
                    Source : {booking.source}
                </Text>
                <Text style={styles.rowDataText}>
                    Destination : {booking.destination}
                </Text>
                <Text style={styles.rowDataText}>
                    Travel Date : {booking.travel_date}
                </Text>
            </View>
        </View>
    );
};

//rowIcon: consider adding, to handle BIG images:
//resizeMode: 'contain'
//resizeMode: 'cover'
//resiceMode: 'center'
// https://reactnative.dev/docs/image.html#resizemode

const deleteBooking = () => {
    console.log("delete clicked");
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginBottom: 5,
        backgroundColor: "white",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "rgba(0,0,0,0.1)",
    },
    rowIcon: {
        width: 64,
        height: 64,
        marginRight: 20,
        borderRadius: "50%",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.1)",
    },
    rowData: {
        flex: 1,
    },
    rowDataText: {
        fontSize: 15,
        textTransform: "capitalize",
        color: "#4b4b4b",
    },
    rowDataSubText: {
        fontSize: 13,
        opacity: 0.8,
        color: "#a8a689",
        marginTop: 4,
    },
});

export default BookingItem;
