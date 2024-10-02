import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "50" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 50%, transparent 51%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[600]} ${angle}deg 360deg),
            ${colors.greenAccent[600]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
    </Box>
  );
};

export default ProgressCircle;