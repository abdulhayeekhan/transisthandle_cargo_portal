import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Radio,
  Box,
  Card,
  CardHeader,
  CardContent,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Autocomplete,
  Typography,
  Icon,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

function AddFlight() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userLavelId = userInfo?.userLavel;

  const [companyId, setClientCompanyId] = useState(
    userLavelId === 1 || userLavelId === 2 ? "" : userInfo?.companyId
  );

  const handleremoverow = async (id) => {
    const NewRecord = await declaration.filter((data) => data.arrayid !== id);
    setDeclaration(NewRecord);
  };

  const handleInputChange = (path, value) => {};

  const current = new Date();

  const shipDate = `${current.getFullYear()}-${("0" + (current.getMonth() + 1)).slice(-2)}-${(
    "0" + current.getDate()
  ).slice(-2)}`;

  const [companyList, setCompanyList] = useState([]);
  const [userList, setUserlist] = useState([]);
  const [curCompany, setCurCompany] = useState(null);
  const [curUser, setCurUser] = useState(null);
  const [curuserID, setCurUserID] = useState("");
  const GetCompanyData = async () => {
    const { data } = await axios.get(`${baseURL}/company/getAllList`);
    setCompanyList(data);
  };
  useEffect(() => {
    GetCompanyData();
  }, []);
  const handleCompanyChange = async (event, newValue) => {
    if (newValue !== null) {
      console.log("state code:", newValue.id);
      const { data } = await axios.get(`${baseURL}/account/getByCompany/${newValue?.id}`);
      setUserlist(data);
      setClientCompanyId(newValue.id);
      setCurCompany(newValue);
      //setShipStateCode(newValue?.code);
    } else {
      setCurCompany(null);
      setClientCompanyId("");
      setUserlist("");
    }
    setCurUser(null);
    setCurUserID("");
  };
  const handleUserChange = async (event, newValue) => {
    if (newValue !== null) {
      setCurUser(newValue);
      setCurUserID(newValue.id);
      //setShipStateCode(newValue?.code);
    } else {
      setCurUser(null);
      setCurUserID("");
    }
  };
  const [rowData, setRowData] = useState([]);
  console.log("rowData", rowData);
  const handleNewRow = (e) => {
    e.preventDefault();
    setRowData([
      ...rowData,
      {
        arrayid: uuidv4(),
        shipmentId: "",
        bags: 0,
        statusID: 0,
      },
    ]);
  };
  const handleSaveFlight = async () => {};
  const [trackingId, setTrackingId] = useState("");
  const [flightId, setFlightId] = useState("");
  const handleTracking = async (e) => {
    e.preventDefault();
    let body = {
      companyId: companyId,
      trackingNo: trackingId,
    };
    console.log("trackingId", trackingId);
    try {
      if (trackingId !== "") {
        const { data } = await axios.post(`${baseURL}/flight/GetTrackID`, body);
        console.log("response data:", data);
        if (rowData?.shipmentId !== data?.id) {
          setRowData([
            ...rowData,
            {
              arrayid: uuidv4(),
              shipmentId: data?.id,
              trackingNo: data?.trackingNo,
              bags: data?.bags,
              statusID: 0,
            },
          ]);
        }
        setTrackingId("");
      } else {
        toast.error("Please Enter Tracking ID");
      }
    } catch (error) {
      toast.error("" + error?.response?.data?.message);
    }
  };
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}

      <MDBox
        sx={{
          height: "60vh", // Set a fixed height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          padding: 2,
          marginY: 2,
        }}
      >
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {/* Top Section */}
              <Grid item xs={12}>
                <Typography>Flight</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Autocomplete
                  fullWidth
                  name="creditAccountId"
                  size="small"
                  options={companyList}
                  value={curCompany} // Bind the selected value (object with `id`, `label`, `code`)
                  onChange={handleCompanyChange}
                  getOptionLabel={(option) => `${option.companyName}`} // Combine `label` and `code` for display
                  renderInput={(params) => (
                    <TextField
                      name="creditAccountId"
                      size="small"
                      required
                      {...params}
                      label="Company"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  fullWidth
                  name="creditAccountId"
                  size="small"
                  options={userList}
                  value={curUser} // Bind the selected value (object with `id`, `label`, `code`)
                  onChange={handleUserChange}
                  getOptionLabel={(option) => `${option.firstName + " " + option.lastName}`} // Combine `label` and `code` for display
                  renderInput={(params) => (
                    <TextField
                      name="creditAccountId"
                      size="small"
                      required
                      {...params}
                      label="Manager"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Flight ID"
                  size="small"
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <form onSubmit={(e) => handleTracking(e)}>
                  <TextField
                    label="Tracking ID"
                    size="small"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    fullWidth
                  />
                  {/* <TextField label="Address Line 2" disabled={true} size="small" fullWidth /> */}
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 5 }}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tracking No</TableCell>
                  <TableCell>Bags</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData?.map((items) => (
                  <TableRow key={items.shipmentId}>
                    <TableCell>{items.trackingNo}</TableCell>
                    <TableCell>{items.bags}</TableCell>
                    <TableCell>{items.statusID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </MDBox>
      <Grid container spacing={6} mt={1}>
        <Grid item xs={12}>
          <Box display="flex" style={{ justifyContent: "center" }} gap={2} mb={2}>
            <Button variant="contained" style={{ color: "#fff" }} type="submit">
              <Icon fontSize="large">save</Icon>
              Save
            </Button>

            <Button
              variant="outlined"
              onClick={(e) => navigate("/flights")}
              style={{ color: "grey" }}
            >
              <Icon fontSize="large">close</Icon>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default AddFlight;
