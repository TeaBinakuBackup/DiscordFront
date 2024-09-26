import React, { useEffect, useState } from "react";
import axios from 'axios';
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

function AllFriends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/all/friends')
        .then(response => {
            console.log(response.data)
            setFriends(response.data);
          
        })
        .catch(error => {
            console.error('Error fetching friends:', error);
        });
}, []);

    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                {/* Main Content */}
                <div style={{ marginLeft: '250px', padding: '20px' }}>
                    <h1 style={{ color: 'black' }}>All Friends</h1>
                    <ul>
                        {friends.map((friend, index) => (
                            <li key={index} style={{ color: 'black' }}>
                                {friend.user_id_1}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AllFriends;
