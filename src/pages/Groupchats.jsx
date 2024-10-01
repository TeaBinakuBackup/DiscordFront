import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from "react-bootstrap";  // Import Modal and Form from react-bootstrap

function Groupchats() {
    const [showModal, setShowModal] = useState(false);  // To control modal visibility
    const [groupName, setGroupName] = useState("");  // To store group chat name
    const [friends, setFriends] = useState([]);  // To store the list of friends
    const [selectedFriends, setSelectedFriends] = useState([]);  // To store selected friends

    // Toggle modal visibility
    const handleModal = () => setShowModal(!showModal);

    // Fetch friends from the backend
    const fetchFriends = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/friends', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setFriends(response.data);
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    // Handle creating the group chat
    const handleCreateGroupChat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/create/group-chat', {
                groupName: groupName,
                members: selectedFriends
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.status === 200) {
                alert("Group chat created successfully!");
                setShowModal(false);  // Close modal on success
                setGroupName("");  // Reset the group name
                setSelectedFriends([]);  // Clear selected friends
            }
        } catch (error) {
            console.error("Error creating group chat:", error);
        }
    };

    // Fetch friends when the modal is opened
    useEffect(() => {
        if (showModal) {
            fetchFriends();
        }
    }, [showModal]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                <h4 className="text-white mb-3">Group Chats</h4>

                {/* Button to open modal */}
                <Button className="btn border-0 shadow-lg rounded-5 text-white bg-info" onClick={handleModal}>
                    + Add Group Chat
                </Button>

                {/* Modal for creating group chat */}
                <Modal show={showModal} onHide={handleModal}>
                    <Modal.Header closeButton style={{ backgroundColor: '#36393F', color: 'white' }} className="border-0">
                        {/* <Modal.Title>Create a Group Chat</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#36393F', color: 'white' }}>
                        <Form onSubmit={handleCreateGroupChat}>
                            <Form.Group className="mb-3">
                                <Form.Label>Group Chat Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter group chat name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    required
                                    style={{ backgroundColor: '#2c2f33', color: 'white' }}  
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Select Friends</Form.Label>
                                <Form.Control
                                    as="select"
                                    multiple
                                    value={selectedFriends}
                                    onChange={(e) => setSelectedFriends([...e.target.selectedOptions].map(option => option.value))}  // Handle multiple selections
                                    style={{ backgroundColor: '#2c2f33', color: 'white' }}  // Multi-select styling
                                >
                                    {friends.map(friend => (
                                        <option key={friend.id} value={friend.id}>
                                            {friend.user1?.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create Group Chat
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Groupchats;
