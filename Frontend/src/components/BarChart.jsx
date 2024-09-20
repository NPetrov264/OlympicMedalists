import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ startYear, endYear, season, reload }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getData(startYear, endYear, season);  // Fetch data when the component mounts or currentPage changes
  }, [reload]);

  const getData = async (startYear, endYear, season) => {
    setLoading(true);
    try {
      const response = await api.get("/medals", { params: { startYear: startYear, endYear: endYear, season: season } }); // Fetch data for the specified page
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
        'goldMedals',
        'silverMedals',
        'bronzeMedals',
      ]}
      indexBy="country"
      height={data.length * 38}
      margin={{ top: 0, right: 176, bottom: 50, left: 160 }}
      padding={0.3}
      layout="horizontal"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      //colors={{ scheme: 'nivo' }}
      colors={['#f2da54', '#c8cdd1', '#e29542']}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
      ]}
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
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 40,
        truncateTickAt: 0
      }}
      enableGridY={false}
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
          anchor: 'top-right',
          direction: 'column',
          justify: false,
          translateX: -40,
          translateY: 260,
          itemsSpacing: 36,
          itemWidth: 50,
          itemHeight: 14,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 32,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      role="application"
      ariaLabel="Nivo bar chart"
      barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
    />
  )
}

export default BarChart;