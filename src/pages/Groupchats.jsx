import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from "react-bootstrap";

function Groupchats() {
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [groupChats, setGroupChats] = useState([]);

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
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    // Fetch the user's group chats
    const fetchGroupChats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user/group-chats', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setGroupChats(response.data);
        } catch (error) {
            console.error("Error fetching group chats:", error);
        }
    };

    // Handle creating the group chat
    const handleCreateGroupChat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/create/group-chat', {
                group_chat_name: groupName,
                members: selectedFriends
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.status === 200) {
                alert("Group chat created successfully!");
                setShowModal(false);
                setGroupName("");
                setSelectedFriends([]);
                fetchGroupChats();  // Fetch updated group chats
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

    // Fetch group chats on page load
    useEffect(() => {
        fetchGroupChats();
    }, []);

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
                                    onChange={(e) => setSelectedFriends([...e.target.selectedOptions].map(option => option.value))}
                                    style={{ backgroundColor: '#2c2f33', color: 'white' }}
                                >
                                    {friends.map(friend => (
                                        <option key={friend.user1?.id} value={friend.user1?.id}>
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

                {/* Display group chats */}
                <div className="mt-5">
                    <h5 className="text-white">Your Group Chats</h5>
                    {groupChats.length > 0 ? (
                        groupChats.map((chat, index) => (
                            <div key={index} className="card shadow-lg text-white rounded-3 border-0 shadow-sm"
            style={{ backgroundColor: '#36393F' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{chat.name}</h5>
                                    {/* <p className="card-text">Members: {chat.members.length}</p> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">You have no group chats yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Groupchats;
