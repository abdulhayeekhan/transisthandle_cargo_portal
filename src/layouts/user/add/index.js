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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddNewUser } from "store/account";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const roleId = loginInfo?.userLavel;
  const { register, control, handleSubmit, errors } = useForm();
  const [companyList, setCompanyList] = useState([]);
  const [curCompany, setCurCompany] = useState(null);

  const [userLavel, setUserLavel] = useState(3);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyId, setCompanyId] = useState(loginInfo?.companyId);
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");

  //   firstName": "Abdul Hayee",
  //   lastName": "Khan",
  //   userLavel":1,
  //   email":"abdulhayeekhan0@gmail.com",
  //   contactNo":"0321456987",
  //   password":"4727796a",
  //   companyId":1

  const GetCompanyData = async () => {
    const { data } = await axios.get(`${baseURL}/company/getAllList`);
    setCompanyList(data);
  };

  console.log("curCompany:", curCompany);

  useEffect(() => {
    GetCompanyData();
  }, []);
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
  const handleSaveInfo = () => {
    const body = {
      userLavel,
      firstName,
      lastName,
      companyId,
      email,
      contactNo,
      password,
    };
    console.log("body", body);
    dispatch(AddNewUser(body));
    navigate("/users");
  };
  const handleChange = () => {};
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCompanyChange = (event, newValue) => {
    if (newValue !== null) {
      console.log("state code:", newValue.id);
      setCompanyId(newValue.id);
      setCurCompany(newValue);
      //setShipStateCode(newValue?.code);
    } else {
      setCurCompany(null);
    }
  };

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
                title="Add New User"
                titleTypographyProps={{ align: "center", fontWeight: "bold" }}
              />

              <CardContent>
                {/* Weight Inputs */}
                <Box display="flex" gap={2} mb={2}>
                  {roleId === 1 || roleId === 2 ? (
                    <Autocomplete
                      fullWidth
                      name="creditAccountId"
                      size="medium"
                      options={companyList}
                      value={curCompany} // Bind the selected value (object with `id`, `label`, `code`)
                      onChange={handleCompanyChange}
                      getOptionLabel={(option) => `${option.companyName}`} // Combine `label` and `code` for display
                      renderInput={(params) => (
                        <TextField
                          name="creditAccountId"
                          size="medium"
                          required
                          {...params}
                          label="Company"
                        />
                      )}
                    />
                  ) : (
                    <></>
                  )}
                  {/* <FormControl fullWidth> */}
                  {/* <TextField
                    label="Right"
                    value={userLavel}
                    onChange={(e) => setUserLavel(e.target.value)}
                    variant="outlined"
                    fullWidth
                    select
                  >
                    <option>1</option>
                    <option>1</option>
                  </TextField> */}
                  <select
                    onChange={(e) => setUserLavel(e.target.value)}
                    value={userLavel}
                    label="Right"
                  >
                    {companyId === 1 ? (
                      <>
                        <option value={1}>HO Admin</option>
                        <option value={2}>HO User</option>
                      </>
                    ) : (
                      <>
                        <option value={3}>CO Admin</option>
                        <option value={4}>CO User</option>
                      </>
                    )}
                  </select>
                  {/* </FormControl> */}
                  <TextField
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Box>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="First Name"
                    name="labelCount"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Last Name"
                    name="maxUser"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                  />
                </Box>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Contact No"
                    value={contactNo}
                    name="contactNo"
                    required
                    onChange={(e) => setContactNo(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
            <Button variant="contained" style={{ color: "#fff" }} onClick={handleSaveInfo}>
              <Icon fontSize="large">save</Icon>
              Save
            </Button>

            <Button
              variant="outlined"
              onClick={(e) => navigate("/users")}
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
          <Button onClick={handleSaveInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default AddUser;
