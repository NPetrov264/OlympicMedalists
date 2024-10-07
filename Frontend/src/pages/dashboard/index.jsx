import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import BarChartParticipants from "../../components/BarChartParticipants";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from "react-router-dom";
import HeatMapHeightWeight from "../../components/HeatMapHeightWeight";
import SwarmPlotWeight from "../../components/SwarmPlotWeight";
import SwarmPlotHeight from "../../components/SwarmPlotHeight";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="The olympic games in numbers" subtitle="History of the olympic games from 1896 to 2016" />

        <Box>
          <Button component={Link} to="https://www.kaggle.com/datasets/heesoo37/120-years-of-olympic-history-athletes-and-results/data" target="_blank"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Raw Data
          </Button>
        </Box>
      </Box>

      {/* GRID AND CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="14vh"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="135,571"
            subtitle="Athletes Participated"
            progress={33981 / 135571}
            comment="females"
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="28,251"
            subtitle="Medalists"
            progress={28251 / 135571}
            comment=" of participants"
            icon={
              <WorkspacePremiumOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="6,996"
            subtitle="Athletes won multiple medals"
            progress={6996 / 135571}
            comment=" of participants"
            icon={
              <WorkspacePremiumOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="11,179"
            subtitle="Participated in latest olympics"
            progress={5034 / 11179}
            comment="female"
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Medals awarded
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                39,783
              </Typography>
            </Box>
            <IconButton component={Link} to="/medals" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
              <OpenInNewIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <BarChart isDashboard="true" />

        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Summer games participants
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                116,776
              </Typography>
            </Box>
            <Box>
              <IconButton component={Link} to="/participants" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                <OpenInNewIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="74%" m="-20px 0 0 0">
            <BarChartParticipants isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Medals awarded in the Rio Olympics
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                1,855
              </Typography>
            </Box>
            <IconButton component={Link} to="/medals-map" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
              <OpenInNewIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <GeographyChart startYear={2016} endYear={2016} season={"Summer"} isDashboard={true} />

        </Box>


        {/* ROW 3 */}

        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box marginBottom="20px" >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Weight distribution comparison
              </Typography>
            </Box>
            <IconButton component={Link} to="/weight-distribution" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
              <OpenInNewIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <Box height="100%" m="-20px 0 0 0">
          <img
              alt="logo"
              height="84%"
              src="../assets/weight_dist.png"
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box marginBottom="20px" >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Weight distribution comparison
              </Typography>
            </Box>
            <IconButton component={Link} to="/weight-distribution" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
              <OpenInNewIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <Box height="100%" m="-20px 0 0 0">
            <img
              alt="logo"
              height="84%"
              src="../assets/height_dist.png"
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 2"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
        >
          <Box
            mt="25px"
            p="0 26px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Height-weight heatmap
              </Typography>

            </Box>
            <IconButton component={Link} to="/height-weight-heatmap" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
              <OpenInNewIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <Box height="98%" m="0px -10px 0 5px">
            <HeatMapHeightWeight isDashboard={true} />
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard;