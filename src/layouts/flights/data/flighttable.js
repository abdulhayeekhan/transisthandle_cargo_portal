import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Button,
  Autocomplete,
  Icon,
  CircularProgress,
  Pagination,
} from "@mui/material";
import * as XLSX from "xlsx";
import moment from "moment";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import DataTable from "examples/Tables/DataTable";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-barcode";
import "jspdf-autotable";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_URL;

export default function Data() {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userLavelId = userInfo?.userLavel;

  const [loading, setLoading] = useState(false);

  let today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const fromateDate = (date) => date.toISOString().split("T")[0];
  const fromDate = fromateDate(last7Days);
  const toDate = fromateDate(today);
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(nextDay);
  const [companyId, setClientCompanyId] = useState(
    userLavelId === 1 || userLavelId === 2 ? "" : userInfo?.companyId
  );
  const [shipInfo, setShipInfo] = useState([]);
  const [shipcompleteData, setShipcompleteData] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const GetCompanyData = async () => {
    const { data } = await axios.get(`${baseURL}/company/getAllList`);
    setCompanyList(data);
  };
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [flightId, setFlightId] = useState("");
  const [notFound, setNotFound] = useState("");
  const GetFlightData = async () => {
    setLoading(true);
    const body = {
      pageNo: pageNo,
      pageSize: pageSize,
      startDate,
      endDate,
      companyId,
      userId,
      flightId,
    };
    const { data } = await axios.post(`${baseURL}/flight/GetAll`, body);
    console.log("response data", data?.data);
    setTotalPages(data?.totalPages);
    setShipInfo(data?.data);
    if (data?.data?.lenght > 0) {
      setLoading(false);
      setNotFound("Not Found");
    } else {
      setLoading(false);
      setNotFound("");
    }
    const bodyInfo = {
      pageNo: pageNo,
      pageSize: 100000000,
      startDate,
      endDate,
      companyId,
      userId,
      flightId,
    };

    const response = await axios.post(`${baseURL}/flight/GetAll`, bodyInfo);
    setShipcompleteData(response?.data?.data);
  };

  useEffect(() => {
    GetFlightData();
    GetCompanyData();
  }, [flightId, startDate, endDate, companyId, userLavelId, pageNo, pageSize, totalPages]);
  const [curCompany, setCurCompany] = useState(null);
  const handleCompanyChange = (event, newValue) => {
    if (newValue !== null) {
      console.log("state code:", newValue.id);
      setClientCompanyId(newValue.id);
      setCurCompany(newValue);
      //setShipStateCode(newValue?.code);
    } else {
      setCurCompany(null);
      setClientCompanyId("");
    }
  };
  //Customer Reference
  const exportRows = shipcompleteData?.map((user) => ({
    company: user.companyName,
    shipDate: user.shipDate,
    createdAt: user.createdAt,
  }));
  const exportCoulmns = [
    { Header: "company", accessor: "company", width: "10%", align: "left" },
    { Header: "shipDate", accessor: "shipDate", align: "left" },
    { Header: "createdAt", accessor: "createdAt", align: "left" },
  ];
  const rows = shipInfo?.map((user) => ({
    company: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user?.companyName}
      </MDTypography>
    ),
    shipDate: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {moment(user.shipDate).format("DD-MM-YYYY")}
      </MDTypography>
    ),
    bags: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.totalBags}
      </MDTypography>
    ),
    awb: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.awb}
      </MDTypography>
    ),
    manager: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.firstName + " " + user.lastName}
      </MDTypography>
    ),
    run: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.run}
      </MDTypography>
    ),
    createdAt: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.createdAt}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        <Link to={`/view-flight/${user?.id}`}>
          <Icon fontSize="medium">visibility</Icon>
        </Link>
        {userLavelId === 1 && (
          <Link to={"/"}>
            <Icon fontSize="medium">create</Icon>
          </Link>
        )}
      </MDTypography>
    ),
  }));

  const columns = [
    { Header: "company", accessor: "company", width: "10%", align: "left" },
    { Header: "Date", accessor: "shipDate", align: "left" },
    { Header: "Bags", accessor: "bags", align: "left" },
    { Header: "AWB", accessor: "awb", align: "left" },
    { Header: "Manager", accessor: "manager", align: "left" },
    { Header: "Run", accessor: "run", align: "left" },
    { Header: "created At", accessor: "createdAt", align: "left" },
    { Header: "Action", accessor: "action", align: "left" },
  ];

  const handleExport = async () => {
    const exportData = await exportRows.map((row) => {
      const result = {};
      exportCoulmns.forEach((column) => {
        result[column.Header] = row[column.accessor];
      });
      return result;
    });

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Export to Excel
    XLSX.writeFile(workbook, `flights-list-${today}.xlsx`);
  };
  const handlePageChange = async (event, value) => {
    setPageNo(value);
    const body = {
      pageNo: value,
      pageSize: pageSize,
      startDate,
      endDate,
      companyId,
      userId,
      flightId,
    };
    const { data } = await axios.post(`${baseURL}/flight/GetAll`, body);
    setTotalPages(data?.totalPages);
    setShipInfo(data?.data);
    // GetShipmentData();
  };
  return (
    <div>
      <Card>
        <CardContent>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Date From"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  size="small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Date To"
                  value={endDate}
                  size="small"
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Search AWB"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                  margin="normal"
                />
              </Grid>
              {/* <Grid item xs={6} md={2}>
                <TextField label="Search Invoice No" variant="outlined" fullWidth margin="normal" />
              </Grid> */}
              {(userLavelId === 1 || userLavelId === 2) && (
                <Grid item xs={6} md={3}>
                  <Autocomplete
                    fullWidth
                    name="creditAccountId"
                    size="small"
                    style={{ padding: 5, marginTop: 10 }}
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
                </Grid>
              )}
              <Grid item xs={6} md={2}>
                <Button
                  onClick={handleExport}
                  size="small"
                  style={{ backgroundColor: "#52aa55", color: "white", marginTop: 13 }}
                >
                  Export Excel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <MDBox>
          {shipInfo?.length > 0 ? (
            <>
              <DataTable
                table={{ columns, rows, paginatedRows: rows }}
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
                  page={pageNo}
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
        </MDBox>
      </Card>
    </div>
  );
}
