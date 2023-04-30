import { TextField, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Navbar from "./Navbar";

function Home(props) {
  return <Form />;
}

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/ticker/${inputValue}`);
  };

  useEffect(() => {
    if (inputValue) {
      fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${inputValue}`)
        .then((response) => response.json())
        .then((data) => setOptions(data.map((d) => `${d.name} - ${d.symbol} `)))
        .catch((error) => console.log(error));
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <>
    <Navbar />
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="70%"
      mx="auto"
    >
      <h1>Enter stock ticker</h1>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box my={2}>
          <Autocomplete
            freeSolo
            options={options}
            id="combo-box-demo"
            value={inputValue}
            onChange={(event, newValue) => {
              setInputValue(newValue.split(" - ")[1]); // extract symbol from "name - symbol"
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                onChange={(event) => setInputValue(event.target.value)}
              />
            )}
          />
        </Box>
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary">
            {`Search ${inputValue}`}
          </Button>
        </Box>
      </form>
    </Box>
    </>
  );
};

export default Home;
