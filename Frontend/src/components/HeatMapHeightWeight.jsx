import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";

const HeatMapHeightWeight = ({ sport, sex }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getData(sport, sex);  // Fetch data when the component mounts or currentPage changes
  }, [sport, sex]);

  const getData = async (sport, sex) => {
    setLoading(true);
    setNoData(true);
    try {
      const response = await api.get("/height-weight-heatmap", { params: { sport: sport, sex: sex } }); // Fetch data for the specified page
      console.log(response.data);
      setData(response.data);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      return <div >No Data</div>;

    }
    setLoading(false);
    setNoData(false);
  };

  if (noData){
    return <div >No Data</div>;
  }
  if (loading) {
    return <div >Loading...</div>;
  }

  return (
    <ResponsiveHeatMapCanvas
      data={data}
      theme={{
        text: {
          fill: colors.grey[200],
          fontSize: 12
        },
        axis: {
          legend: {
            text: {
              fontSize: 20,
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
            stroke: colors.grey[700]
          }
        },
        legends: {
          text: {
            fill: colors.grey[100]
          }
        },
        tooltip: {
          container: {
            background: colors.primary[900]
          }
        }
      }}
      margin={{ top: 80, right: 60, bottom: 70, left: 80 }}
      forceSquare={true}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'weight in kg',
        legendOffset: -50
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'weight in kg',
        legendOffset: 50
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'height in cm',
        legendPosition: 'middle',
        legendOffset: 50
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'height in cm',
        legendPosition: 'middle',
        legendOffset: -50
      }}
      colors={{
        type: 'quantize',
        scheme: 'yellow_green_blue',
        minValue: 0,
        maxValue: 100000,
        steps: 10
      }}
      emptyColor={colors.primary[400]}
      borderWidth={1}
      borderColor={{ theme: 'grid.line.stroke' }}
      enableLabels={false}
      legends={[
        {
            anchor: 'top-left',
            translateX: 0,
            translateY: -60,
            length: 200,
            thickness: 10,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: '>-.2s',
            title: 'Value →',
            titleAlign: 'start',
            titleOffset: 4
        }
    ]}
      annotations={[]}
      hoverTarget="rowColumn"
    />
  )
}

export default HeatMapHeightWeight;