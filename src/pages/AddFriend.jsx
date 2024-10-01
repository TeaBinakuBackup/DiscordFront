import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddFriend() {
    const [friendName, setFriendName] = useState("");
    const [users, setUsers] = useState([]);  // For storing the user search results
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);  // Selected user

    // Handle input change and fetch user suggestions
    const handleInputChange = async (e) => {
        setFriendName(e.target.value);

        // Only send search request if the input is not empty
        if (e.target.value.length > 0) {
            try {
                const response = await axios.get(`http://localhost:8000/api/search/users?query=${e.target.value}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setUsers(response.data);  // Set the users data
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        } else {
            setUsers([]); // Clear suggestions if input is empty
        }
    };

    // Handle selecting a user from the dropdown
    const handleSelectUser = (user) => {
        setFriendName(user.name);  // Set the selected user's name in the input field
        setSelectedUser(user);     // Store selected user
        setUsers([]);              // Clear the suggestions
    };

    // Handle friend request submission
    const handleAddFriend = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            setFeedbackMessage("Please select a user.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/add/friend/request', {
                username: selectedUser.name
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.status === 200) {
                setFeedbackMessage("Friend request sent successfully!");
                setFriendName("");  // Reset input field
                setSelectedUser(null);
            } else {
                setFeedbackMessage("Failed to send friend request. Try again.");
            }
        } catch (error) {
            setFeedbackMessage("Error: " + error.response?.data || "Unknown error occurred.");
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                <h4 className="text-white mb-3">Add Friend</h4>
                <p>You can add friends by searching for their username or email.</p>

                <form onSubmit={handleAddFriend} className="mb-4">
                    <input
                        type="text"
                        className="form-control bg-dark text-white border-0 p-3"
                        placeholder="Search for a user..."
                        value={friendName}
                        onChange={handleInputChange}
                        required
                    />

                    {/* Dropdown for user suggestions */}
                    {users.length > 0 && (
                        <ul className="list-group mt-2" style={{ position: 'absolute', zIndex: '10', width: '100%' }}>
                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    className="list-group-item list-group-item-action bg-dark text-white b"
                                    onClick={() => handleSelectUser(user)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user.name} ({user.email})
                                </li>
                            ))}
                        </ul>
                    )}

                    <button type="submit" className="btn btn-primary mt-3">
              +
                    </button>
                </form>

                {/* Feedback message */}
                {feedbackMessage && (
                    <div className={`alert ${feedbackMessage.includes("successfully") ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {feedbackMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddFriend;
