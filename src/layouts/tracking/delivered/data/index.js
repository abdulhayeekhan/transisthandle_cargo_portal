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
  const rawUserInfo = JSON.parse(localStorage.getItem("userInfo"));
 
  const userLavel = rawUserInfo?.userLavel;
  const createdBy = rawUserInfo?.id;
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(50); // Track page size
  const [trackingInfo, setTrackingInfo] = useState([])
  const [trackingId, setTrackingId] = useState("");
  // Fetch company data with pagination
  const GetCompanyInf = async () => {
    setLoading(true);
    let body = {}
    if (userLavel === 1) {
      body = {
        pageNo: currentPage,
        pageSize: pageSize,
        trackingId,
        deliveryStatusId: 12
      };
    } else {
      body = {
        pageNo: currentPage,
        pageSize: pageSize,
        trackingId,
        createdBy: createdBy,
        deliveryStatusId: 12
      };
    }
    const response = await dispatch(GetTrackingData(body))
    if (response?.payload) {
      setTrackingInfo(response.payload?.data);
      setTotalRecords(response.payload?.totalCount)
    }

  };

  // Fetch data when page or pageSize changes
  useEffect(() => {
    GetCompanyInf();
  }, [pageSize, trackingId]);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = async (event, value) => {
    setCurrentPage(value);
    setLoading(true);
    let body = {}
    if (userLavel === 1) {
      body = {
        pageNo: value,
        pageSize: pageSize,
        trackingId,
      };
    } else {
      body = {
        pageNo: value,
        pageSize: pageSize,
        trackingId,
        createdBy: createdBy,
      };
    }
    // Fetch tracking data
    const response = await dispatch(GetTrackingData(body))
    if (response?.payload) {
      setTrackingInfo(response.payload?.data);
      setTotalRecords(response.payload?.totalCount)
    }
  };
  const rows = trackingInfo?.length
    ? trackingInfo?.map((user, index) => ({
      srNo: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index + 1 + (currentPage - 1) * pageSize}
        </MDTypography>
      ),
      TrackingId: (
        <Link to={`/invoice-view/${user?.Id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {user?.TrackingId}
          </MDTypography>
        </Link>
      ),
      customer: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {user?.FirstName + ' ' + user?.LastName}
        </MDTypography>
      ),
      contactNo: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {user?.ContactNo}
        </MDTypography>
      ),
      GrossWeight: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {user?.Weight + ' ' + user?.WeightUnit}
        </MDTypography>
      ),
      BookingCity: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {user?.BookingCity}
        </MDTypography>
      ),
     
    }))
    : [];
  // Define table columns
  const columns = [
    { Header: "Sr. No", accessor: "srNo", align: "left" },
    { Header: "Tracking", accessor: "TrackingId", width: "20%", align: "left" },
    { Header: "customer", accessor: "customer", align: "left" },
    { Header: "ContactNo", accessor: "contactNo", align: "center" },
    { Header: "GrossWeight", accessor: "GrossWeight", align: "center" },
    { Header: "Collection Center", accessor: "BookingCity", align: "center" },
   
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
      {trackingInfo?.length > 0 ? (
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
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
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
