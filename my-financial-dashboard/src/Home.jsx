import { OutlinedInput, TextField, Button, FormControl } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Home(props) {
    return (
        <div className={'box'}>
            <div className='box'>
                <h1>Enter stock ticker</h1>
            </div>
            <Form></Form>
            {/* <Chart /> */}
        </div>
    );
}

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const history = useHistory();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      history.push(`/path/${inputValue}`);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Value"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    );
  };

export default Home;
