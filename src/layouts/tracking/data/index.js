import React, { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import {
  Button,
  Icon,
  Pagination,
  Grid,
  TextField,
  TablePagination,
  CircularProgress,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//import DataTable from "components/DataTable"; // Ensure DataTable is correctly imported
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";
import { GetTrackingData } from 'store/tracking'
const baseURL = process.env.REACT_APP_API_URL;

export default function Data() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(11); // Track page size
  const [trackingInfo,setTrackingInfo] = useState([])
  const [trackingId,setTrackingId] = useState("");
  // Fetch company data with pagination
  const GetCompanyInf = async () => {
    setLoading(true);
    const body = {
      pageNo: currentPage,
      pageSize: pageSize,
      trackingId,
    };
    console.log("body", body);
    const response = await dispatch(GetTrackingData(body))
    if(response?.payload){
      setTrackingInfo(response.payload?.data);
      setTotalRecords(response.payload?.totalCount)
    }
    const { data } = await axios.post(`${baseURL}/company/getAll`, body);
    setLoading(false);
    setCompanyInfo(data.data); // Set company data
    setTotalRecords(data.total); // Set total records
  };

  // Fetch data when page or pageSize changes
  useEffect(() => {
    GetCompanyInf();
  }, [pageSize, trackingId]);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);
  const HanldePagination = (e) => {
    console.log("value:");
    // setCurrentPage(value);

    // GetCompanyInf();
  };
  const rows = trackingInfo?.length
    ? trackingInfo?.map((user, index) => ({
        srNo: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {index + 1 + (currentPage - 1) * pageSize}
          </MDTypography>
        ),
        TrackingId: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {user.TrackingId}
          </MDTypography>
        ),
        customer: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {user.FirstName+' '+user.LastName}
          </MDTypography>
        ),
        contactNo: (
          <MDTypography component="a" variant="caption" color={"#cf640b"} fontWeight="medium">
            {user.ContactNo}
          </MDTypography>
        ),
        email: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {user.Email}
          </MDTypography>
        ),
        
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={user.deliveryStatusId ? "Active" : "In-Active"}
              color={user.deliveryStatusId ? "success" : "danger"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        BookingCity: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {user.BookingCity}
          </MDTypography>
        ),
      }))
    : [];

  // Define table columns
  const columns = [
    { Header: "Sr. No", accessor: "srNo", align: "left" },
    { Header: "Tracking", accessor: "TrackingId", width: "20%", align: "left" },
    { Header: "Booking From", accessor: "BookingCity", align: "center" },
    { Header: "customer", accessor: "customer", align: "left" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "ContactNo", accessor: "contactNo", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    
  ];

  return (
    <div>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} />
          <Grid item xs={12} md={4}>
            <TextField
              label="Search by Tracking No"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
            />
          </Grid>
        </Grid>
      </CardContent>
      {companyInfo?.length > 0 ? (
        <>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Pagination
              style={{ float: "right", marginTop: 10, marginBottom: 5 }}
              count={totalPages}
              page={currentPage}
              onChange={HanldePagination}
            />
          </div>
        </>
      ) : (
        <Grid
          item
          sx={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            backgroundColor: "lightgrey",
          }}
        >
          {loading ? <CircularProgress size={30} /> : "Data Not Found"}
        </Grid>
      )}
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
