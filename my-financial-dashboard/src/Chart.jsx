import React, { useEffect, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { Box, DataGrid } from "@mui/material";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryBar } from "victory";
import { Table, TableBody, TableRow, TableCell } from '@mui/material';

export const Chart = ({ data }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="70%"
      mx="auto"
    >
      {/* <p>{JSON.stringify(data)}</p> */}
      <VictoryChart
        theme={VictoryTheme.material}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
            width: "100%",
          }}
          data={data}
          y={"value"}
          x={"time"}
        />
      </VictoryChart>
      <Table size="small">
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Box>
  );
};

export default Chart;
