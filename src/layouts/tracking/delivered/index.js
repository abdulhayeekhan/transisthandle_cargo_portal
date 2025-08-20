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
import TrackingTableData from "layouts/tracking/delivered/data";
import {
  Button,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  paginationClasses,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DeliveredOrders() {
  // const { columns, rows } = shipmentTableData();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TrackingTableData />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DeliveredOrders;
