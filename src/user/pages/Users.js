import React from "react";
import UserList from "../components/UsersList";

const Users = () => {
    const USERS = [{
        id: 'u1',
        name: 'Max',
        image: 'https://images.pexels.com/photos/18275684/pexels-photo-18275684/free-photo-of-traditional-palace-in-hague.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        places: 3
    }];


    return <UserList items={USERS} />;
}


export default Users;