import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import axios from "axios";  // Import Axios for API requests
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck, FaDiscord } from "react-icons/fa";

function Pending() {
    const [sendFriendRequests, setSendFriendRequests] = useState([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch sent friend requests
    const fetchSentFriendRequests = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/get/send/friend/requests', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setSendFriendRequests(response.data);  // Set the data to state
        } catch (error) {
            setErrorMessage("Error fetching sent friend requests.");
            console.error(error);
        }
    };

    // Fetch received friend requests
    const fetchReceivedFriendRequests = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/received/send/friend/requests', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setReceivedFriendRequests(response.data);  // Set the data to state
        } catch (error) {
            setErrorMessage("Error fetching received friend requests.");
            console.error(error);
        }
    };

    // Handle friend request approval
    const handleApproveRequest = async (requestId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/approve/friend/requests', {
                request_id: requestId  // Sending request_id in the body
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.status === 200) {
                // Refresh the received friend requests
                fetchReceivedFriendRequests();
            }
        } catch (error) {
            console.error("Error approving friend request:", error);
            setErrorMessage("Error approving friend request.");
        }
    };

    // Handle friend request denial
    const handleDenyRequest = async (requestId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/deny/friend/requests', {
                request_id: requestId  // Sending request_id in the body
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.status === 200) {
                // Refresh the received friend requests
                fetchReceivedFriendRequests();
            }
        } catch (error) {
            console.error("Error denying friend request:", error);
            setErrorMessage("Error denying friend request.");
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchSentFriendRequests();
        fetchReceivedFriendRequests();
    }, []);

    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                {/* Main Content */}
                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                    <h5 className="text-white mt-5">Sent Friend Requests</h5>
                    <ul className="list-group mb-5">
                        {sendFriendRequests.length > 0 ? sendFriendRequests.map((request, index) => (
                            <li key={index} className="list-group-item d-flex shadow-lg justify-content-between align-items-center text-white mb-3 rounded border-0"
                                style={{ backgroundColor: '#2f3136' }}>
                                <span><FaDiscord size={40} className="me-2" style={{ color: '#7289da' }} />Sent a friend request to <strong>{request.requesting_user?.name}</strong></span>
                                <button className="btn text-danger border-0" onClick={() => handleDenyRequest(request.id)}>
                                    <FaRegTrashCan size={20} />  {/* Trash icon for rejecting */}
                                </button>
                            </li>
                        )) : <li className="list-group-item d-flex shadow-lg justify-content-between align-items-center text-white mb-3 rounded border-0" style={{ backgroundColor: '#2f3136' }}>No sent friend requests.</li>}
                    </ul>

                    {/* Received Friend Requests */}
                    <h5 className="">Received Friend Requests</h5>
                    {receivedFriendRequests.length > 0 ? (
                        <ul className="list-group">
                            {receivedFriendRequests.map((request, index) => (
                                <li key={index} className="list-group-item d-flex shadow-lg justify-content-between align-items-center text-white mb-3 rounded border-0"
                                    style={{ backgroundColor: '#2f3136' }}>
                                    <span>
                                        <FaDiscord size={40} style={{ color: '#7289da' }} />
                                        <strong className="ms-2">{request.requester?.name}</strong> has sent you a friend request
                                    </span>
                                    <div>
                                        <button className="btn text-success border-0 me-2" onClick={() => handleApproveRequest(request.id)}>
                                            <FaCheck size={20} />  {/* Check icon for accepting */}
                                        </button>
                                        <button className="btn text-danger border-0" onClick={() => handleDenyRequest(request.id)}>
                                            <FaRegTrashCan size={20} />  {/* Trash icon for rejecting */}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center">
                            <img src='./icon2.svg' alt="No pending friend requests" className="img-fluid mb-3" style={{ maxWidth: '400px' }} />
                            <p className="">There are no pending friend requests. Here's Wumpus for now.</p>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default Pending;
