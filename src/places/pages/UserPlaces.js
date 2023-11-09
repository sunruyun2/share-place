import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom/"

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";


const UserPlaces = () =>{
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId =  useParams().userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect( ()=>{
        const fetchPlaces = async() =>{
            try {
                console.log(userId)
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);  
                setLoadedPlaces(responseData.places)              
            } catch (error) {
                console.log(error)
            }
        }
        fetchPlaces();
    }, [sendRequest, userId])

    return (
    <>
        <ErrorModal error={error}onClear={clearError} />
        {isLoading && 
            <div className="center">
                <LoadingSpinner />
            </div>
        }
        {!isLoading &&  loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>)
}

export default UserPlaces;