import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import axios from "axios";

function Profile() {
    const [userData, setUserData] = useState({});
    const [profilePicture, setProfilePicture] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle file change for avatar upload
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };



    // Handle the form submission to upload a new profile picture
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send the file to the backend
        const formData = new FormData();
        formData.append("avatar", profilePicture);  // Append the file

        try {
            const response = await axios.post('http://localhost:8000/api/change/profile/picture', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'multipart/form-data'  // Required for file uploads
                }
            });

            // Handle success
            setSuccessMessage("Profile picture updated successfully!");
            setErrorMessage("");
            fetchProfileData();  // Refresh the profile data after uploading
        } catch (error) {
            // Handle error
            setErrorMessage("Error updating profile picture.");
            setSuccessMessage("");
        }
    };

    // Fetch the profile data of the authenticated user
    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`  // Attach token from localStorage
                }
            });
            console.log(response.data)
            setUserData(response.data);  // Set the user data in the state
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setErrorMessage("Error fetching profile data.");
        }
    };

    // Fetch user profile when component mounts
    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <>
            <TopBar />
            <div style={{ display: 'flex' }}>
                <SideBar />

                {/* Main Content */}
                <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
                    <h2 className="text-white mb-4">My Account</h2>

                    {/* Error message */}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}

                    {/* Profile Card */}
                    <div className="card shadow-lg bg-dark border-0 ">  
                        {/* Banner */}
                        <div className="rounded-3" style={{ backgroundColor: '#B83A7F', height: '100px' }}></div>

                        {/* Avatar and Basic Info */}
                        <div className="d-flex justify-content-between align-items-center p-4 ">
                            <div className="d-flex align-items-center">
                                {/* Avatar */}
                                
                                <div style={{  marginRight: '15px' }}>
                                {userData.avatar ? (
    <img
        src={userData.avatar} 
        className="rounded-circle"
        style={{ width: '90px', height: '90px' }}
    />
) : (
    <div className="bg-success rounded-circle" style={{ width: '80px', height: '80px' }}>
        {/* Placeholder Avatar */}
        <span className="text-white p-2">No Avatar</span>
    </div>
)}

</div>


                                <form onSubmit={handleSubmit} className="form-group mt-4">
                                    <label htmlFor="avatar" className="form-label text-secondary">Avatar</label>

                                    {/* File Input */}
                                    <input
                                        id="avatar"
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                    />

                                    <button type="submit" className="btn btn-secondary rounded-5 mt-3">
                                        +
                                    </button>

                         
                                </form>
                          
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="p-4 text-white rounded-bottom">
               
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <p className="fw-bold mb-1 text-secondary">USERNAME</p>
                                    <p className="text-white mb-0">{userData.name }</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <p className="fw-bold mb-1 text-secondary">EMAIL</p>
                                    <p className="text-white mb-0">{userData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
