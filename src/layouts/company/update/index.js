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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCompany, GetCompanyData } from "store/company";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

function EditCompany() {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [labelCount, setLabelCount] = useState("");
  const [maxUser, setMaxUser] = useState("");
  const [isActive, setIsActive] = useState("");

  const GetSingleCompanyData = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/company/getSingle/${companyId}`);
      console.log("companyInfoData:", data);
      setCompanyName(data?.companyName);
      setContactNo(data?.contactNo);
      setAddress(data?.address);
      setLabelCount(data?.labelCount);
      setMaxUser(data?.maxUser);
      setIsActive(data?.isActive);
      dispatch(GetCompanyData(companyId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetSingleCompanyData();
  }, []);
  const companyInfoData = useSelector((state) => {
    return state.CompanySlice;
  });
  console.log("companyInfoData", companyInfoData);
  const navigate = useNavigate();
  const companyInfo = companyInfoData?.data;

  const { register, control, handleSubmit, errors } = useForm();

  const handleIsActive = (e) => {
    let value = e.target.checked;
    // setCompanyInfo({ ...companyInfo, isActive: value });
  };
  useEffect(() => {}, []);
  console.log("isActive", isActive, "companyInfo", companyInfo);
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });
  const handleSaveCompany = () => {
    const body = {
      companyId,
      companyName,
      contactNo,
      address,
      labelCount,
      maxUser,
      isActive,
    };
    dispatch(UpdateCompany(body));
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
                title="Edit Company"
                titleTypographyProps={{ align: "center", fontWeight: "bold" }}
              />

              <CardContent>
                {/* Weight Inputs */}
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    name="companyName"
                    fullWidth
                  />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Contact No"
                    value={contactNo}
                    name="contactNo"
                    onChange={(e) => setContactNo(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                  />
                </Box>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Label Count"
                    type="number"
                    name="labelCount"
                    value={labelCount}
                    onChange={(e) => setLabelCount(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Max User Limit"
                    type="number"
                    name="maxUser"
                    value={maxUser}
                    onChange={(e) => setMaxUser(e.target.value)}
                    fullWidth
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
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

export default EditCompany;
