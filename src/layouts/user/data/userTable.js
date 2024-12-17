import React, { useCallback, useEffect, useState } from "react";
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
  Autocomplete,
  CircularProgress,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetUsersListWithCompanyID } from "store/account";
//import DataTable from "components/DataTable"; // Ensure DataTable is correctly imported
import DataTable from "examples/Tables/DataTable";

const baseURL = process.env.REACT_APP_API_URL;

export default function Data() {
  const loginInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const roleId = loginInfo?.userLavel;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState(loginInfo?.companyId);
  console.log("companyId:", companyId);
  // Track page size
  const GetCompanyData = async () => {
    const { data } = await axios.get(`${baseURL}/company/getAllList`);
    setCompanyList(data);
  };

  const [companyName, setCompanyName] = useState("");
  // Fetch company data with pagination
  const GetCompanyInf = async () => {
    // const { data } = await axios.post(`${baseURL}/company/getAll`, body);
    setLoading(true);
    const { data } = await axios.get(`${baseURL}/account/getByCompany/${companyId}`);
    setLoading(false);
    setUserInfo(data);
  };

  // Fetch data when page or pageSize changes
  useEffect(() => {
    GetCompanyInf();
    GetCompanyData();
  }, [companyId]);

  const [curCompany, setCurCompany] = useState(null);
  const handleCompanyChange = (event, newValue) => {
    if (newValue !== null) {
      console.log("state code:", newValue.id);
      setCompanyId(newValue.id);
      setCurCompany(newValue);
      //setShipStateCode(newValue?.code);
    } else {
      setCurCompany(null);
    }
  };

  console.log("roleId:", roleId);
  // Calculate total pages

  const rows =
    userInfo?.length > 0
      ? userInfo?.map((user, index) => ({
          srNo: (
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              {index + 1}
            </MDTypography>
          ),
          name: (
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              {user.firstName} {user.lastName}
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
              {user.date}
            </MDTypography>
          ),
          action: (
            <Button component="a" variant="caption" color="text" fontWeight="medium">
              <Icon fontSize="small">edit</Icon>
            </Button>
          ),
        }))
      : [];
  //   const rows = [];
  //   // Define table columns
  const columns = [
    { Header: "Sr. No", accessor: "srNo", align: "left" },
    { Header: "User Name", accessor: "name", width: "20%", align: "left" },
    { Header: "Contact No", accessor: "contactNo", align: "left" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "createdAt", align: "center" },
    { Header: "Actions", accessor: "action", align: "center" },
  ];

  return (
    <div>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} />
          <Grid item xs={12} md={4}>
            {roleId === 1 || roleId === 2 ? (
              <Autocomplete
                fullWidth
                name="creditAccountId"
                size="small"
                options={companyList}
                value={curCompany} // Bind the selected value (object with `id`, `label`, `code`)
                onChange={handleCompanyChange}
                getOptionLabel={(option) => `${option.companyName}`} // Combine `label` and `code` for display
                renderInput={(params) => (
                  <TextField
                    name="creditAccountId"
                    size="small"
                    required
                    {...params}
                    label="Company"
                  />
                )}
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </CardContent>
      {userInfo?.length > 0 ? (
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
            {/* <Pagination
                        style={{ float: "right", marginTop: 10, marginBottom: 5 }}
                        count={totalPages}
                        page={currentPage}
                        onChange={HanldePagination}
                      /> */}
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
