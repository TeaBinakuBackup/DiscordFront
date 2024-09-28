import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { FaDiscord } from "react-icons/fa";  // For Discord icon or you can use your avatar
import { FaRegEdit } from "react-icons/fa";


function Profile() {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch the profile data of the authenticated user
    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Attach token from localStorage
                }
            });
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
                                <div style={{ marginTop: '-50px', marginRight: '15px' }}>
                                    <FaDiscord size={80} className="bg-success rounded-circle p-2" style={{ color: 'white' }} />
                                </div>
                                <div>
                                    <h4>{userData.name || "teabinaku"}</h4>
                                    <span className="text-muted">#0001</span> {/* Placeholder for user ID */}
                                </div>
                            </div>
                        
                        </div>

                        {/* User Details */}
                        <div className="p-4 text-white rounded-bottom">
                 

                            {/* Username */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <p className="fw-bold mb-1 text-secondary">USERNAME</p>
                                    <p className="text-white mb-0">{userData.name || "teabinaku"}</p>
                                </div>
                                <button className="btn btn-dark text-white"><FaRegEdit size={20} />
                                    </button>
                            </div>

                            {/* Email */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <p className="fw-bold mb-1 text-secondary">EMAIL</p>
                                    <p className="text-white mb-0">******@ubt-uni.net <span className="text-primary">Reveal</span></p>
                                </div>
                                <button className="btn btn-dark text-white"><FaRegEdit size={20} />
                                </button>
                            </div>

                  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
    