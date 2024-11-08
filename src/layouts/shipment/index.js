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
import { Icon } from "@iconify/react";

// Data
import shipmentTableData from "layouts/shipment/data/shipmenttable";
import { Button, Typography, TextField, Card, CardHeader, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Shipment() {
  const { columns, rows } = shipmentTableData();
  const navigate = useNavigate();

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
            <Card>
              <CardContent>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={6} md={4}>
                      <TextField
                        label="Search by Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        label="Search Tracking No"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        label="Search Invoice No"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        label="Search by Company"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Shipment;
