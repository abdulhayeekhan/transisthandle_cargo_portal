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
  Autocomplete,
  Icon,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
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

const baseURL = process.env.REACT_APP_API_URL;

export default function Data() {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userLavelId = userInfo?.userLavel;
  console.log("userInfo", userInfo);

  const handleDownloadInvoice = async (id) => {
    try {
      const data = await axios.get(`${baseURL}/ups/invoice/${id}`);
      const response = data?.data;
      console.log("response:", response);
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("INVOICE", 105, 20, { align: "center" });

      // Sender details
      doc.setFontSize(12);
      doc.text("SENT BY:", 10, 30);
      doc.text("Sender Name: ESCM GMBH", 10, 40);
      doc.text("Address: Koln, Germany 50829", 10, 50);
      doc.text("Phone: 0049-15202446893", 10, 60);
      doc.text("Country: Germany", 10, 70);

      // Receiver details
      doc.text("SHIP TO:", 85, 30);
      doc.text(`Consignee Name: ${response?.name}`, 85, 40);
      doc.text(
        `Address: ${response?.address}, ${response?.city}, ${response?.stateCode} ${response?.postalCode} ${response?.countryCode}`,
        85,
        50
      );
      doc.text(`Phone: ${response?.contactNo}`, 85, 60);
      doc.text(`Country: ${response?.countryCode}`, 85, 70);

      // Invoice details
      doc.text(`Invoice No: ${response?.invoiceId}`, 10, 90);
      doc.text(`Tracking No: ${response?.trackingNo}`, 10, 100);

      // Table for products
      const tableColumn = ["Description", "Hts Code", "Qty", "Unit Price", "Total Price"];
      const tableRows = response?.details?.map((item) => [
        `${item?.description}`,
        `${item?.HtsCode}`,
        `${item?.Qty}`,
        `${item?.unitPrice}`,
        `${item?.Qty * item?.unitPrice}`,
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
      });

      const totalPrice = response?.details?.reduce(
        (sum, item) => sum + (item.unitPrice * item.Qty || 0),
        0
      );
      // Total Amount
      doc.setFontSize(12);
      doc.text(`Total: ${totalPrice}`, 10, doc.lastAutoTable.finalY + 20);

      // Footer
      doc.text("NAME: ESCM GMBH", 10, doc.lastAutoTable.finalY + 40);
      doc.text("SIGNATURE", 10, doc.lastAutoTable.finalY + 50);

      // Save PDF
      doc.save(`${response?.trackingNo}.pdf`);
    } catch (error) {
      toast.error("Inoice Download Error");
    }
  };

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfBase64, setPdfBase64] = useState("");
  const convertImageToPdfBase64 = async (id) => {
    //const data = await axios.get(`${baseURL}/shipment/label/${id}`);
    const data = await axios.get(`${baseURL}/shipment/label/${id}`);
    const imageData = await data?.data?.graphicImage;
    const base64Image = `data:image/png;base64,${imageData}`; // Replace with your Base64 data
    const imageUrl = base64Image; // Replace with your image path or URL

    try {
      // Fetch image and convert it to a Base64 URL
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result; // Base64 representation of the image
        console.log("baseImage:", base64Image);
        const img = new Image();
        img.src = base64Image;

        img.onload = () => {
          const doc = new jsPDF("landscape", "pt", "a5"); // A4 size in portrait mode
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          // Rotate the image and fit it to full A4 page
          //doc.addImage(base64Image, "JPEG",2, 545, 440, 292);
          doc.addImage(base64Image, "JPEG", 3, 125, 440, 292);

          // Convert the generated PDF to Base64
          const pdfBase64Data = doc.output("datauristring");
          setPdfBase64(pdfBase64Data);
          setIsModalOpen(true); // Open modal
        };
      };

      reader.readAsDataURL(imageBlob);
    } catch (error) {
      console.error("Error converting image to PDF:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const fromateDate = (date) => date.toISOString().split("T")[0];
  const fromDate = fromateDate(last7Days);
  const toDate = fromateDate(today);
  const [trackingStatus, setTrackingStatus] = useState([]);
  const [trackingNo, setTrackingNo] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(nextDay);
  const [clientCompanyId, setClientCompanyId] = useState(
    userLavelId === 1 || userLavelId === 2 ? "" : userInfo?.companyId
  );
  const [shipInfo, setShipInfo] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const GetCompanyData = async () => {
    const { data } = await axios.get(`${baseURL}/company/getAllList`);
    setCompanyList(data);
  };
  let information = "";
  const GetShipmentData = async () => {
    const body = {
      startDate,
      endDate,
      clientCompanyId,
      createdBy,
      companyName,
      trackingNo,
    };
    const { data } = await axios.post(`${baseURL}/shipment/getAll`, body);
    setShipInfo(data);
  };
  console.log("shipInfo:", shipInfo);

  useEffect(() => {
    GetShipmentData();
    GetCompanyData();
  }, [trackingNo, startDate, endDate, clientCompanyId, userLavelId]);
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
  const handleTracking = async (id) => {
    setOpen(true);
    // try {
    const data = await axios.get(`${baseURL}/ups/tracking/${id}`, {
      headers: {
        Authorization: token, // Replace 'yourToken' with your actual token
      },
    });
    // const errorCode = data?.data?.trackResponse.shipment[0]?.warnings[0]?.code; //shipment[0]?.warnings[0]?.code
    // console.log("handleTracking:", data?.data?.trackResponse);
    // const errorMessage = data?.data?.trackResponse.shipment[0]?.warnings[0]?.message;
    // if (errorCode === "TW0001") {
    //   setTrackingStatus([{ ...trackingStatus, date: "", status: errorMessage, location: "" }]);
    // } else {
    const statusData = data?.data?.trackResponse?.shipment[0]?.package[0]?.activity;
    const selectedData = statusData.map((item) => ({
      date: item.date,
      status: item.status.description,
      location: item.location?.address?.city,
    }));
    setTrackingStatus(selectedData);
    // }
    // } catch (error) {
    //     toast.error(""+error);
    // }
  };
  const rows = shipInfo.map((user) => ({
    company: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        ESCM GmbH
      </MDTypography>
    ),
    label: (
      <Typography
        onClick={(e) => convertImageToPdfBase64(user.trackingNo)}
        style={{ fontSize: 14, fontWeight: "500", color: "#cf640b", cursor: "pointer" }}
      >
        <Icon>print</Icon>
      </Typography>
    ),
    tracking: (
      <Typography
        onClick={(e) => handleTracking(user.trackingNo)}
        style={{ fontSize: 14, fontWeight: "500", color: "#cf640b", cursor: "pointer" }}
      >
        {user.trackingNo}
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
    weight: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.weight} ({user.weightUnit})
      </MDTypography>
    ),
    length: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.lenght}
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
        {user.name}
      </MDTypography>
    ),
    shipTo: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {user.address}, {user.city} {user.postalCode}, {user.countryCode}
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
    { Header: "label", accessor: "label", align: "left" },
    { Header: "tracking", accessor: "tracking", align: "left" },
    { Header: "invoice#", accessor: "invoiceNo", align: "center" },
    { Header: "carrierCode", accessor: "carrierCode", align: "center" },
    { Header: "weight", accessor: "weight", align: "left" },
    { Header: "length", accessor: "length", align: "left" },
    { Header: "width", accessor: "width", align: "center" },
    { Header: "height", accessor: "height", align: "center" },
    // { Header: "currency", accessor: "currency", align: "center" },
    // { Header: "total", accessor: "total", align: "left" },
    { Header: "recipient", accessor: "recipient", align: "left" },
    { Header: "ship-To", accessor: "shipTo", align: "center" },
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
              <Grid item xs={6} md={2}>
                <TextField
                  label="Date From"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Date To"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
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
                  value={trackingNo}
                  onChange={(e) => setTrackingNo(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Search Invoice No" variant="outlined" fullWidth margin="normal" />
              </Grid>
              {(userLavelId === 1 || userLavelId === 2) && (
                <Grid item xs={6} md={2}>
                  <Autocomplete
                    fullWidth
                    name="creditAccountId"
                    size="medium"
                    options={companyList}
                    value={curCompany} // Bind the selected value (object with `id`, `label`, `code`)
                    onChange={handleCompanyChange}
                    getOptionLabel={(option) => `${option.companyName}`} // Combine `label` and `code` for display
                    renderInput={(params) => (
                      <TextField
                        name="creditAccountId"
                        size="medium"
                        required
                        {...params}
                        label="Company"
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </CardContent>
        <MDBox>
          {shipInfo?.length > 0 ? (
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          ) : (
            <Grid item sx={12} style={{ justifyContent: "center" }}>
              <CircularProgress />
            </Grid>
          )}
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
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 550,
            width: "50vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              X
            </button>
            {/* Display PDF in iframe */}
            {pdfBase64 ? (
              <iframe
                src={pdfBase64}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="PDF Viewer"
              ></iframe>
            ) : (
              <p>Loading PDF...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
