// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import toast from "react-hot-toast";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { ArrowDownward } from "@mui/icons-material";
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
  Icon,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddNewCompany } from "store/company";

function AddCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, control, handleSubmit, errors } = useForm();

  const [companyInfo, setCompanyInfo] = useState({
    createdBy: 3,
    maxUser: 1,
    isActive: true,
  });

  const handleCompanyInfoChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };
  const handleIsActive = (e) => {
    let value = e.target.checked;
    setCompanyInfo({ ...companyInfo, isActive: value });
  };

  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });
  const handleSaveCompany = () => {
    const body = companyInfo;
    dispatch(AddNewCompany(body));
    navigate("/company");
  };
  const handleChange = () => {};
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAutoCompleteAccountID = (e, id) => {};
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox
        sx={{
          height: "69vh", // Set a fixed height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          padding: 2,
          background: "lightgray",
          marginY: 2,
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <Card sx={{ maxWidth: "100%", padding: "20px" }}>
              <CardHeader
                title="Add New Company"
                titleTypographyProps={{ align: "center", fontWeight: "bold" }}
              />

              <CardContent>
                {/* Weight Inputs */}
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Company Name"
                    value={companyInfo?.companyName}
                    onChange={(e) => handleCompanyInfoChange(e)}
                    name="companyName"
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={companyInfo?.email}
                    onChange={(e) => handleCompanyInfoChange(e)}
                    fullWidth
                  />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Contact No"
                    value={companyInfo?.contactNo}
                    name="contactNo"
                    onChange={(e) => handleCompanyInfoChange(e)}
                    fullWidth
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={companyInfo?.address}
                    onChange={(e) => handleCompanyInfoChange(e)}
                    fullWidth
                  />
                </Box>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Label Count"
                    type="number"
                    name="labelCount"
                    value={companyInfo?.labelCount}
                    onChange={(e) => handleCompanyInfoChange(e)}
                    fullWidth
                  />
                  <TextField
                    label="Max User Limit"
                    type="number"
                    name="maxUser"
                    value={companyInfo?.maxUser}
                    onChange={(e) => handleCompanyInfoChange(e)}
                    fullWidth
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={companyInfo?.isActive}
                      onChange={(e) => handleIsActive(e)}
                      name="checked"
                      color="primary" // color can be 'primary', 'secondary', or 'default'
                    />
                  }
                  label="Account Active"
                />

                {/* Package */}
                {/* <FormControl fullWidth margin="normal">
                  <FormLabel>Package</FormLabel>
                  <Select defaultValue="All Package Types">
                    <MenuItem value="All Package Types">All Package Types</MenuItem>
                    {/* Add more options as needed 
                  </Select>
                </FormControl> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display="flex" style={{ justifyContent: "center" }} gap={2} mb={2}>
            <Button variant="contained" style={{ color: "#fff" }} onClick={handleSaveCompany}>
              <Icon fontSize="large">save</Icon>
              Save
            </Button>

            <Button
              variant="outlined"
              onClick={(e) => navigate("/company")}
              style={{ color: "grey" }}
            >
              <Icon fontSize="large">close</Icon>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>

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

export default AddCompany;
