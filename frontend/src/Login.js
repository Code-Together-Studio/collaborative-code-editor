import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError(''); // Reset login error

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();

                console.log(data)
                const jwtToken = data.token;

                localStorage.setItem('jwtToken', jwtToken);

                window.location.href = '/home';
            } else {
                setLoginError('Invalid email or password.');
            }
        } catch (error) {
            setLoginError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-body">
            <div className="login-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" src="logo.png" alt="icon"/>
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
            </div>
            <div className="login-content">
                <form onSubmit={handleLogin}>
                    <div className="login-text"> Log in to return to work</div>
                    <div className="login-button-container">
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Email Address"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit" className="login-button">Log in</button>
                        {loginError && <div className="error-message">{loginError}</div>}
                        <div className="login-text-small"> Not registered? <a href="/signup"> Sign up here </a></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
