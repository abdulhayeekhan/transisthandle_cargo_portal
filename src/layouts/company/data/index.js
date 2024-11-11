/* eslint-disable */
/* eslint-disable */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Button, Typography, Icon } from "@mui/material";

const userData = [
  {
    id: 1,
    companyName: "Ahmad Traders",
    contactNo: "0321456987",
    email: "user@gmail.com",
    address: "144-A Pakistan House",
    labelCount: 3000,
    maxUser: 2,
    existUser: 1,
    isActive: true,
    createdAt: "04/11/2024 15:49",
  },
  {
    id: 2,
    companyName: "Alam Traders",
    contactNo: "0321456987",
    email: "user@gmail.com",
    address: "144-A Pakistan House",
    labelCount: 3000,
    maxUser: 2,
    existUser: 1,
    isActive: false,
    createdAt: "04/11/2024 15:49",
  },
  {
    id: 3,
    companyName: "Shamas Traders",
    contactNo: "0321456987",
    email: "user@gmail.com",
    address: "144-A Pakistan House",
    labelCount: 3000,
    maxUser: 2,
    existUser: 1,
    isActive: false,
    createdAt: "04/11/2024 15:49",
  },
  {
    id: 4,
    companyName: "Akbar Traders",
    contactNo: "0321456987",
    email: "user@gmail.com",
    address: "144-A Pakistan House",
    labelCount: 3000,
    maxUser: 2,
    existUser: 1,
    isActive: true,
    createdAt: "04/11/2024 15:49",
  },
];

export default function data() {
  const rows = userData.map((user) => ({
    companyName: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.companyName}
      </MDTypography>
    ),
    contactNo: (
      <MDTypography component="a" variant="caption" color={"#cf640b"} fontWeight="medium">
        {user.contactNo}
      </MDTypography>
    ),
    email: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.email}
      </MDTypography>
    ),
    address: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.address}
      </MDTypography>
    ),
    labelCount: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.labelCount}
      </MDTypography>
    ),
    maxUser: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.maxUser}
        <Button onClick={e => }>
          <Icon fontSize="small">add</Icon>
        </Button>
      </MDTypography>
    ),
    existUser: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.existUser}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={user.isActive ? "Active" : "In-Active"}
          color={user.isActive ? "success" : "danger"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    createdAt: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.createdAt}
      </MDTypography>
    ),
    action: (
      <Button component="a" variant="caption" color="text" fontWeight="medium">
        <Icon fontSize="small">edit</Icon>
      </Button>
    ),
  }));

  return {
    columns: [
      { Header: "companyName", accessor: "companyName", width: "10%", align: "left" },
      { Header: "contactNo", accessor: "contactNo", align: "left" },
      { Header: "email", accessor: "email", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "labelCount", accessor: "labelCount", align: "center" },
      { Header: "maxUser", accessor: "maxUser", align: "left" },
      { Header: "existUser", accessor: "existUser", align: "left" },
      { Header: "status", accessor: "status", align: "left" },
      { Header: "createdAt", accessor: "createdAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
