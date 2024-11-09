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
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
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
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const levelwisedata = [
  {
    id: 1,
    name: "Pakistan",
  },
  {
    id: 2,
    name: "India",
  },
];
function Shipment() {
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const { register, control, handleSubmit, errors } = useForm();
  const { columns, rows } = shipmentTableData();
  const [measurementUnit, setMeasurementUnit] = useState("poundsOunces");
  const [dimensionUnit, setDimensionUnit] = useState("inches");
  const [shipInfo, setShipInfo] = useState({
    weightKG: 0.0,
    weightGM: 0.0,
  });

  const handleChangeInfoData = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setShipInfo({ ...shipInfo, [name]: value });
  };
  const handleChangeWeight = (e) => {
    e.preventDefault();
    let name = e.target.name;
    if (e.target.value === "") {
      setShipInfo({ ...shipInfo, [name]: e.target.value });
    } else {
      let value = parseFloat(e.target.value);
      let weight = 0;
      if (name === "weightKG") {
        weight = value * 1000;
        setShipInfo({ ...shipInfo, weightKG: value, weightGM: weight });
      } else if (name === "weightGM") {
        weight = value / 1000;
        setShipInfo({ ...shipInfo, weightKG: weight, weightGM: value });
      }
    }
  };

  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });
  const handleChange = () => {};
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAutoCompleteAccountID = (e, id) => {};
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox
        sx={{
          height: "75vh", // Set a fixed height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          padding: 2,
          background: "lightgray",
          marginY: 2,
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 400, padding: "20px" }}>
              <CardHeader
                title="Search Rates"
                titleTypographyProps={{ align: "center", fontWeight: "bold" }}
              />

              <CardContent>
                {/* Ship To */}
                <Typography variant="h6" mt={2} mb={1}>
                  Ship To
                </Typography>

                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    fullWidth
                    name="creditAccountId"
                    options={levelwisedata?.map((option) => ({
                      id: option.id,
                      label: option.name,
                    }))}
                    onChange={(e, a, b) => handleAutoCompleteAccountID(e, a.id, b.label)}
                    renderInput={(params) => (
                      <TextField name="creditAccountId" required {...params} label="Country" />
                    )}
                  />
                </FormControl>
                {/* <FormControl fullWidth margin="normal">
                  <TextField
                    select
                    label="From Country"
                    value={country}
                    onChange={(e) => handleChangeInfoData(e)}
                    fullWidth
                    name="toCountryId"
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value={null}>
                      United Kingdom of Great Britain and Northern Ireland
                    </option>
                    <option value="UK">United Kingdom of Great Britain and Northern Ireland</option>
                  </TextField>
                </FormControl> */}
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="City"
                    onChange={(e) => handleChangeInfoData(e)}
                    name="ToCityName"
                    fullWidth
                  />
                  <TextField
                    label="Postal Code"
                    onChange={(e) => handleChangeInfoData(e)}
                    name="toPostalCode"
                    fullWidth
                  />
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
                    {/* <FormControlLabel
                      value="poundsOunces"
                      control={<Radio />}
                      label="Pounds & Ounces"
                    /> */}
                    <FormControlLabel value="grams" control={<Radio />} label="Grams" />
                  </RadioGroup>
                </FormControl>

                {/* Weight Inputs */}
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Weight (KG)"
                    onChange={(e) => handleChangeWeight(e)}
                    value={shipInfo?.weightKG}
                    name="weightKG"
                    fullWidth
                  />
                  <TextField
                    label="Weight (GM)"
                    name="weightGM"
                    onChange={(e) => handleChangeWeight(e)}
                    value={shipInfo?.weightGM}
                    fullWidth
                  />
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
                    <Icon icon={"material-symbols:search"}></Icon>
                    Search
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={(e) => navigate("/shipment")}
                    style={{ color: "grey" }}
                  >
                    <Icon icon={"material-symbols:close"}></Icon>
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Left Side: Economy Option */}
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={8}>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Form in Modal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Field 1"
                name="field1"
                value={formData.field1}
                onChange={handleChange}
              />
            </Grid>
            {/* Row 2 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Field 2"
                name="field2"
                value={formData.field2}
                onChange={handleChange}
              />
            </Grid>
            {/* Row 3 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Field 3"
                name="field3"
                value={formData.field3}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Shipment;
