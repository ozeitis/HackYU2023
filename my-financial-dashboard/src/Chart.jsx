import React, {useEffect, useState} from "react";
import { createChart, ColorType } from "lightweight-charts";
import { Box } from '@mui/material';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryBar } from "victory";

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
    </Box>
  );
};

export default Chart;
