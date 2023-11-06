import React, { useEffect, useState } from "react";
import UserList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('http://localhost:5000/api/users/')
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                setLoadedUsers(responseData.users)
            } catch (e) {
                setError(e.message)
            }
            setIsLoading(false);

        };
        sendRequest();
    }, [])

    const errorHandler = () => {
        setError(null);
    }

    return (
        <>
            <ErrorModal error={error} onClear = {errorHandler}/>
            {isLoading && 
                <div className="Center">
                    <LoadingSpinner />
                </div>}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} /> };
        </>
    )
}


export default Users;