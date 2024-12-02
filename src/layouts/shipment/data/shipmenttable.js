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
import * as XLSX from "xlsx";
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

const baseURL = process.env.REACT_APP_API_URL;

export default function Data() {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userLavelId = userInfo?.userLavel;
  let token = localStorage.getItem("token");
  console.log("userInfo", userInfo);

  const handleDownloadInvoice = async (id) => {
    try {
      const data = await axios.get(`${baseURL}/ups/invoice/${id}`);
      const response = data?.data;
      console.log("response:", response);
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 105, 20, { align: "center" });
      doc.setFont("helvetica", "normal");

      // Sender details
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("SENT BY:", 10, 30);

      doc.setFont("helvetica", "bold");
      doc.text("SENDER:", 10, 40);
      doc.setFont("helvetica", "normal");
      doc.text("ESCM GMBH", 35, 40);

      doc.setFont("helvetica", "bold");
      doc.text("ADDRESS:", 10, 48);
      doc.setFont("helvetica", "normal");
      doc.text("Koln, Germany 50829", 35, 48);

      doc.setFont("helvetica", "bold");
      doc.text("PHONE:", 10, 56);
      doc.setFont("helvetica", "normal");
      doc.text("0049-15202446893", 35, 56);

      doc.setFont("helvetica", "bold");
      doc.text("COUNTRY:", 10, 64);
      doc.setFont("helvetica", "normal");
      doc.text("Germany", 35, 64);

      // Receiver details
      doc.text("SHIP TO:", 85, 30);
      doc.text(`CONSIGNEE: ${response?.name}`, 85, 40);
      doc.text(`ADDRESS: ${response?.address}`, 85, 48);
      doc.text(
        `${response?.city}, ${response?.stateCode} ${response?.postalCode} ${response?.countryCode}`,
        92,
        56
      );
      doc.text(`PHONE: ${response?.contactNo}`, 85, 64);
      doc.text(`COUNTRY: ${response?.countryCode}`, 85, 72);

      // Invoice details
      doc.setFont("helvetica", "bold");
      doc.text(`Invoice No:`, 10, 90);
      doc.setFont("helvetica", "normal");
      doc.text(`${response?.invoiceId}`, 35, 90);

      doc.setFont("helvetica", "bold");
      doc.text(`Tracking No:`, 85, 90);
      doc.setFont("helvetica", "normal");
      doc.text(`${response?.trackingNo}`, 120, 90);

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
        startY: 100,
      });

      const totalPrice = response?.details?.reduce(
        (sum, item) => sum + (item.unitPrice * item.Qty || 0),
        0
      );
      // Total Amount
      doc.setFontSize(12);
      doc.text(`Total: ${totalPrice} $`, 10, doc.lastAutoTable.finalY + 10);

      // Footer
      doc.text("NAME: ESCM GMBH", 10, doc.lastAutoTable.finalY + 20);
      doc.text("SIGNATURE: __________________________", 109, doc.lastAutoTable.finalY + 20);

      // doc.barcode(response?.trackingNo, {
      //   x: 10,
      //   y: 110,
      //   width: 50,
      //   height: 5,
      //   type: "CODE128",
      // });

      // Save PDF
      doc.save(`${response?.trackingNo}.pdf`);
    } catch (error) {
      toast.error("Inoice Download Error");
    }
  };

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfBase64, setPdfBase64] = useState("");
  // const convertImageToPdfBase64 = async (id) => {
  //   const data = await axios.get(`${baseURL}/shipment/label/${id}`);
  //   const imageData = await data?.data?.graphicImage;
  //   const base64Image = `data:image/png;base64,${imageData}`;
  //   const imageUrl = base64Image;

  //   try {
  //     // Fetch image and convert it to a Base64 URL
  //     const imageResponse = await fetch(imageUrl);
  //     const imageBlob = await imageResponse.blob();
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       const base64Image = reader.result;
  //       const img = new Image();
  //       img.src = base64Image;

  //       img.onload = () => {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");
  //         canvas.width = img.height;
  //         canvas.height = img.width;
  //         ctx.translate(canvas.width / 2, canvas.height / 2);
  //         ctx.rotate((90 * Math.PI) / 180); // 90 degrees rotation
  //         ctx.drawImage(img, -img.width / 2, -img.height / 2);

  //         // Get the rotated image as base64
  //         const rotatedBase64 = canvas.toDataURL("image/jpeg");
  //         const doc = new jsPDF({
  //           orientation: "portrait", // Portrait mode
  //           unit: "pt", // Points as unit
  //           format: [288, 432], // Custom dimensions: 4 inches wide, 6 inches long
  //         });

  //         const pageWidth = doc.internal.pageSize.getWidth();
  //         const pageHeight = doc.internal.pageSize.getHeight();

  //         // Adjust the image dimensions to maintain aspect ratio
  //         const imgAspectRatio = img.width / img.height;
  //         let imgWidth = pageWidth - 20; // Leave some margin
  //         let imgHeight = imgWidth / imgAspectRatio;

  //         // If the calculated height exceeds page height, adjust dimensions
  //         if (imgHeight > pageHeight - 20) {
  //           imgHeight = pageHeight - 20; // Leave some margin
  //           imgWidth = imgHeight * imgAspectRatio;
  //         }

  //         // Center the image on the page
  //         const xOffset = (pageWidth - imgWidth) / 2;
  //         const yOffset = (pageHeight - imgHeight) / 2;
  //         // Rotate the image and fit it to full A4 page
  //         //doc.addImage(base64Image, "JPEG",2, 545, 440, 292);
  //         doc.addImage(rotatedBase64, "JPEG", 0, 0, 288, 432);

  //         // Convert the generated PDF to Base64
  //         const pdfBase64Data = doc.output("datauristring");
  //         setPdfBase64(pdfBase64Data);
  //         setIsModalOpen(true); // Open modal
  //       };
  //     };

  //     reader.readAsDataURL(imageBlob);
  //   } catch (error) {
  //     console.error("Error converting image to PDF:", error);
  //   }
  // };

  const convertImageToPdfBase64 = async (id) => {
    try {
      const doc = new jsPDF({
        orientation: "portrait", // Portrait mode
        unit: "pt", // Points as unit
        format: [288, 432], // Custom dimensions: 4 inches wide, 6 inches long
      });

      const data = await axios.get(`${baseURL}/shipment/label/${id}`);
      console.log("data?.data?.", data?.data);
      if (Array.isArray(data?.data)) {
        for (const item of data.data) {
          const imageData = await item.graphicImage;
          if (!imageData) continue;
          const base64Image = `data:image/png;base64,${imageData}`;
          const imageUrl = base64Image;

          // Fetch image and convert it to a Base64 URL
          const imageResponse = await fetch(imageUrl);
          const imageBlob = await imageResponse.blob();
          const reader = new FileReader();

          await new Promise((resolve) => {
            reader.onloadend = () => {
              const img = new Image();
              img.src = reader.result;

              img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = img.height;
                canvas.height = img.width;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((90 * Math.PI) / 180); // Rotate 90 degrees
                ctx.drawImage(img, -img.width / 2, -img.height / 2);

                const rotatedBase64 = canvas.toDataURL("image/jpeg");

                // Add the rotated image to the PDF
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                // Maintain aspect ratio
                const imgAspectRatio = img.width / img.height;
                let imgWidth = pageWidth - 20; // Leave some margin
                let imgHeight = imgWidth / imgAspectRatio;

                if (imgHeight > pageHeight - 20) {
                  imgHeight = pageHeight - 20;
                  imgWidth = imgHeight * imgAspectRatio;
                }

                const xOffset = (pageWidth - imgWidth) / 2;
                const yOffset = (pageHeight - imgHeight) / 2;

                doc.addImage(rotatedBase64, "JPEG", 0, 0, 288, 432);

                // Add a new page if not the last image
                if (item !== data.data[data.data.length - 1]) {
                  doc.addPage();
                }

                resolve();
              };
            };

            reader.readAsDataURL(imageBlob);
          });
        }
      }

      // Convert the generated PDF to Base64
      const pdfBase64Data = doc.output("datauristring");
      setPdfBase64(pdfBase64Data);
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // const convertImageToPdfBase64 = async (id) => {
  //   try {
  //     const doc = new jsPDF({
  //       orientation: "portrait", // Portrait mode
  //       unit: "pt", // Points as unit
  //       format: [288, 432], // Custom dimensions: 4 inches wide, 6 inches long
  //     });

  //     const body = {
  //       trackingNumber: "1ZA70C630406283405",
  //     };
  //     const data = await axios.post(`${baseURL}/ups/recover-label`, body, {
  //       headers: {
  //         Authorization: token, // Replace 'yourToken' with your actual token
  //       },
  //     });
  //     console.log("response data", data?.data);
  //     if (Array.isArray(data?.data)) {
  //       for (const item of data.data) {
  //         const imageData = await item?.LabelImage?.GraphicImage;
  //         if (!imageData) continue;
  //         const base64Image = `data:image/png;base64,${imageData}`;
  //         const imageUrl = base64Image;
  //         // Fetch image and convert it to a Base64 URL
  //         const imageResponse = await fetch(imageUrl);
  //         const imageBlob = await imageResponse.blob();
  //         const reader = new FileReader();

  //         await new Promise((resolve) => {
  //           reader.onloadend = () => {
  //             const img = new Image();
  //             img.src = reader.result;

  //             img.onload = () => {
  //               const canvas = document.createElement("canvas");
  //               const ctx = canvas.getContext("2d");

  //               canvas.width = img.height;
  //               canvas.height = img.width;
  //               ctx.translate(canvas.width / 2, canvas.height / 2);
  //               ctx.rotate((90 * Math.PI) / 180); // Rotate 90 degrees
  //               ctx.drawImage(img, -img.width / 2, -img.height / 2);

  //               const rotatedBase64 = canvas.toDataURL("image/jpeg");

  //               // Add the rotated image to the PDF
  //               const pageWidth = doc.internal.pageSize.getWidth();
  //               const pageHeight = doc.internal.pageSize.getHeight();

  //               // Maintain aspect ratio
  //               const imgAspectRatio = img.width / img.height;
  //               let imgWidth = pageWidth - 20; // Leave some margin
  //               let imgHeight = imgWidth / imgAspectRatio;

  //               if (imgHeight > pageHeight - 20) {
  //                 imgHeight = pageHeight - 20;
  //                 imgWidth = imgHeight * imgAspectRatio;
  //               }

  //               const xOffset = (pageWidth - imgWidth) / 2;
  //               const yOffset = (pageHeight - imgHeight) / 2;

  //               doc.addImage(rotatedBase64, "JPEG", 0, 0, 288, 432);

  //               // Add a new page if not the last image
  //               if (item !== data.data[data.data.length - 1]) {
  //                 doc.addPage();
  //               }

  //               resolve();
  //             };
  //           };

  //           reader.readAsDataURL(imageBlob);
  //         });
  //       }
  //     }

  //     // Convert the generated PDF to Base64
  //     const pdfBase64Data = doc.output("datauristring");
  //     setPdfBase64(pdfBase64Data);
  //     setIsModalOpen(true); // Open modal
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let today = new Date();
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
  const exportRows = shipInfo?.map((user) => ({
    client: user.companyName,
    tracking: user.trackingNo,
    invoiceNo: user.invoiceNo,
    carrierCode: user?.carrierCode,
    weight: user.weight,
    length: user?.lenght,
    width: user?.width,
    height: user?.height,
    recipient: user?.name,
    shipTo: user?.address + ", " + user?.city + " " + user?.postalCode + ", " + user?.countryCode,
    shipDate: user?.shipDate,
    createdAt: user.createdAt,
    refund: user.refund,
  }));
  const exportCoulmns = [
    { Header: "Client", accessor: "client", width: "10%", align: "left" },
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
  const rows = shipInfo.map((user) => ({
    company: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        ESCM GmbH
      </MDTypography>
    ),
    label: (
      <Typography
        onClick={(e) => convertImageToPdfBase64(user.invoiceNo)}
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
    XLSX.writeFile(workbook, `shipments-${today}.xlsx`);
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
              {/* <Grid item xs={6} md={2}>
                <TextField label="Search Invoice No" variant="outlined" fullWidth margin="normal" />
              </Grid> */}
              {(userLavelId === 1 || userLavelId === 2) && (
                <Grid item xs={6} md={2}>
                  <Autocomplete
                    fullWidth
                    name="creditAccountId"
                    size="medium"
                    style={{ padding: 5, marginTop: 10 }}
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
              <Grid item xs={6} md={2}>
                <Button
                  onClick={handleExport}
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
