import React, { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Button, Icon, Pagination, Grid, TextField, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//import DataTable from "components/DataTable"; // Ensure DataTable is correctly imported
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_URL;

export default function Data() {
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(11); // Track page size
  const [companyName, setCompanyName] = useState("");

  // Fetch company data with pagination
  const GetCompanyInf = async () => {
    const body = {
      pageNo: currentPage,
      pageSize: pageSize,
      companyName,
    };
    console.log("body", body);
    const { data } = await axios.post(`${baseURL}/company/getAll`, body);
    setCompanyInfo(data.data); // Set company data
    setTotalRecords(data.total); // Set total records
  };

  // Fetch data when page or pageSize changes
  useEffect(() => {
    GetCompanyInf();
  }, [pageSize, companyName]);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  const HanldePagination = (e) => {
    console.log("value:");
    // setCurrentPage(value);

    // GetCompanyInf();
  };
  const rows = companyInfo?.length
    ? companyInfo?.map((user, index) => ({
        srNo: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {index + 1 + (currentPage - 1) * pageSize}
          </MDTypography>
        ),
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
            <Button>
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
          <Link
            to={`/edit-company/${user?.id}`}
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <Icon fontSize="small">edit</Icon>
          </Link>
        ),
      }))
    : [];

  // Define table columns
  const columns = [
    { Header: "Sr. No", accessor: "srNo", align: "left" },
    { Header: "Company Name", accessor: "companyName", width: "20%", align: "left" },
    { Header: "Contact No", accessor: "contactNo", align: "left" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "Address", accessor: "address", align: "center" },
    { Header: "Label Count", accessor: "labelCount", align: "center" },
    { Header: "Max User", accessor: "maxUser", align: "center" },
    { Header: "Existing Users", accessor: "existUser", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "createdAt", align: "center" },
    { Header: "Actions", accessor: "action", align: "center" },
  ];

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8} />
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <DataTable
        table={{ columns, rows }}
        isSorted={false} // Set the page size
        noEndBorder
      />
      <Pagination
        style={{ float: "right", marginTop: 10, marginBottom: 5 }}
        count={totalPages}
        page={currentPage}
        onChange={HanldePagination}
      />
      {/* Pagination Controls */}
      {/* <MDBox mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          showTotalEntries={true}
          onChange={(event, page) => setCurrentPage(page)} // Handle page change
          color="primary"
        />
      </MDBox> */}
    </div>
  );
}
