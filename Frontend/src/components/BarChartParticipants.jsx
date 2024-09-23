import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChartParticipants = ({ season }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getData(season);  // Fetch data when the component mounts or currentPage changes
  }, [season]);

  const getData = async (newSeason) => {
    setLoading(true);
    try {
      const response = await api.get("/participants", { params: { season: newSeason } }); // Fetch participant data
      console.log(response.data);
      console.log(newSeason)
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
    <ResponsiveBar
      data={data}
      theme={{
        text: {
          fill: colors.grey[200],
          fontSize: 12
        },
        axis: {
          legend: {
            text: {
              fill: colors.grey[100]
            }
          },
          ticks: {
            text: {
              fill: colors.grey[100]
            }
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
      keys={[
        'male',
        'female'
      ]}
      indexBy="year"
      margin={{ top: 50, right: 90, bottom: 50, left: 0 }}
      padding={0.3}
      layout="vertical"
      label={(item) => `${((item.value / (data[item.index].male + data[item.index].female)) * 100).toFixed(0)}%`}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#01A6EA', '#FFB1CB']}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            1.6
          ]
        ]
      }}
      axisTop={null}
      axisRight={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 40,
        truncateTickAt: 0
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 25,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 40,
        truncateTickAt: 0
      }}
      enableTotals={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2.4
          ]
        ]
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: 20,
          translateY: 30,
          itemsSpacing: 32,
          itemWidth: 50,
          itemHeight: 14,
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 32,
        }
      ]}
      role="application"
      ariaLabel="Nivo bar chart"
      barAriaLabel={e => e.id + ": " + e.formattedValue + " in year: " + e.indexValue}
    />
  )
}

export default BarChartParticipants;