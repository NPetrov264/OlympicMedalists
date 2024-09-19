import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/GeoFeatures";

const GeographyChart = ({ startYear, endYear, season, reload, isDashboard }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getData(startYear, endYear, season);  // Fetch data when the component mounts or on reload
  }, [reload]);

  const getData = async (startYear, endYear, season) => {
    setLoading(true);
    try {
      const response = await api.get("/total-medals-geo", { params: { startYear: startYear, endYear: endYear, season: season } }); // Fetch data for the specified page
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
    <ResponsiveChoropleth
      data={data}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="greens"
      domain={[0, (season === "Summer") ? 260 : 100]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionType="naturalEarth1"
      projectionScale={isDashboard ? 50 : 260}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.45]}
      projectionRotation={[0, 0, 0]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      fillColor={colors.grey[100]}
      graticuleLineWidth={0.5}
      legends={
        isDashboard
          ? undefined
          : [
            {
              anchor: 'bottom-left',
              direction: 'column',
              justify: true,
              translateX: 20,
              translateY: -160,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: '#444444',
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000000',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
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
            },
            {
                id: 'gradient',
                type: 'linearGradient',
                colors: [
                    {
                        offset: 0,
                        color: '#000'
                    },
                    {
                        offset: 100,
                        color: 'inherit'
                    }
                ]
            }
        ]}
    />
  )
}

export default GeographyChart;