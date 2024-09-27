import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Login() {
    const [login, setLogin] = useState("");  // Can be email or username
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form from submitting the default way

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                login: login,  // Send login field (either email or username)
                password: password
            });

            if (response.status === 200) {
                setSuccessMessage("Login Successful!");
                setErrorMessage("");
                localStorage.setItem('auth_token', response.data.token);  // Store token in localStorage
                navigate('/all/friends');  // Redirect the user to dashboard or another protected route

            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Invalid login credentials. Please try again.");
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
            <div className="login-form bg-dark text-white p-4 rounded">
                <h2 className="mb-4">Welcome back!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="login">Email or Username *</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            placeholder="Email or Username"
                            required
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Log In</button>

                    {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

                    <div className="mt-3 text-center">
                        <a href="/forgot-password" className="text-decoration-none text-white">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-center">
                        <a href="/signup" className="text-decoration-none text-white">Don't have an account? Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
