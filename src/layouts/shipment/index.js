// @mui material components
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import ShipmentTableData from "layouts/shipment/data/shipmenttable";
import { Button, Typography, TextField, Card, CardHeader, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Shipment() {
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
              <Grid item xs={12} md={10}>
                <Typography>
                  You can view, print your shipments label here. (Timezone: America/New York)
                </Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  style={{ color: "#fff" }}
                  onClick={(e) => navigate("/add-multi")}
                >
                  <Icon icon={"fluent:add-12-filled"}></Icon>
                  ADD NEW SHIPMENT
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ShipmentTableData />
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Shipment;
