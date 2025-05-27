import React from "react";
import { Box, Typography, Slider, Grid } from "@mui/material";

const CustomSlider = ({
  title = "Slider",
  value,
  onChange, // onChange event
  onChangeCommitted, // onChangeCommitted event
  min = 0,
  max = 100,
  step = 1,
  valueLabelFormat = (value) => value,
  trackColor = "#0086AD",
  railColor = "#99BCC5",
  thumbColor = "#0086AD",
  valueLabelColor = "#DCF7FF",
  valueLabelTextColor = "black",
  valueLabelTop = 58,
  leftLabel = `${min}`,
  rightLabel = `${max}`,
  percent = false,
}) => {
  return (
    <Box my={2} px={0}>
      <Typography sx={{ marginBottom: "-8px" }} gutterBottom>
        {title}
      </Typography>
      <Box sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Slider
          value={value}
          onChange={onChange} // Use onChange for real-time updates
          onChangeCommitted={onChangeCommitted} // Use onChangeCommitted to finalize
          min={min}
          max={max}
          step={step}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => (percent ? `${value}%` : value)}
          sx={{
            "& .MuiSlider-track": { backgroundColor: trackColor, height: 8, border: "none" },
            "& .MuiSlider-rail": { backgroundColor: railColor, height: 8 },
            "& .MuiSlider-thumb": {
              backgroundColor: thumbColor,
              border: "2px solid white",
              width: 20,
              height: 20,
              "&:hover, &:focus, &.Mui-active": { boxShadow: "none" },
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: valueLabelColor,
              color: valueLabelTextColor,
              fontWeight: "bold",
              top: valueLabelTop,
              borderRadius: "20px",
              padding: "8px",
              paddingX: "16px",
              "&:before": { display: "none" },
              "& *": { transform: "none" },
            },
          }}
        />

        {/* Slider Labels */}
        <Grid container justifyContent="space-between" sx={{ mt: "-8px", mb: "16px" }}>
          <Grid item><Typography>{leftLabel}{percent ? '%' : ''}</Typography></Grid>
          <Grid item><Typography>{rightLabel}{percent ? '%' : ''}</Typography></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomSlider;
