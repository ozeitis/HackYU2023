import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Chart from "./Chart";
import {
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "./Navbar";

function TickerPage(props) {
  let { ticker } = useParams();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/ticker/" + ticker)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setExpanded(
          Object.keys(data).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {})
        );
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleExpandClick = (key) => {
    setExpanded({ ...expanded, [key]: !expanded[key] });
  };

  const filteredData = debouncedSearchTerm
    ? Object.keys(data).filter((key) =>
        key.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : Object.keys(data);

  return (
    <>
    <Navbar />
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" align="center">
          Information for {ticker}:
        </Typography>
        <Box my={2}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress size={100} />
          </Box>
        ) : (
          filteredData.map((key) => {
            return (
              <Paper elevation={3} key={key}>
                <Box p={4} my={4}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5">{key}</Typography>
                    <IconButton
                      onClick={() => handleExpandClick(key)}
                      aria-expanded={expanded[key]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                  <Collapse in={expanded[key]}>
                    <Chart data={data[key]} />
                  </Collapse>
                </Box>
              </Paper>
            );
          })
        )}
      </Box>
    </Container>
    </>
  );
}

export default TickerPage;
