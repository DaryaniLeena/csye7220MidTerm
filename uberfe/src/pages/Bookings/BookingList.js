import React from "react";
import { SwipeableFlatList } from "react-native";
import BookingItem from "./BookingItem";
import BookingActions from "./BookingActions";

const BookingList = ({ bookings }) => {
    return (
        <SwipeableFlatList
            data={bookings}
            bounceFirstRowOnMount={true}
            maxSwipeDistance={160}
            renderItem={BookingItem}
            // renderQuickActions={BookingActions}
        />
    );
};

export default BookingList;
