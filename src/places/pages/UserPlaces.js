import React from "react";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id:'p1',
        title:'Empire State Building',
        description: 'One of the greatest sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2019546/pexels-photo-2019546.jpeg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat:40.7484445,
            lng:-73.9882393,
        },
        creator: 'u1'
    },
    {
        id:'p2',
        title:'Empire State Building',
        description: 'One of the greatest sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2019546/pexels-photo-2019546.jpeg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat:40.7484445,
            lng:-73.9882393,
        },
        creator: 'u2',
    },
]


const UserPlaces = () =>{
    return<PlaceList items={DUMMY_PLACES} />
}

export default UserPlaces;