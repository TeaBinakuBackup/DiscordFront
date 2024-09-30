import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function Profile() {
    const [userData, setUserData] = useState({});
    const [profilePicture, setProfilePicture] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);  // To toggle edit mode
    const [editedName, setEditedName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");

    // Handle file change for avatar upload
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    // Handle the form submission to upload a new profile picture
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("avatar", profilePicture);

        try {
            const response = await axios.post('http://localhost:8000/api/change/profile/picture', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage("Profile picture updated successfully!");
            setErrorMessage("");
            fetchProfileData();
        } catch (error) {
            setErrorMessage("Error updating profile picture.");
            setSuccessMessage("");
        }
    };

    // Fetch the profile data of the authenticated user
    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setUserData(response.data);
            setEditedName(response.data.name);
            setEditedEmail(response.data.email);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setErrorMessage("Error fetching profile data.");
        }
    };

    // Handle the form submission to update the user's name and email
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/edit/profile', {
                name: editedName,
                email: editedEmail
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.status === 200) {
                setSuccessMessage("Profile updated successfully!");
                setErrorMessage("");
                fetchProfileData();
                setIsEditing(false);  // Exit edit mode
            }
        } catch (error) {
            setErrorMessage("Error updating profile.");
            setSuccessMessage("");
        }
    };

    // Fetch user profile when component mounts
    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <SideBar />

                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                    <h2 className="text-white mb-4">My Account</h2>

                    {/* Error message */}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}

                    {/* Profile Card */}
                    <div className="card shadow-lg bg-dark border-0 ">
                        <div className="rounded-3" style={{ backgroundColor: '#B83A7F', height: '100px' }}></div>

                        <div className="d-flex justify-content-between align-items-center p-4">
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: '15px' }}>
                                    {userData.avatar ? (
                                        <img
                                            src={userData.avatar}
                                            className="rounded-circle"
                                            style={{ width: '90px', height: '90px' }}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <div className="bg-success rounded-circle" style={{ width: '80px', height: '80px' }}>
                                            <span className="text-white p-2">No Avatar</span>
                                        </div>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="form-group mt-4">
                                    <label htmlFor="avatar" className="form-label text-secondary">Avatar</label>
                                    <input
                                        id="avatar"
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <button type="submit" className="btn btn-secondary rounded-5 mt-3">
                                        +
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="p-4 text-white rounded-bottom">
                            {isEditing ? (
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">Save Changes</button>
                                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                </form>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <p className="fw-bold text-secondary">USERNAME</p>
                                        <p className="text-white">{userData.name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="fw-bold text-secondary">EMAIL</p>
                                        <p className="text-white">{userData.email}</p>
                                    </div>
                                    <button className="btn border-0 btn-secondary p-3" onClick={() => setIsEditing(true)}>
                                        <FaEdit size={25} className="me-2" /> Edit Profile
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
