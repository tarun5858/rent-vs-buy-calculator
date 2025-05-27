import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Slider,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CustomSlider from "./Components/CustomSlider";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { rentvsbuy } from "./Api/calculatorApi";
import Header from "./Components/Header";
import "./assets/css/App.css"
import Footer from "./Components/Footer";
import closeBar from "./assets/close_small.png"


// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const generateYearLabels = () => {
  const years = [];
  for (let i = 0; i <= 10; i++) {
    years.push(i); // Add years from 0 to 10
  }
  return years;
};

const Calculator = () => {
    const isDesktop = useMediaQuery("(min-width:1200px)");

    
  const [location, setLocation] = useState("");
  const [tax_Bracket, setTaxBracket] = useState(30);
  const [reinvestment, setReinvestment] = useState("yes");
  const [property_inflation, setPropertyInflation] = useState(6);
  const [opportunity_cost_interest, setOpportunityCost] = useState(7);
  const [buy_closing_cost, setClosingCost] = useState(1);
  const [maintenance_cost, setMaintenanceCost] = useState(0.5);
  const [home_insurance, setHomeInsurance] = useState(100);
  const [rent_inflation, setRentInflation] = useState(9);
  const [security_deposit, setSecurityDeposit] = useState(2);
  const [rent_closing_cost, setclosingCostRent] = useState(1);
  const [average_shifting_home, setAverageShifting] = useState(3);
  const [shifting_cost, setShiftingCost] = useState(1);
  const [STCG, setSTCG] = useState(20);
  const [saturationYear, setSaturationYear] = useState(1);
  const [loan_ratio, setLoanRatio] = useState(75);

  const [rentArray, setRentArray] = useState([
    1590509, 2181101, 2742806, 3263883, 3731418, 4131547, 4449268, 4668344,
    4771203, 4738829, 4550733, 4184531, 3616198, 2819613, 1766596,
  ]);
  const [buyArray, setBuyArray] = useState([
    502388, 1754248, 3116673, 4538249, 5948247, 7531781, 9221959, 10926855,
    12885849, 15011943, 17185698, 19716705, 22491855, 25356008, 28709597,
  ]);

  const [house_cost, setCostOfHouse] = useState(2); // default value of 2.25Cr
  const [monthly_rent, setCostOfMonthlyRent] = useState(60); // default value of 2.25Cr
  const [loan_tenure, setLoanTenure] = useState(20);
  const [down_payment, setDownPayment] = useState(25);
  // const [down_payment, setDownPayment] = useState(35);
  const [loan_rate, setLoanRatePerYear] = useState(8);
  const [showAssumptions, setShowAssumptions] = useState(false); // State for showing/hiding assumptions
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [error, setError] = useState(null); // State to handle any errors
  const [loading, setLoading] = useState(false); // State to handle loading
  const [debounceTimer, setDebounceTimer] = useState(null);

  const triggerDebouncedApiCall = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      handleRentApi();
    }, 1500); // Adjust the delay time as needed
    setDebounceTimer(newTimer);
  };

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue); // Real-time value update while dragging
  };

  const handleSliderChangeCommitted = (apiTriggerFunc) => (event, newValue) => {
    apiTriggerFunc(); // Trigger API after slider is done
  };

  const handleCostOfHouseChange = handleSliderChange(setCostOfHouse);
  const handleMonthlyChange = handleSliderChange(setCostOfMonthlyRent);
  const handleLoanTenureChange = handleSliderChange(setLoanTenure);
  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue); // Set down payment value
    setLoanRatio(100 - newValue); // Update loan ratio value
  };
  const handleLoanRatePerYearChange = handleSliderChange(setLoanRatePerYear);
  const handlePropertyInflationChange =
    handleSliderChange(setPropertyInflation);
  const handleOpportunityCostIntChange = handleSliderChange(setOpportunityCost);
  const handleClosingCostChange = handleSliderChange(setClosingCost);
  const handleMaintenanceCostChange = handleSliderChange(setMaintenanceCost);
  const handleHomeInsuranceChange = handleSliderChange(setHomeInsurance);
  const handleRentInflationChange = handleSliderChange(setRentInflation);
  const handleSecurityDepositChange = handleSliderChange(setSecurityDeposit);
  const handleClosingCostRentChange = handleSliderChange(setclosingCostRent);
  const handleAverageShiftingChange = handleSliderChange(setAverageShifting);
  const handleShiftingCostChange = handleSliderChange(setShiftingCost);
  const handleLoanRatioChange = (event, newValue) => {
    setLoanRatio(newValue); // Set loan ratio value
    setDownPayment(100 - newValue); // Update down payment value
  };

  useEffect(() => {
    // Calculate the minimum and maximum monthly rent based on house_cost
    const minMonthlyRent = ((2.5 / 100) * (house_cost * 10000000)) / 12 / 1000; // Convert to thousands
    const maxMonthlyRent = ((3.5 / 100) * (house_cost * 10000000)) / 12 / 1000; // Convert to thousands

    // Update the monthly_rent state if it's outside the new range
    if (monthly_rent < minMonthlyRent || monthly_rent > maxMonthlyRent) {
      setCostOfMonthlyRent((minMonthlyRent + maxMonthlyRent) / 2); // Set to the midpoint of the range
    }
  }, [house_cost]); // Trigger this effect whenever house_cost changes

  // Toggle function for assumptions
  const increaseHeight = document.querySelector("mobile-screen-container");
  const toggleAssumptions = () => {
    setShowAssumptions((prev) => !prev);
    increaseHeight.style.height = "calc(100vh - 50px)"
  };

  // Function to handle modal open and close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRentApi = async () => {
    try {
      setError(null);
      setLoading(true);

      // Convert house_cost from crores to actual value (1 crore = 10,000,000)
      const actualHouseCost = house_cost * 10000000;

      // Convert monthly_rent from thousands to actual value
      const actualMonthlyRent = monthly_rent * 1000; // Convert to rupees

      let loan_ratio = 100 - down_payment;
      let LTCG = 12.5;


      const response = await rentvsbuy(
        tax_Bracket,
        reinvestment,
        property_inflation,
        opportunity_cost_interest,
        buy_closing_cost,
        maintenance_cost,
        home_insurance,
        rent_inflation,
        security_deposit,
        rent_closing_cost,
        average_shifting_home,
        shifting_cost,
        actualHouseCost, // Send converted house cost
        actualMonthlyRent, // Send converted monthly rent
        loan_tenure,
        loan_ratio,
        loan_rate,
        STCG,
        LTCG,
        down_payment
      );

      setSaturationYear(response.saturationYear);
     setRentArray([0, ...response.cumulative_array]);
      setBuyArray([0, ...response.rent_comulative_array]);
      console.log([0, ...response.cumulative_array]);
      console.log([0, ...response.rent_comulative_array]);
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call is done
    }
  };
const rentData = rentArray;
    const buyData = buyArray;

    // console.log("rentData-console",rentData)
    // console.log("buyData-console",buyData)
    // console.log(rentData-buyData)
    const rent = rentData.map((data)=>{
      console.log("value of rentData",data)
    })
    const buy = buyData.map((data)=>{
      console.log("value of buyData",data)
    })


    console.log(rent - buy)

  const getIntersection = () => {
    const rentData = rentArray;
    const buyData = buyArray;


    for (let i = 1; i < rentData.length; i++) {
      const prevRent = rentData[i - 1];
      const prevBuy = buyData[i - 1];
      const currentRent = rentData[i];
      const currentBuy = buyData[i];

      // Check if the lines cross between two consecutive points
      if (
        (prevRent < prevBuy && currentRent > currentBuy) ||
        (prevRent > prevBuy && currentRent < currentBuy)
      ) {
        // Calculate the intersection point using linear interpolation
        const slopeRent = currentRent - prevRent;
        const slopeBuy = currentBuy - prevBuy;
        const slopeDifference = slopeRent - slopeBuy;

        // Calculate how far along the interval the lines intersect
        const t = (prevBuy - prevRent) / slopeDifference;
        const x = parseFloat((i - 1 + t).toFixed(2)); // The exact x-coordinate of the intersection
        const y = parseFloat((prevRent + slopeRent * t).toFixed(2)); // The exact y-coordinate of the intersection

        console.log("x-value is parseFloat((i - 1 + t).toFixed(2)); // The exact x-coordinate of the intersection",x)
        console.log("y-value is parseFloat((prevRent + slopeRent * t).toFixed(2)); // The exact y-coordinate of the intersection",y)
        console.log("t-value is (prevBuy - prevRent) / slopeDifference",t)
        console.log("slopeRent is currentRent - prevRent",slopeRent)
        console.log("slopeBuy is currentBuy - prevBuy",slopeBuy)

        return { x, y };
      }
    }
    return null;
  };

  const intersectionPoint = getIntersection();

  const intersectionPlugin = {
    className:"chart-container",
    id: "intersectionCircle",
    afterDatasetsDraw(chart) {
      const { ctx, scales, chartArea } = chart;
      const isMobile = window.innerWidth < 600; // Check if mobile

      if (saturationYear < rentArray.length) {
        const xCoord = scales.x.getPixelForValue(saturationYear);
        const yCoord = scales.y.getPixelForValue(rentArray[saturationYear]);

        // Mobile-specific adjustments
        const fontSize = isMobile ? 10 : 12;
        const fontFamily = "Poppins, Arial, sans-serif";
        const maxTextWidth = isMobile ? 100 : 150;
        const padding = isMobile ? 8 : 10;
        const lineHeight = isMobile ? 14 : 16;
        const xOffset = isMobile ? 50 : 100;

        const text = `If you wish to stay in this house for more than ${saturationYear.toFixed(
          1
        )} years, Buying is more profitable.`; // Display saturation year in decimal

        // Text wrapping function
        function wrapText(ctx, text, maxWidth) {
          ctx.font = `bold ${fontSize}px ${fontFamily}`;
          const words = text.split(" ");
          let line = "";
          const lines = [];

          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth && n > 0) {
              lines.push(line);
              line = words[n] + " ";
            } else {
              line = testLine;
            }
          }
          lines.push(line.trim());
          return lines;
        }

        const lines = wrapText(ctx, text, maxTextWidth);
        const boxWidth = Math.min(
          maxTextWidth + padding * 2,
          chartArea.right - xCoord - 10 // Ensure it doesn't go off chart
        );
        const boxHeight = lines.length * lineHeight + padding * 2;

        // Position adjustment for mobile
        const boxX = Math.min(
          xCoord + xOffset,
          chartArea.right - boxWidth / 2 - 10 // Keep within chart bounds
        );
        const boxY = yCoord - boxHeight - (isMobile ? 20 : 30);

        // Draw text box
        ctx.save();

        // Simplified box for mobile
        if (isMobile) {
          ctx.beginPath();
          ctx.roundRect(boxX - boxWidth / 2, boxY, boxWidth, boxHeight, 8);
        } else {
          // Fancy box for desktop
          ctx.beginPath();
          ctx.moveTo(boxX - boxWidth / 2, boxY);
          // ... [keep your existing fancy box path code]
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();

        if (!isMobile) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
          ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 5;
        }

        // Draw text
        ctx.fillStyle = "black";
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        let textY = boxY + padding;
        lines.forEach((line) => {
          ctx.fillText(line, boxX, textY);
          textY += lineHeight;
        });

        ctx.restore();
      }
    },
  };

  // const yearLabels = generateYearLabels(loan_tenure);
  const yearLabels = generateYearLabels(loan_tenure);

  const data = {
    labels: yearLabels,
    datasets: [
      {
        data: rentArray,
        borderColor: "#f5a623",
        backgroundColor: "rgba(245, 166, 35, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        data: buyArray,
        borderColor: "#00a0df",
        backgroundColor: "rgba(0, 160, 223, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  // const formatNumber = (num) => {
  //   let formattedNumber;
  //   if (Math.abs(num) >= 1.0e7) {
  //     formattedNumber = (num / 1.0e7).toFixed(1); // Format as Crore
  //   } else if (Math.abs(num) >= 1.0e5) {
  //     formattedNumber = (num / 1.0e5).toFixed(1); // Format as Lakh
  //   } else {
  //     formattedNumber = num;
  //   }

  //   // Remove decimals if the first decimal digit is 0
  //   if (String(formattedNumber).endsWith(".0")) {
  //     formattedNumber = String(formattedNumber).split(".")[0];
  //   }

  //   return formattedNumber + (Math.abs(num) >= 1.0e7 ? " Crore" : Math.abs(num) >= 1.0e5 ? " Lakh" : "");
  // };

  const formatNumber = (num) => {
    if (Math.abs(num) >= 1.0e7) {
      return (num / 1.0e7).toFixed(1) + " Cr"; // Format as Crore
    } else if (Math.abs(num) >= 1.0e5) {
      return (num / 1.0e5).toFixed(1) + " L"; // Format as Lakh
    } else {
      return num;
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 30, // Increase left padding to accommodate the text
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return value === 0 ? "" : value;
          },
          font: {
            size: window.innerWidth < 600 ? 10 : 12,
          },
        },
      },
      y: {
        min: 0,
        max: house_cost <= 3 ? house_cost * 1.0e7 : 3.0e7,
        ticks: {
          stepSize: house_cost <= 3 ? 0.25e7 : 0.5e7,
          callback: (value) => formatNumber(value),
          precision: 0,
          font: {
            size: window.innerWidth < 600 ? 10 : 12,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: "#000", // Add y-axis line color
          width: 0, // Set y-axis line width
          display: true, // Show y-axis line
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      customTitle: {
        id: "customTitle",
        afterDatasetsDraw(chart) {
          const {
            ctx,
            chartArea: { top, bottom, left, right },
          } = chart;

          // Draw vertical line on y-axis
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(left - 50, top - 50);
          ctx.lineTo(left - 50, bottom - 50);
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.restore();

          // Draw vertical text
          ctx.save();
          ctx.font = "bold 16px Poppins, Arial, sans-serif";
          ctx.fillStyle = "#333";
          ctx.translate(left - 60, (top + bottom) / 2); // Position text to left of y-axis
          ctx.rotate(-Math.PI / 2); // Rotate 90 degrees counter-clockwise
          ctx.textAlign = "center";
          ctx.fillText("Total Cost Incurred", 0, 0);
          ctx.restore();
        },
      },
    },
  };

  return (
    <>
    <Header/>
    <Container className="calculator-container" maxWidth="lg" sx={{ padding: "16px", backgroundColor: "white",textAlign:"left",marginTop:"7%" }}>
  <Typography
    variant="h1"
    mb={1}
    sx={{ 
      fontWeight: "bold", 
      color: "black",
      fontSize: { xs: 20, md: 32 }
    }}
  >
    Rent vs Buy Calculator
  </Typography>
  <Typography 
    component="p"  // Changed from variant="p" to component="p" for proper HTML semantics
    sx={{ 
      fontSize: { xs: 12, md: "16px" }, 
      color: "black",
      lineHeight: 1.5  // Added for better readability
    }}
  >
    Should you rent or buy a home? Our simple rent vs buy calculator compares the long-term costs of renting versus purchasing a property, helping you make an informed financial decision.
  </Typography>
      <Grid container>
      <Grid item md={12} sx={{ display: { xs: "block", md: "block" }, textAlign: "left", px: { md: 3 },ml:3,marginTop:"5%" }}>
</Grid>
        {/* Chart Section */}
        <Grid item xs={12} md={8}>
          <Box
            height={{ xs: 280, md: 400 }}
            mb={2}
            p={1}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              marginBottom: "16px",
              marginRight:"5%",
                            paddingLeft: { xs: 0, },
            }}
          >
            <Line
              key={saturationYear}
              data={data}
              options={options}
              plugins={[intersectionPlugin, options.plugins.customTitle]}
            />
          </Box>

          <Grid
  container
  px={5}
  spacing={2}
  mb={2}
  sx={{
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    maxWidth: '800px', // Optional: constrain max width for better centering
    margin: '0 auto' // This centers the entire container
  }}
>
  <Grid item xs={6}>
    <Box 
      display="flex" 
      alignItems="center"
      justifyContent="center" // Add this to center the content within the Grid item
    >
      <Box
        sx={{
          width: "50%",
          height: 7,
          borderRadius:"7px",
          backgroundColor: "#f5a623",
          marginRight: "8px",
        }}
      />
      <Typography variant="h6" className="sub-headings">Renting</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box 
      display="flex" 
      alignItems="center"
      justifyContent="center" // Add this to center the content within the Grid item
    >
      <Box
        sx={{
          width: "50%",
          height: 7,
          borderRadius:"7px",
          backgroundColor: "#00a0df",
          marginRight: "8px",
        }}
      />
      <Typography variant="h6" className="sub-headings">Buying</Typography>
    </Box>
  </Grid>
</Grid>

   {/* Legend */}
           <Grid
            container
            spacing={2}
            mb={2}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 2,
                    backgroundColor: "#f5a623",
                    marginRight: "8px",
                  }}
                />
                <Typography sx={{ color: { xs: "#505050",fontWeight:"bold" } }}>Renting</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 2,
                    backgroundColor: "#00a0df",
                    marginRight: "8px",
                    
                  }}
                />
                <Typography  sx={{ color: { xs: "#505050",fontWeight:"bold" } }}>Buying</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-Side Content Section */}
        <Grid item xs={12} md={4} className="mobile-screen-container" sx={{
    border: { xs: "none", md: "1px solid black" },
    borderRadius: { xs: "none", md: "25px" },
    paddingRight: { md: "24px" },
    // marginTop: { md: "24px" },
    padding:"22px",
    height: {
      md: showAssumptions
        ? "calc(100vh - 64px + 500px)"
        : "calc(100vh - 100px)",
    },
    transition: "height 0.3s ease", // Smooth animation
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px",
      display: "none",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#0086AD",
      borderRadius: "8px",
      border: "2px solid #f0f0f0",
      display: "none",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#005f73",
      display: "none",
    },
  }}
>
         

          {/* Learn How We Calculate */}
          <Typography
            variant="body1"
            textAlign="left"
            fontWeight="bold"
            sx={{ mb: "16px", color: "#505050", textDecoration: "underline",cursor: "pointer",textAlign:{xs:'center',md:'left'} }}
            onClick={handleOpenModal}
          >
            Learn How We Calculate
          </Typography>

          {/* Location Input */}
          {/* <Typography textAlign="left">Where would you want to stay?</Typography> */}
          {/* <TextField
            variant="outlined"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: "16px" }}
          >
            <option value="Delhi" selected>
              Delhi
            </option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </TextField> */}

          {/* Cost Of House Today */}
          <Typography gutterBottom textAlign="left" sx={{ fontWeight: "bold",fontSize:{xs:'16px',md:'16px'} }}>
            Cost Of House Today
          </Typography>
          <Slider
          trackColor="#"
          thumbColor="#"
          railColor="#"
          valueLabelColor="#"
            value={house_cost}
            onChange={handleCostOfHouseChange}
            onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
            min={1}
            max={3}
            step={0.25}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value} Cr`}
            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "#0086AD",
                height: 8, // Adjust track thickness
                border: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 8, // Adjust rail thickness
              },
              "& .MuiSlider-thumb": {
                backgroundColor: "#0086AD",
                border: "2px solid white",
                width: 20, // Adjust thumb size (width)
                height: 20, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#DCF7FF",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
                borderRadius: "20px",
                padding: "8px",
                paddingX: "16px",
                "&:before": {
                  display: "none",
                },
                "& *": {
                  transform: "none",
                },
              },
            }}
          />

          {/* Slider Labels */}
          <Grid
            container
            justifyContent="space-between"
            sx={{ mt: "-8px", mb: "16px" }}
          >
            <Grid item>
              <Typography>1 Cr</Typography>
            </Grid>
            <Grid item>
              <Typography>3 Cr</Typography>
            </Grid>
          </Grid>

          {/* Monthly Rent */}
          <Typography gutterBottom textAlign="left" sx={{ fontWeight: "bold",fontSize:{xs:'16px',md:'16px'} }}>
            Monthly Rent
          </Typography>
          <Slider
            value={monthly_rent}
            onChange={handleMonthlyChange}
            onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
            min={((2.5 / 100) * (house_cost * 10000000)) / 12 / 1000} // Minimum value in thousands
            max={((3.5 / 100) * (house_cost * 10000000)) / 12 / 1000} // Maximum value in thousands
            step={1} // Adjust step size as needed
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value.toFixed(0)} K`} // Display value in thousands
            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "#EF9C00",
                height: 8, // Adjust track thickness
                border: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 8, // Adjust rail thickness
              },
              "& .MuiSlider-thumb": {
                backgroundColor: "#EF9C00",
                border: "2px solid white",
                width: 20, // Adjust thumb size (width)
                height: 20, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#FFF4D3",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
                borderRadius: "20px",
                padding: "8px",
                paddingX: "16px",
                "&:before": {
                  display: "none",
                },
                "& *": {
                  transform: "none",
                },
              },
            }}
          />

          {/* Slider Labels */}
          <Grid
            container
            justifyContent="space-between"
            sx={{ mt: "-8px", mb: "16px" }}
          >
            <Grid item>
              <Typography>
                {(((2.5 / 100) * (house_cost * 10000000)) / 12 / 1000).toFixed(
                  0
                )}{" "}
                K
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {(((3.5 / 100) * (house_cost * 10000000)) / 12 / 1000).toFixed(
                  0
                )}{" "}
                K
              </Typography>
            </Grid>
          </Grid>

          {/* Stats */}
          <Grid container spacing={2} mb={2} >
            <Grid item xs={6} sx={{ p: "8px", }}>
              <Card>
                <CardContent sx={{ paddingX: "8px", background:"#ececec" }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      fontSize: 16, // Set font size to 20px
                     
                    }}
                  >
                    {loan_tenure}
                  </Typography>
                  <Typography textAlign="center">Years</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sx={{ p: "8px" }}>
              <Card sx={{ backgroundColor: "#FFF5D7" }}>
                <CardContent sx={{ paddingX: "8px" }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    INR {monthly_rent.toFixed(0)}
                    {"k"}
                  </Typography>
                  <Typography textAlign="center">Rent</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sx={{ p: "8px" }}>
              <Card sx={{ backgroundColor: "#D7EFFF" }}>
                <CardContent
                  sx={{
                    paddingX: "8px",
                    textAlign: "center", // Add this to center all content
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "inherit", // Inherits from CardContent
                    }}
                  >
                    INR {house_cost}
                    {" Cr"}
                  </Typography>
                  <Typography sx={{ textAlign: "inherit" }}>Buy</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Toggle Button for Assumptions */}
          <Grid container justifyContent="end" alignItems="center">
            <Button variant="text" onClick={toggleAssumptions}>
              <Typography
                color="#505050"
                fontWeight="bold"
                textAlign="left"
                textTransform="none" 
                fontSize="16px"// This will prevent uppercase transformation
              >
                View Assumed Values
              </Typography>
              <IconButton
                size="small"
                sx={{
                  marginLeft: "4px",
                  padding: "4px",
                }}
              >
                {showAssumptions ? (
                  <MdOutlineExpandLess />
                ) : (
                  <MdOutlineExpandMore />
                )}
              </IconButton>
            </Button>
          </Grid>

          {/* Assumptions Section */}
          {showAssumptions && (
            <Box mt={2} sx={{ padding: "4px" }}>
              <Typography
               variant="h6"
               gutterBottom
               textAlign="left"
               fontWeight="bold"
                className="sub-headings"
              >
                Assumptions
              </Typography>
              {/* <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus.
              </Typography> */}

              {/* Mortgage Section */}
              <Typography
                variant="h6"
                gutterBottom
                textAlign="left"
                fontWeight="bold"
                className="sub-headings"
              >
                Mortgage
              </Typography>
              <CustomSlider
                title="Down Payment"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                value={down_payment}
                onChange={handleDownPaymentChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                min={25}
                max={75}
                step={5}
                percent={true}
              />

              <CustomSlider
                title="Loan to Value"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                value={loan_ratio}
                onChange={handleLoanRatioChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                min={25}
                max={75}
                step={5}
                percent={true}
              />

              <CustomSlider
                title="Loan Rate (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                value={loan_rate}
                onChange={handleLoanRatePerYearChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                min={8}
                max={10}
                step={0.25}
                percent={true}
              />
              <CustomSlider
                title="Loan Tenure"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleLoanTenureChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={loan_tenure}
                min={10}
                max={20}
                step={5}
                percent={false}
              />

              {/* Mortgage Section */}
              <Typography variant="h6" gutterBottom textAlign="left">
                Tax
              </Typography>
              <Typography >Tax Bracket</Typography>
              {/* Location Input */}
              <TextField
                // variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={tax_Bracket}
                onChange={(e) => setTaxBracket(e.target.value)}
                sx={{ mb: "16px",    borderRadius: "15px",
                  border: "1px solid black" }}
              >
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30" selected>
                  30%
                </option>
              </TextField>

              <Typography textAlign="left">Reinvestment</Typography>
              {/* Location Input */}
              <TextField
                variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={reinvestment}
                onChange={(e) => setReinvestment(e.target.value)}
                sx={{ mb: "16px", borderRadius: "15px",
                  border: "1px solid black" }}
              >
                <option value="yes" selected>
                  Yes
                </option>
                <option value="no">No</option>
              </TextField>

              <Box sx={{ paddingY: "8px" }}>
                <Typography gutterBottom>STCG</Typography>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                >
                  20%
                </Box>
              </Box>

              <Box sx={{ paddingY: "8px" }}>
                <Typography gutterBottom>LTCG</Typography>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                >
                  12.50%
                </Box>
              </Box>

              <Typography
                fontWeight="bold"
                variant="h6"
                gutterBottom
                sx={{ paddingTop: "8px", textAlign: "left" }}
              >
                Buy
              </Typography>
              <CustomSlider
                title="Property Inflation (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handlePropertyInflationChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={property_inflation}
                min={4.5}
                max={7}
                step={0.5}
                percent={true}
              />
              <CustomSlider
                title="Opportunity Cost Interest (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleOpportunityCostIntChange}
                value={opportunity_cost_interest}
                min={7}
                max={10}
                step={1}
                percent={true}
              />
              <CustomSlider
                title="Closing Costs (% of property value)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleClosingCostChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={buy_closing_cost}
                min={1}
                max={3}
                step={1}
                percent={true}
              />
              <CustomSlider
                title="Maintenance Cost (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleMaintenanceCostChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={maintenance_cost}
                min={0.5}
                max={1.5}
                step={0.5}
                percent={true}
              />
              <CustomSlider
                title="Home Insurance (per lakh)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleHomeInsuranceChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={home_insurance}
                min={100}
                max={200}
                step={50}
              />

              <Typography
                fontWeight="bold"
                variant="h6"
                gutterBottom
                sx={{ paddingTop: "8px", textAlign: "left" }}
              >
                Rent
              </Typography>
              <CustomSlider
                title="Rent Inflation (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleRentInflationChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={rent_inflation}
                min={8}
                max={10}
                step={0.5}
                percent={true}
              />
              <CustomSlider
                title="Security Deposit (x months rent)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleSecurityDepositChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={security_deposit}
                min={2}
                max={8}
                step={2}
              />
              <CustomSlider
                title="Closing Costs (x months rent)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleClosingCostRentChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={rent_closing_cost}
                min={1}
                max={3}
                step={1}
              />
              <CustomSlider
                title="Average Shifting of Homes (years)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleAverageShiftingChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={average_shifting_home}
                min={2}
                max={4}
                step={1}
              />
              <CustomSlider
                title="Shifting Costs / Misc (x months rent)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleShiftingCostChange}
                onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
                value={shifting_cost}
                min={1}
                max={2}
                step={0.5}
              />
            </Box>
          )}
          {/* Modal Implementation */}
          <Dialog
  sx={{ 
    zIndex: 9999999999,
    '& .MuiDialog-paper': {
      borderRadius: "12px", // Changed from 50px for better aesthetics
      width: { xs: "90vw", md: "600px" }, // Better responsive width
      maxWidth: "none",
      position: "relative" // Needed for absolute positioning of close button
    }
  }}
  open={openModal}
  onClose={handleCloseModal}
>
  <DialogActions sx={{ 
    position: "absolute",
    right: 16,
    top: 16,
    padding: 0
  }}>
    <IconButton
      onClick={handleCloseModal}
      sx={{ 
        color: "black",
        '&:hover': {
          backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
      }}
    >
      
    <img src={closeBar} alt="" />
    </IconButton>
  </DialogActions>
  
  <DialogContent sx={{ paddingTop: "40px" }}> {/* Added padding to prevent content overlap */}
    <Typography variant="body1" paragraph>
      <strong>Methodology & Key Assumptions</strong>
      <br></br> Our calculator performs a
      year-by-year comparison of total ownership costs versus renting
      expenses. 
      
      <br /><br />For buying scenarios, we calculate: EMI payments
      (principal + interest), maintenance (0.6% of property value
      annually), property taxes, insurance (₹100 per lakh), and
      closing costs (1% of home value). 
      <br /><br />For renting, we account for
      monthly rent (with 9% annual escalation), security deposits (2
      months' rent), and shifting costs (1 month's rent every 3
      years). 
      <br /><br />The model incorporates opportunity costs - your down
      payment and monthly savings (EMI minus rent difference) are
      assumed to earn 7% if invested elsewhere. Home value appreciates
      at 6% annually while accounting for capital gains tax upon sale.
    </Typography>
  </DialogContent>
</Dialog>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={8}>
                    {/* Text Below the Chart */}
          <Box sx={{ display: { xs: "block", md: "block",textAlign:'left'}, mt: 1, mr: 1,ml:1 }}>
            <Typography variant="h6" mb={2} textAlign={"left"} sx={{  fontSize:{xs:"14px", md:"20px",color:"#000"} }}>
              How to Use This Rent vs. Buy Calculator
            </Typography>
            <>
              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                Deciding whether to rent or buy a home in India isn't just about
                comparing monthly costs—it's about long-term wealth, opportunity
                costs, and lifestyle goals. Our calculator goes deeper than most
                by factoring in:
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                • Hidden ownership costs (stamp duty, maintenance, shifting
                charges)
                <br />
                • Loan realities (pre-EMI interest, partial prepayments, tax
                benefits)
                <br />
                • Rent inflation (9% average in metros)
                <br />• Opportunity costs (what your down payment could earn if
                invested)
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                General Assumptions
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                The analysis uses these baseline parameters which you can
                customize:
                <br />
                • Loan terms: 25% down payment, 8% interest rate, 20-year tenure
                <br />
                • Property costs: 1% closing fees, 0.6% maintenance, ₹100/lakh
                insurance
                <br />
                • Rent parameters: 9% yearly increase, 2-month deposit, 3-year
                shifting cycle
                <br />
                • Growth rates: 6% home appreciation, 7% investment returns
                <br />
                • Tax treatment: 30% income tax bracket with applicable
                deductions
                <br />• Transaction costs: 1 month's rent for rental agreements,
                1% of home value for buyer closing
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                All currency values are inflation-adjusted to present-day terms.
                The break-even point identifies when cumulative buying costs
                (including lost investment income) become lower than lifetime
                renting expenses.
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                Beyond the Numbers: Key Lifestyle Factors to Consider
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                While financial calculations are crucial, your personal
                circumstances play an equally important role in the rent vs. buy
                decision. Here are the human factors to weigh:
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                1. Stability vs. Flexibility
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                <strong>• Buying makes sense if:</strong>
                <br />
                &nbsp; &nbsp;• You plan to stay in the city for 5+ years
                <br />
                &nbsp; &nbsp;• Want to customize your living space (renovations/pets)
                <br />
                &nbsp; &nbsp;• Seek long-term community roots (schools/neighbors)
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                <strong>• Renting works better if:</strong>
                <br />
                &nbsp; &nbsp;• Your job requires frequent relocation
                <br />
                &nbsp; &nbsp;• You value hassle-free maintenance (landlord handles repairs)
                <br />
                &nbsp; &nbsp;• Prefer testing neighborhoods before committing
              </Typography>

            </>




            <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                2. Emotional Value
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                <strong>Owning </strong>provides:
                <br />
                &nbsp; &nbsp;• Sense of pride/permanence
                <br />
                &nbsp; &nbsp;• Freedom to decorate without restrictions
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                <strong>• Renting </strong>offers:
                <br />
                &nbsp; &nbsp;• Less stress about market fluctuations
                <br />
                &nbsp; &nbsp;• Ability to upgrade/downgrade as needs change
              </Typography>




              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                3. Hidden Efforts
              </Typography>

              <Typography
                mb={2}
                variant="body1"
               sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                <strong>• Homeownership </strong>means:
                <br />
                &nbsp; &nbsp;• Time spent on maintenance/paperwork
                <br />
                &nbsp; &nbsp;• Responsibility for sudden repairs (plumbing, electrical)
              </Typography>

              <Typography
                mb={2}
                variant="body1"
sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                <strong>• Renting </strong>involves:
                <br />
                &nbsp; &nbsp;• Annual lease negotiations
                <br />
                &nbsp; &nbsp;• Risk of rent hikes or owner selling the property
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                4. Future Life Plans
              </Typography>

              <Typography
                mb={2}
                variant="body1"
sx={{  fontSize:{xs:"12px", md:"16px",color:"#000"} }}
              >
                Consider:
                <br />
                &nbsp; &nbsp;• Family expansion (more space needed?)
                <br />
                &nbsp; &nbsp;• Aging parents (accessibility requirements?)
                <br />
                &nbsp; &nbsp;• Retirement goals (will property help or hinder?)
                <br />
                <strong>Pro Tip: </strong>Even if buying wins financially, ask: "Does this align with my next 5 years?" A ₹20L savings means little if you’re transferred abroad next year!
              </Typography>

          </Box>

        
        </Grid>
      </Grid>
    </Container>

    <Footer/>
    </>
  );
};

export default Calculator;
