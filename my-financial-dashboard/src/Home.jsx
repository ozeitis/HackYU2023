import { TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
    return (
        <Form />
    );
}

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/ticker/${inputValue}`);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <h1>Enter stock ticker</h1>
            <form onSubmit={handleSubmit}>
                <Box my={2}>
                    <TextField
                        label="Enter Value"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                </Box>
                <Box my={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Home;
