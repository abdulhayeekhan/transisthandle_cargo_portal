/* eslint-disable */
/* eslint-disable */

// Material Dashboard 2 React components
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
} from "@mui/material";
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
import { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const userData = [
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340420054385",
    invoiceNo: "ESCEFAF54F8A0",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340406161725",
    invoiceNo: "ESCEFAF54F8A1",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340406161725",
    invoiceNo: "ESCEFAF54F8A2",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340406161725",
    invoiceNo: "ESCEFAF54F8A3",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340406161725",
    invoiceNo: "ESCEFAF54F8A5",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340406161725",
    invoiceNo: "ESCEFAF54F8A4",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
  {
    company: "ESCM GmbH",
    tracking: "1ZH9R5340406161725",
    invoiceNo: "ESCEFAF54F8A8",
    carrierCode: "UPS International",
    sender: "ESCM GMBH",
    weight: 45.5,
    length: 45,
    width: 45,
    height: 12,
    currency: "USD",
    total: 1000,
    recipient: "NICK BERNARDO",
    shipFrom: "ESCM GmbH",
    shipTo: "1 NORTHWAY LANE LATHAM NY 12110 5185779255",
    custRef: "",
    shipDate: "04/11/2024 15:49",
    createdAt: "04/11/2024 15:49",
    refund: "",
  },
];

export default function Data() {
  const handleDownloadInvoice = (id) => {
    console.log("invoice:", id);
  };
  let token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [trackingStatus, setTrackingStatus] = useState([]);
  const handleTracking = async(id) => {
    console.log("invoice:", id);
    setOpen(true);
    const data = await axios.get(`${baseURL}/ups/tracking/${id}`,{
      headers: {
        Authorization: token, // Replace 'yourToken' with your actual token
      },
    });
    console.log("data:", data);
    setTrackingStatus([
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
    ]);
  };
  const rows = userData.map((user) => ({
    company: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.company}
      </MDTypography>
    ),
    tracking: (
      <Typography
        onClick={(e) => handleTracking(user.tracking)}
        style={{ fontSize: 14, fontWeight: "500", color: "#cf640b", cursor: "pointer" }}
      >
        {user.tracking}
      </Typography>
    ),
    invoiceNo: (
      <Typography
        onClick={(e) => handleDownloadInvoice(user.invoiceNo)}
        style={{ fontSize: 14, fontWeight: "500", color: "#cf640b", cursor: "pointer" }}
      >
        {user.invoiceNo}
      </Typography>
    ),
    carrierCode: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.carrierCode}
      </MDTypography>
    ),
    sender: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.sender}
      </MDTypography>
    ),
    weight: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.weight}
      </MDTypography>
    ),
    length: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.length}
      </MDTypography>
    ),
    width: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.width}
      </MDTypography>
    ),
    height: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.height}
      </MDTypography>
    ),
    currency: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.currency}
      </MDTypography>
    ),
    total: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.total}
      </MDTypography>
    ),
    recipient: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.recipient}
      </MDTypography>
    ),
    shipFrom: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.shipFrom}
      </MDTypography>
    ),
    shipTo: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.shipTo}
      </MDTypography>
    ),
    custRef: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.custRef}
      </MDTypography>
    ),
    shipDate: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.shipDate}
      </MDTypography>
    ),
    createdAt: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.createdAt}
      </MDTypography>
    ),
    refund: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.refund}
      </MDTypography>
    ),
  }));

  const columns = [
    { Header: "company", accessor: "company", width: "10%", align: "left" },
    { Header: "tracking", accessor: "tracking", align: "left" },
    { Header: "invoice#", accessor: "invoiceNo", align: "center" },
    { Header: "carrierCode", accessor: "carrierCode", align: "center" },
    { Header: "sender", accessor: "sender", align: "center" },
    { Header: "weight", accessor: "weight", align: "left" },
    { Header: "length", accessor: "length", align: "left" },
    { Header: "width", accessor: "width", align: "center" },
    { Header: "height", accessor: "height", align: "center" },
    { Header: "currency", accessor: "currency", align: "center" },
    { Header: "total", accessor: "total", align: "left" },
    { Header: "recipient", accessor: "recipient", align: "left" },
    { Header: "ship-From", accessor: "shipFrom", align: "center" },
    { Header: "ship-To", accessor: "shipTo", align: "center" },
    { Header: "custRef", accessor: "custRef", align: "center" },
    { Header: "shipDate", accessor: "shipDate", align: "left" },
    { Header: "createdAt", accessor: "createdAt", align: "left" },
    { Header: "refund", accessor: "refund", align: "center" },
  ];
  return (
    <div>
      <Card>
        <CardContent>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={6} md={4}>
                <TextField label="Search by Date" variant="outlined" fullWidth margin="normal" />
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
                <TextField label="Search Invoice No" variant="outlined" fullWidth margin="normal" />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Search by Company" variant="outlined" fullWidth margin="normal" />
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tracking</DialogTitle>
        <DialogContent>
          <Timeline>
            {trackingStatus.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={item.status === "DELIVERED" ? "success" : "primary"} />
                  {index < trackingStatus.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography
                    variant="body1"
                    fontWeight={item.status === "DELIVERED" ? "bold" : "normal"}
                  >
                    {item.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.date} - {item.location}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
