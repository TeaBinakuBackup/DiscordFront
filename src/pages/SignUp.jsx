import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents form from submitting the default way

        try {
            const response = await axios.post('http://localhost:8000/api/add/user', {
                email: email,
                name: username,
                password: password
            });
            
            if (response.status === 200) {
                setSuccessMessage("Sign Up Successful!");
                setErrorMessage("");
                navigate('/login');  // Redirect the user to /login

            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Sign Up Failed");
            setSuccessMessage("");
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
            }}
        >
            <div className="signup-form bg-dark text-white p-4 rounded">
            <h2 className="mb-4">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email *</label>
                        <input type="email"
                               className="form-control"
                               id="email"
                               placeholder="Email"
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="username">Username *</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               placeholder="Username"
                               required
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password *</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               placeholder="Password"
                               required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Continue</button>

                    {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

                    <div className="mt-3 text-center">
                        <a href="/login" className="text-decoration-none text-white">Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
