import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveSwarmPlotCanvas } from "@nivo/swarmplot";

const SwarmPlotWeight = React.memo(( {parameters, isDashboard} ) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (isDashboard) {
      getData();
    } else {
      getData(parameters[0], parameters[1], parameters[2], parameters[3]);  // Fetch data when the component mounts or currentPage changes
    }
  }, [parameters]);

  const getData = async (sport1, sport2, sex1, sex2) => {
    setLoading(true);
    try {
      const response = await api.get("/weight-distribution", { params: { sport1: sport1, sport2: sport2, sex1: sex1, sex2: sex2 } }); // Fetch data for the specified page
      setData(response.data);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div >Loading...</div>;
  }
  return (
    <ResponsiveSwarmPlotCanvas
      data={data}
      groups={[
        "",
        ""
      ]}
      identity="id"
      value="weight"
      valueFormat=".2f"
      valueScale={isDashboard ? { type: 'linear', min: 30, max: 100, reverse: false } : { type: 'linear', min: 25, max: 140, reverse: false }}
      // size={{
      //   key: 'height',
      //   values: [
      //     130,
      //     220
      //   ],
      //   sizes: [
      //     5,
      //     9
      //   ]
      // }}
      size={isDashboard?2:5}
      spacing={1}
      simulationIterations={60}
      colors={["#94e2cd", "#3da58a"]}
      colorBy="id"
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.6
          ]
        ]
      }}
      onClick={(node) => {navigator.clipboard.writeText(node.data.name)}}
      margin={{ top: 20, right: 100, bottom: 80, left: 100 }}
      enableGridX={false}
      enableGridY={true}
      tooltip={(node) => {
        return (
          <div
          style={{
              background: colors.primary[900],
              padding: '9px 12px',
              border: '1px solid #ccc',
          }}
          >
            <div>{node.data.name}: {node.value} kg, {node.data.height} cm</div>
          </div>
        )
      }}
      theme={{
        text: {
          fill: colors.grey[200],
          fontSize: 12
        },
        axis: {
          legend: {
            text: {
              fontSize: isDashboard ? 11 : 20,
              fill: colors.grey[200]
            }
          },
          ticks: {
            text: {
              fill: colors.grey[200]
            }
          }
        },
        grid: {
          line: {
            stroke: colors.grey[800]
          }
        },
        legends: {
          text: {
            fill: colors.grey[100]
          }
        }
      }}
      axisTop={{
        orient: 'top',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: 46
      }}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'darker dots indicate gold medalists, on click copies athlete name to clipboard',
        legendPosition: 'middle',
        legendOffset: 46
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Weight in kg',
        legendPosition: 'middle',
        legendOffset: -76
      }}
    useMesh={true}
    />
  )
});

export default SwarmPlotWeight;