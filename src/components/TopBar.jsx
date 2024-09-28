import React from "react";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";  // To make API requests
import { useNavigate } from "react-router-dom";  // For redirection

function TopBar() {
    const navigate = useNavigate();  // Use the navigate function for redirection

    const logoutMethod = async () => {
        try {
            // Make the API request to log out (adjust the URL according to your backend)
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            // Clear the token from localStorage
            localStorage.removeItem('auth_token');

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <>
            <div style={{ backgroundColor: '#2f3136', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #0000' }}>
                <BsPersonRaisedHand size={30} className="text-secondary" style={{ marginRight: '10px' }} />
                <small className="text-secondary fw-semibold me-3">Friends</small>

                <a href="/all/friends" style={{ color: 'white', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">All</a>
                <a href="/pending" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Pending</a>
                <a href="/blocked" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Blocked</a>

                <a href="/add/friend">
                    <button className="btn border-0 text-white me-3" style={{ backgroundColor: '#3ba55c', padding: '6px 12px', borderRadius: '4px' }}>
                        Add Friend
                    </button>
                </a>

                <a href="/profile">
                    <button className="btn border-0 text-secondary">
                        <FaUserAlt size={25} />
                    </button>
                </a>

                {/* Logout Button */}
                <button className="btn border-0 text-secondary" onClick={logoutMethod}>
                    <IoLogOutOutline size={25} />
                </button>
            </div>
        </>
    );
}

export default TopBar;
