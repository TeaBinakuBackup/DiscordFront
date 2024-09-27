import React, { useState } from "react";
import axios from "axios";  // Import Axios for API requests
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddFriend() {
    const [friendName, setFriendName] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");  // Feedback for success or error

    const handleAddFriend = async (e) => {
        e.preventDefault();

        try {
         
            const response = await axios.post('http://localhost:8000/api/add/friend/request', {
                username: friendName  
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`  // Send the auth token
                }
            });

            if (response.status === 200) {
                setFeedbackMessage("Friend request sent successfully!");
            } else {
                setFeedbackMessage("Failed to send friend request. Try again.");
            }
        } catch (error) {
            setFeedbackMessage("Error: " + error.response?.data || "Unknown error occurred.");
        }

        // Reset friend name field
        setFriendName("");
    };

    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                {/* Main Content */}
                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                    <h4 className="text-white mb-3">Add Friend</h4>
                    <p>You can add friends with their username.</p>

                    <form onSubmit={handleAddFriend} className="d-flex mb-4">
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-0 p-3"
                            placeholder="Enter your friend's username"
                            value={friendName}
                            onChange={(e) => setFriendName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary ms-3">
                            Send
                        </button>
                    </form>

                    {/* Display feedback message */}
                    {feedbackMessage && (
                        <div className={`alert ${feedbackMessage.includes("successfully") ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {feedbackMessage}
                        </div>
                    )}

                    {/* Empty State Section */}
                    <div className="text-center mt-5">
                        <img
                            src={process.env.PUBLIC_URL + '/icon.svg'}
                            alt="Wumpus waiting"
                            className="img-fluid mb-3"
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddFriend;
