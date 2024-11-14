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
import UserTableData from "layouts/user/data/userTable";
import { Button, Typography, TextField, Card, CardHeader, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Users() {
  const { columns, rows } = UserTableData();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Typography>All Users List</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  style={{ color: "#fff" }}
                  onClick={(e) => navigate("/add-user")}
                >
                  <Icon icon={"fluent:add-12-filled"}></Icon>
                  ADD User
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <UserTableData />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
