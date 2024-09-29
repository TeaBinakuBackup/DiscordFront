import React, { useEffect, useState } from "react";
import axios from 'axios';
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { HiDotsVertical } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";


function AllFriends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/friends')
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends:', error.response);
            });
    }, []);

    const blockUser = async (friendId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/block-user', { id: friendId }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            
            // Success handling: remove the blocked friend from the list
            setFriends(friends.filter(friend => friend.id !== friendId));

        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                {/* Main Content */}
                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                    <h5 className="text-white mb-3">ALL FRIENDS — {friends.length}</h5>

                    {/* Conditionally render content based on friends count */}
                    {friends.length > 0 ? (
                        <ul className="list-group">
                            {friends.map((friend, index) => (
                                <li 
                                    key={index} 
                                    className="list-group-item d-flex justify-content-between align-items-center p-3 mb-3 shadow-lg text-white rounded-3 border-0 shadow-sm"
                                    style={{ backgroundColor: '#36393F' }}
                                >
                                    <div className="d-flex align-items-center">
                                        {/* Avatar */}
                                        <img 
                                       src={`${process.env.PUBLIC_URL}/discord.webp`}
                                        alt="Avatar" 
                                            className="rounded-circle me-3" 
                                            style={{ width: '40px', height: '40px' }} 
                                        />

                                        {/* Friend Name and Status */}
                                        <div>
                                            <strong>{friend.user1?.name}</strong>
                                            <p className="m-0">
                                                {friend.user1?.mood_status?.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions (Message and Options) */}
                                    <div>
                                        <button className="btn border-0 text-white" >
                                            <IoChatbubbleEllipsesOutline size={25}/>
                                        </button>
                                        <button 
                                            className="btn border-0 text-danger"
                                            onClick={() => blockUser(friend.id)}  // Call blockUser function on click
                                        >
                                            <MdBlock size={25}/>

                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center">
                            {/* Display the image when no friends are available */}
                            <img src="/icon.svg" alt="No friends" className="img-fluid mb-3" />
                            <p className="text-secondary">No friends available.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllFriends;
