import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TickerPage(props) {
  let { ticker } = useParams();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/ticker/" + ticker)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setExpanded(Object.keys(data).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}));
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const handleExpandClick = (key) => {
    setExpanded({ ...expanded, [key]: !expanded[key] });
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" align="center">
          Information for {ticker}:
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress size={100} />
          </Box>
        ) : (
          Object.keys(data).map((key) => {
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
  );
}

export default TickerPage;