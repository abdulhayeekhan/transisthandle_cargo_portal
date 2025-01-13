// @mui material components
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Icon } from "@iconify/react";
// Data
import FlightTableData from "layouts/flights/data/flighttable";
import { Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Flights() {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userLavelId = userInfo?.userLavel;
  //const { columns, rows } = shipmentTableData();
  const navigate = useNavigate();
  const handleTracking = (e) => {};
  console.log("token:", localStorage.getItem("token"));
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography>You can view, flights tracking here.</Typography>
              </Grid>
              {(userLavelId === 1 || userLavelId === 2) && (
                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    style={{ color: "#fff" }}
                    onClick={(e) => navigate("/add-flight")}
                  >
                    <Icon icon={"fluent:add-12-filled"}></Icon>
                    ADD NEW FLIGHT
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FlightTableData />
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Flights;
