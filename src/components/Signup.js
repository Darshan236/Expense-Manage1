import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CssFiles/Signup.css';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the signup endpoint
            const response = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You can add other headers if needed
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log("changed");
                // If the response status is OK (2xx), handle the success case
                const responseData = await response.json();
                console.log(responseData.message);
            } else {
                // If the response status is not OK, handle the error case
                const errorData = await response.json();
                console.error('Error during signup:', errorData.error);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during signup:', error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={user.username} onChange={handleChange} className="signup-input" />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="signup-input" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={user.password} onChange={handleChange} className="signup-input" />
                </label>
                <br />
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <div>
                <p style={{ color: 'blue', fontSize: '18px' }}>Already have an account? <Link to="/login" style={{ fontSize: '20px' }}>Login</Link></p> {/* Link to the login page */}
            </div>
        </div>
    );
};

export default Signup;
