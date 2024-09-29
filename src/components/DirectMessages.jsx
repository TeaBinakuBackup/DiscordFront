import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/DirectMessages.css'
import { useNavigate } from 'react-router-dom';

function DirectMessages() {
    const [friends, setFriends] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();  // Hook to navigate programmatically

    useEffect(() => {
        // Fetch the friends data
        axios.get('http://localhost:8000/api/friends')
            .then(response => {
                setFriends(response.data);  // Set the response data
            })
            .catch(error => {
                console.error('Error fetching friends:', error.response);
            });
    }, []);

    // Function to handle clicking on a friend
    const handleFriendClick = (friendId,friendName) => {
        // Navigate to the conversation page and pass the friend's ID
        navigate(`/conversation/${friendId}/${encodeURIComponent(friendName)}`);
        };

    return (
        <div style={{ overflowY: 'auto' }}>
 {friends.length > 0 ? (
    <div>
        {friends.map((friend, index) => {
            // Check if user1 or user2 is the friend, exclude Auth user
            const currentFriend = friend.user1?.id === parseInt(localStorage.getItem('auth_user_id'))
                ? friend.user2 
                : friend.user1;

            // Do not display if currentFriend is undefined
            if (!currentFriend) return null;

            return (
                <div
                    key={index}
                    className="card shadow-sm border-0 mb-3"
                    style={{ backgroundColor: '#2c2f33', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => handleFriendClick(currentFriend?.id, currentFriend?.name)} // Pass both ID and Name
                >
                    <div className="card-body d-flex align-items-center" style={{ padding: '10px' }}>
                    <img
    src={currentFriend?.avatar ? currentFriend.avatar : '/discord.webp'}
    alt="Avatar"
    className="rounded-circle me-3"
    style={{ width: '40px', height: '40px' }}
/>



                        {/* Friend Name and Mood Status */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="text-secondary fw-semibold" style={{ fontSize: '16px' }}>{currentFriend?.name}</span>
                            <small className="text-secondary" style={{ fontSize: '12px' }}>{currentFriend?.mood_status?.name}</small>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
) : (
    <div></div>
)}

        </div>
    );
}

export default DirectMessages;
