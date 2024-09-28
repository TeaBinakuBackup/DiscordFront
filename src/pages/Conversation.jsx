import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

function Conversation() {
    const { friendId } = useParams(); // Get the friendId from the route
    const [messages, setMessages] = useState([]); // State for messages
    const [newMessage, setNewMessage] = useState(""); // Initialize the message input

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/conversation/get-messages', {
                    friendId: friendId
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });

                setMessages(response.data); // Set the messages in the state
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [friendId]);

    // Function to handle sending the new message
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        if (newMessage.trim() === "") {
            alert("Message cannot be empty!");
            return;
        }

        try {
            // Send the message to the backend
            const response = await axios.post('http://localhost:8000/api/conversation/send-message', {
                content: newMessage,
                friendId: friendId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Attach the auth token
                }
            });

            // Clear the message input after successful submission
            setNewMessage("");
            // Optionally, you can re-fetch messages here to update the list dynamically
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                {/* Main Content */}
                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                    {/* <h2 className="text-white">Conversation with Friend ID: {friendId}</h2> */}

                    {/* Messages section */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px', marginBottom: '20px' }}>
                        <div className="messages">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`d-flex ${message.sender_id === parseInt(localStorage.getItem('auth_user_id')) ? 'justify-content-end' : 'justify-content-start'}`}
                                >
                                    <div
                                        className={`p-2 rounded-4 ${message.sender_id === parseInt(localStorage.getItem('auth_user_id')) ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                                        style={{ maxWidth: '60%', marginBottom: '10px' }}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message input at the bottom */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Send a message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)} // Update the state on input change
                            style={{ backgroundColor: '#585858', color: 'white', flexGrow: 1, marginRight: '10px' }}
                        />
                        <button type="submit" className="btn rounded-5 btn-secondary" style={{ width: '50px' }}>
                            +
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Conversation;
