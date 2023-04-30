import { TextField, Button, Box, Autocomplete } from '@mui/material';
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

    const options = ['Option 1', 'Option 2', 'Option 3'];
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/ticker/${inputValue}`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="70%"
            mx="auto"
        >
            <h1>Enter stock ticker</h1>
            <form onSubmit={handleSubmit} style={{width:"100%"}}>
                <Box my={2}>
                    <Autocomplete
                        options={options}
                        id="combo-box-demo"
                        value={inputValue}
                        onChange={(event, newValue) => {
                            setInputValue(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Option"
                                variant="outlined"
                            />
                        )}
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
