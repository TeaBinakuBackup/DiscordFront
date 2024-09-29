import React, { useEffect, useState } from "react";
import axios from 'axios';
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { TbXboxX } from "react-icons/tb";


function AllFriends() {
    const [friends, setFriends] = useState([]);
    const [authUserId, setAuthUserId] = useState(null);

    useEffect(() => {
        // Fetch the authenticated user's ID
        const fetchAuthUserId = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth-user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setAuthUserId(response.data.id); // Store the authenticated user ID
            } catch (error) {
                console.error('Error fetching authenticated user:', error.response);
            }
        };

        // Fetch the friend data
        const fetchFriends = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/friends', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error.response);
            }
        };

        fetchAuthUserId(); // Get authenticated user ID first
        fetchFriends(); // Fetch friends
    }, []);

    const removeUser = async (friendshipId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/remove/friend', { id: friendshipId }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setFriends(friends.filter(friend => friend.id !== friendshipId));  // Remove friendship from list
        } catch (error) {
            console.error('Error removing friendship:', error);
        }
    };
    
    const blockUser = async (friendshipId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/block-user', { id: friendshipId }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setFriends(friends.filter(friend => friend.id !== friendshipId));  // Remove friendship from list
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };
    
    // Helper to filter out duplicate friends
    const uniqueFriends = () => {
        const unique = new Map(); // Map to track unique friends by their friendship ID
    
        friends.forEach(friend => {
            // If user1 is the friend and not the auth user, add to the map with friendship ID
            if (friend.user1 && friend.user1.id !== authUserId) {
                unique.set(friend.id, { ...friend.user1, friendshipId: friend.id });  // Store friendship ID
            }
            // If user2 is the friend and not the auth user, add to the map with friendship ID
            if (friend.user2 && friend.user2.id !== authUserId) {
                unique.set(friend.id, { ...friend.user2, friendshipId: friend.id });  // Store friendship ID
            }
        });
    
        return Array.from(unique.values()); // Convert Map back to an array
    };
    
console.log(friends)
    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                    <h5 className="text-white mb-3">ALL FRIENDS — {uniqueFriends().length}</h5>

                    {uniqueFriends().map((friend, index) => (
    <li 
        key={index} 
        className="list-group-item d-flex justify-content-between align-items-center p-3 mb-3 shadow-lg text-white rounded-3 border-0 shadow-sm"
        style={{ backgroundColor: '#36393F' }}
    >
        <div className="d-flex align-items-center">
            <img 
                src={friend.avatar ? friend.avatar : `${process.env.PUBLIC_URL}/discord.webp`} 
                alt="Avatar" 
                className="rounded-circle me-3" 
                style={{ width: '40px', height: '40px' }} 
            />
            <div>
                <strong>{friend.name}</strong>
                <p className="m-0">
                    {friend.mood_status?.name}
                </p>
            </div>
        </div>

        <div>
            <button className="btn border-0 text-white">
                <IoChatbubbleEllipsesOutline size={25} />
            </button>
            <button className="btn border-0 text-danger" onClick={() => removeUser(friend.friendshipId)}> {/* Pass friendshipId */}
                <TbXboxX size={25} />
            </button>
            <button 
                className="btn border-0 text-danger"
                onClick={() => blockUser(friend.friendshipId)}  
            >
                <MdBlock size={25} />
            </button>
        </div>
    </li>
))}

                </div>
            </div>
        </>
    );
}

export default AllFriends;
