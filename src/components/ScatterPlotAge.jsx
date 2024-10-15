import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import { ResponsiveHeatMap } from '@nivo/heatmap'

const ScatterPlotAge = ({ sport, sex }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getData(sport, sex);  // Fetch data when the component mounts or currentPage changes
  }, [sport, sex]);

  const getData = async (sport, sex) => {
    setLoading(true);
    try {
      const response = await api.get("/age-distribution", { params: { sport: sport, sex: sex } }); // Fetch data for the specified page
      console.log(response.data);
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
    <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46,
            truncateTickAt: 0
        }}
        axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 70,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: -72,
            truncateTickAt: 0
        }}
        colors={{
            type: 'sequential',
            scheme: 'greens',
            minValue: 0,
            maxValue: 100
        }}
        emptyColor="#555555"
        legends={[
            {
                anchor: 'bottom',
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
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
    />
  )
}

export default ScatterPlotAge;