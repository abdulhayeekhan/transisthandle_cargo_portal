// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { ArrowDownward } from "@mui/icons-material";
// Data
import shipmentTableData from "layouts/shipment/data/shipmenttable";
import {
  Button,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Box,
  Badge,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shipment() {
  const navigate = useNavigate();
  const { columns, rows } = shipmentTableData();
  const [measurementUnit, setMeasurementUnit] = useState("poundsOunces");
  const [dimensionUnit, setDimensionUnit] = useState("inches");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 400, padding: "20px" }}>
              <CardHeader
                title="Search Rates"
                titleTypographyProps={{ align: "center", fontWeight: "bold" }}
              />

              <CardContent>
                {/* Ship From */}
                <Typography variant="h6">Ship From</Typography>
                <FormControl fullWidth margin="normal">
                  <Select defaultValue="ESCM GmbH">
                    <MenuItem value="ESCM GmbH">ESCM GmbH</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                {/* Ship To */}
                <Typography variant="h6" mt={2}>
                  Ship To
                </Typography>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Country"
                    defaultValue="United Kingdom of Great Britain and North"
                  />
                </FormControl>
                <Box display="flex" gap={2} mb={2}>
                  <TextField label="City" fullWidth />
                  <TextField label="Postal Code" fullWidth />
                </Box>
                <FormControlLabel control={<Checkbox />} label="Residential Address" />

                {/* Shipment Information */}
                <Typography variant="h6" mt={2}>
                  Shipment Information
                </Typography>

                {/* Weight Unit Selection */}
                <FormControl component="fieldset" fullWidth margin="normal">
                  <FormLabel component="legend">Weight Unit</FormLabel>
                  <RadioGroup
                    row
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value)}
                  >
                    <FormControlLabel
                      value="poundsOunces"
                      control={<Radio />}
                      label="Pounds & Ounces"
                    />
                    <FormControlLabel value="grams" control={<Radio />} label="Grams" />
                  </RadioGroup>
                </FormControl>

                {/* Weight Inputs */}
                <Box display="flex" gap={2} mb={2}>
                  <TextField label="Weight (LB)" defaultValue="1111.0000" fullWidth />
                  <TextField label="Weight (OZ)" defaultValue="17776.00" fullWidth />
                </Box>

                {/* Dimension Unit Selection */}
                <FormControl component="fieldset" fullWidth margin="normal">
                  <FormLabel component="legend">Dimension Unit</FormLabel>
                  <RadioGroup
                    row
                    value={dimensionUnit}
                    onChange={(e) => setDimensionUnit(e.target.value)}
                  >
                    <FormControlLabel value="inches" control={<Radio />} label="Inches" />
                    <FormControlLabel value="cm" control={<Radio />} label="Cm" />
                  </RadioGroup>
                </FormControl>

                {/* Size Inputs */}
                <Box display="flex" gap={2} mb={2}>
                  <TextField label="Size (L)" defaultValue="1111.00" fullWidth />
                  <TextField label="Size (W)" defaultValue="100.00" fullWidth />
                  <TextField label="Size (H)" defaultValue="100.00" fullWidth />
                </Box>

                {/* Package */}
                {/* <FormControl fullWidth margin="normal">
                  <FormLabel>Package</FormLabel>
                  <Select defaultValue="All Package Types">
                    <MenuItem value="All Package Types">All Package Types</MenuItem>
                    {/* Add more options as needed 
                  </Select>
                </FormControl> */}
                <Box display="flex" gap={2} mb={2}>
                  <Button variant="contained" style={{ color: "#fff" }} fullWidth>
                    Search
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={(e) => navigate("/shipment")}
                    style={{ color: "grey" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              {/* Left Side: Economy Option */}
              <Grid item xs={4}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    backgroundColor: "#FFEBEE",
                    borderLeft: "5px solid #FF5722",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {/* Arrow and Counter */}
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                      pr={1}
                      borderRight="1px solid #ddd"
                    >
                      <ArrowDownward color="error" />
                      <Typography variant="body2">1</Typography>
                      <Typography variant="body2">/</Typography>
                      <Typography variant="body2">2</Typography>
                    </Box>

                    {/* Economy Label */}
                    <Box display="flex" flexDirection="column" alignItems="center" px={1}>
                      <Typography variant="h6" color="textPrimary" sx={{ fontWeight: "bold" }}>
                        ECONOMY
                      </Typography>
                    </Box>

                    {/* Badge */}
                    <Badge badgeContent="0" color="warning" />
                  </Box>
                </Card>
              </Grid>

              {/* Right Side: Provider Information */}
              <Grid item xs={8}>
                <Card>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography variant="body1" color="textSecondary">
                      Provider
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Estimated Rates
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Shipment;
