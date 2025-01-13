// @mui material components
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Box,
  CardHeader,
  CardContent,
  LinearProgress,
} from "@mui/material";
import Table from "@mui/material/Table";
import moment from "moment";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Icon } from "@iconify/react";
import { Button, Typography, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#d32f2f", // Red
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function ViewFlight() {
  const { id } = useParams();
  const [flghtInfo, setFlightInfo] = useState("");
  const [totalBags, setTotalBags] = useState(0);
  const GetFlightInfo = async () => {
    let body = {
      id,
    };
    const data = await axios.post(`${baseURL}/flight/GetSingle`, body);
    console.log("data:", data?.data);
    const totalBagsBox = data?.data?.detailInfo?.reduce(
      (sum, item) => sum + parseInt(item.bags, 10),
      0
    );
    setTotalBags(totalBagsBox);
    setFlightInfo(data?.data);
  };
  useEffect(() => {
    GetFlightInfo();
  }, []);
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userLavelId = userInfo?.userLavel;
  //const { columns, rows } = shipmentTableData();
  const navigate = useNavigate();
  const handleTracking = (e) => {};
  console.log("token:", localStorage.getItem("token"));
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <ThemeProvider theme={theme}>
        <MDBox pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Typography>You can view, flight AWB: {flghtInfo?.awb} here.</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#d3e611", fontWeight: "800" }}>
                      <TableRow>
                        <TableCell>CLIENT</TableCell>
                        <TableCell>DATE</TableCell>
                        <TableCell>BAGS</TableCell>
                        <TableCell>AWB</TableCell>
                        <TableCell>MANAGER</TableCell>
                        <TableCell>MASTER TRACKING</TableCell>
                        <TableCell>BOXES</TableCell>
                        <TableCell>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow style={{ backgroundColor: "#6ce611" }}>
                        <TableCell>{flghtInfo?.companyName}</TableCell>
                        <TableCell>{moment(flghtInfo?.shipDate).format("DD-MM-YYYY")}</TableCell>
                        <TableCell>{totalBags}</TableCell>
                        <TableCell>{flghtInfo?.awb}</TableCell>
                        <TableCell>{flghtInfo?.managedBy}</TableCell>
                        <TableCell
                          style={{
                            backgroundColor: "#e62411",
                            color: "#fff",
                            textAlign: "center",
                          }}
                        >
                          RUN {flghtInfo?.run}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {flghtInfo?.detailInfo?.map((item) => {
                        return (
                          <TableRow key={item?.id}>
                            <TableCell colSpan={5}></TableCell>
                            <TableCell>{item?.trackingNo}</TableCell>
                            <TableCell>{item?.bags}</TableCell>
                            <TableCell
                              style={{
                                backgroundColor: item?.StatusBgColor,
                                color: item?.StatusTextColor,
                              }}
                            >
                              {item?.StatusName}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow style={{ backgroundColor: "#d3e611", fontWeight: "900" }}>
                        <TableCell colSpan={6}>SUM</TableCell>
                        <TableCell>{totalBags}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" style={{ justifyContent: "center" }} gap={2} mb={2}>
                <Button
                  variant="outlined"
                  onClick={(e) => navigate("/flights")}
                  style={{ color: "grey" }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MDBox>
      </ThemeProvider>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewFlight;
