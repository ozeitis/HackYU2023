import React, { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';

const ALPHA_VANTAGE_API_KEY = '7AWENLJCVXFOKGP4'; //  Alpha Vantage API key

const SearchBar = ({ onTickerChange }) => {
    const [ticker, setTicker] = useState('');
    const [options, setOptions] = useState([]);
  
    const fetchStockSuggestions = async (searchQuery) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      setOptions(data.bestMatches || []);
    };
  
    useEffect(() => {
      if (ticker) {
        fetchStockSuggestions(ticker);
      } else {
        setOptions([]);
      }
    }, [ticker]);
  
    const handleTickerChange = (event, value) => {
      setTicker(value);
      onTickerChange(value);
    };
  
    return (
      <FormControl sx={{ width: '25ch' }}>
        <Autocomplete
          freeSolo
          options={options.map((option) => option['1. symbol'])}
          onInputChange={handleTickerChange}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                placeholder="Please enter ticker"
                {...params.inputProps}
                style={{ width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.23)' }}
              />
            </div>
          )}
        />
      </FormControl>
    );
  };
  
  export default SearchBar;