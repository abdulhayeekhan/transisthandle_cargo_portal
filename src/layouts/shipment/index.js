// @mui material components
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

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
  const trackingData = [
    { date: "20241113", status: "DELIVERED", location: "TROY US" },
    { date: "20241113", status: "Out For Delivery Today", location: "Latham US" },
    { date: "20241113", status: "Processing at UPS Facility", location: "Latham US" },
    { date: "20241113", status: "Arrived at Facility", location: "Latham US" },
    { date: "20241113", status: "Departed from Facility", location: "Parsippany US" },
    { date: "20241113", status: "Arrived at Facility", location: "Parsippany US" },
    { date: "20241112", status: "Departed from Facility", location: "Philadelphia US" },
    { date: "20241112", status: "Import Scan", location: "Philadelphia US" },
    { date: "20241112", status: "Arrived at Facility", location: "Philadelphia US" },
    { date: "20241112", status: "Departed from Facility", location: "Koeln DE" },
    { date: "20241112", status: "Export Scan", location: "Koeln DE" },
    { date: "20241111", status: "Arrived at Facility", location: "Koeln DE" },
  ];
  const handleTracking = (e) => {};
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
                  onClick={(e) => navigate("/add-shipment")}
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
