import { OutlinedInput, TextField, Button, FormControl } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

function TickerPage(props) {
  let { value } = useParams();
    return (
        <div className={'box'}>
            <h2>Information for {value}:</h2>
        </div>
    );
}

export default TickerPage;
