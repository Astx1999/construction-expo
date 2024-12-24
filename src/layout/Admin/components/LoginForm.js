// LoginPage.js
import React, { useState } from 'react';
import { useLogin } from 'react-admin';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
    const login = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ email, password }, "/nbspkkwwdsc").catch((error) => alert(error.message));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault(); // Prevents cursor jumping to the start
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    sx={{ marginBottom: '16px', width: '300px' }}
                />
                <TextField
                    type={showPassword ? 'text' : 'password'} // Toggle input type
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    sx={{ marginBottom: '16px', width: '300px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword} // Fixes cursor position
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" style={{ height: '56px', width: '300px' }}>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
