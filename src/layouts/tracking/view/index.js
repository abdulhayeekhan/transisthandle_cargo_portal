import React, { useEffect, useState, useRef } from "react";
import InputMask from "react-input-mask";
import {
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    Radio,
    Box,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    Autocomplete,
    Typography,
    Icon,
    FormLabel,
    Card,
    CardContent,
} from "@mui/material";
import { useForm, Controller } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import axios from "axios";
import StyledTableCell from 'style/index'

import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import brandLogo from "assets/images/logos/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCollectionCenterCitiesList } from "store/cities";
import { useDispatch } from "react-redux";
import { AddNewTracking } from "store/tracking";
import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Font,
    PDFViewer
} from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { GetSingleShipmentData } from "store/tracking";
const baseURL = process.env.REACT_APP_API_URL;

// Optional custom font
// Font.register({
//     family: 'Roboto',
//     fonts: [
//         { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2' },
//         { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc-.woff2', fontWeight: 'bold' },
//     ],
// });

const styles = StyleSheet.create({
    page: {
        //fontFamily: 'Roboto',
        fontSize: 10,
        padding: 30,
        lineHeight: 1.4,
    },
    logo: {
        width: 100,
        height: 50,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        marginVertical: 5,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 11,
        marginBottom: 4,
        textDecoration: 'underline',
    },
    fieldRow: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    label: {
        width: 100,
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
    },
    shipmentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#333',
        padding: 6,
    },
    table: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    tableHeader: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#333',
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    colSr: { width: '10%' },
    colDesc: { width: '60%' },
    colQty: { width: '30%', textAlign: 'right' },

    undertakingSection: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#000',
        paddingTop: 10,
    },
    sigRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    sigBox: {
        width: '24%',
        textAlign: 'center',
    },
    line: {
        marginTop: 40,
        borderBottomWidth: 1,
        borderColor: '#000',
        width: '100%',
    },
});


const ViewInvoice = () => {
    const { id } = useParams()
    const shipmentId = id; // Fallback if id is not provided
    const dispatch = useDispatch();
    const [Informarion,setInformation] = useState('');
    const [qrCodeImage, setQrCodeImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(GetSingleShipmentData(shipmentId));
            if (res?.payload) {
                setInformation(res.payload);
                const qrCodeImageID = await QRCode.toDataURL(res.payload?.TrackingId);
                setQrCodeImage(qrCodeImageID);
            } else {
                toast.error("Failed to fetch shipment data");
            }
        }
        fetchData();
    }, [shipmentId, dispatch]);

    const [data, setData] = useState({
        date: '2025-07-24',
        trackingId: 'TRK-123456',
        shipper: {
            name: 'Ali Khan',
            address: '123 Shipper Street, Karachi',
            telephone: '0321-1234567',
            pieces: '3',
            cnic: '35202-8987654-5'
        },
        consignee: {
            name: 'Ahmed Raza',
            address: '456 Consignee Road, Lahore',
            zip: '54000',
            telephone: '0300-9876543',
        },
        shipment: {
            grossWeight: '15kg',
            pieces: '3',
            freightAmount: 'Rs. 1200',
            value: 'Rs. 8000000',
        },
        descriptions: [
            { description: 'Clothing items', quantity: 2 },
            { description: 'Shoes', quantity: 1 },
        ],
    })
    
    
    return (
        <DashboardLayout>
            <PDFViewer style={{ width: '100%', height: '110vh' }} >
                <Document>
                    <Page size="A4" style={styles.page}>
                        {/* Logo */}
                        {/* <View style={{ alignItems: 'center' }}>
                            <Image style={styles.logo} src={brandLogo} />
                        </View> */}

                        <View style={[styles.row, { alignItems: 'center', marginBottom: 10 }]}>
                            {/* Brand Logo (Left Side) */}
                            <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                <Image style={styles.logo} src={brandLogo} />
                            </View>

                            {/* QR Code + Tracking ID (Right Side) */}
                            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                <Image
                                    style={{ width: 60, height: 60 }}
                                    src={qrCodeImage} // Must be a valid base64 or image URL
                                />
                                <Text style={{ fontSize: 10, marginTop: 4 }}>
                                    Tracking ID: {Informarion?.TrackingId}
                                </Text>
                            </View>
                        </View>

                        {/* Date and Tracking ID */}
                        <View style={[styles.row, styles.section]}>
                            <Text>Date: {Informarion?.BookingDate}</Text>
                            {/* <Text>Tracking ID: {data?.trackingId}</Text>  */}
                            {/* <View>
                                <Text>Date: {data?.date}</Text>
                                <Text>Tracking ID: {data?.trackingId}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    style={{ width: 60, height: 60 }}
                                    src={qrCodeImage} // ← This should be base64 or URL of QR code
                                />
                            </View> */}
                        </View>

                        {/* Shipper and Consignee Information */}
                        <View style={styles.row}>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.sectionTitle}>Shipper Information</Text>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Name:</Text>
                                    <Text style={styles.value}>{Informarion?.FirstName+' '+Informarion?.LastName}</Text>
                                </View>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Address:</Text>
                                    <Text style={styles.value}>{Informarion?.ClientAddress}</Text>
                                </View>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Tel:</Text>
                                    <Text style={styles.value}>{Informarion?.ClientContact}</Text>
                                </View>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>No of Pcs:</Text>
                                    <Text style={styles.value}>{Informarion?.NoOfPcs}</Text>
                                </View>
                            </View>


                            <View style={{ width: '48%' }}>
                                <Text style={styles.sectionTitle}>Consignee Information</Text>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Name:</Text>
                                    <Text style={styles.value}>{Informarion?.ConsigneeName}</Text>
                                </View>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Address:</Text>
                                    <Text style={styles.value}>{Informarion?.ConsigneeAddress}</Text>
                                </View>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Zip Code:</Text>
                                    <Text style={styles.value}>{Informarion?.ConsigneeZip}</Text>
                                </View>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.label}>Telephone:</Text>
                                    <Text style={styles.value}>{Informarion?.ConsigneeContact}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Shipment Information */}
                        <View style={styles.shipmentInfo}>
                            <Text>Gross Weight: {Informarion?.Weight+' '+Informarion?.WeightUnit}</Text>
                            <Text>No of Pcs: {Informarion?.NoOfPcs}</Text>
                            <Text>Freight Amt: {Informarion?.FreightAmountPKR}</Text>
                            <Text>Value: {Informarion?.ValuePKR}</Text>
                        </View>

                        {/* Description Table */}
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.colSr}>Sr No</Text>
                                <Text style={styles.colDesc}>Description of Goods</Text>
                                <Text style={styles.colQty}>Quantity</Text>
                            </View>
                            {Informarion?.shipmentDetails?.map((item, idx) => (
                                <View style={styles.tableRow} key={idx}>
                                    <Text style={styles.colSr}>{idx + 1}</Text>
                                    <Text style={styles.colDesc}>{item.Description}</Text>
                                    <Text style={styles.colQty}>{item.Quantity}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Undertaking */}
                        <View style={styles.undertakingSection}>
                            <Text style={styles.sectionTitle}>UNDERTAKING</Text>
                            <Text>
                                I hereby declare that the above-mentioned goods are my personal belongings and do not contain any illegal or prohibited items.
                                I understand that in the case of any loss, damage, or if any narcotic substances or illegal items are found in the shipment,
                                the sender (myself) will be held fully responsible under international shipping laws.
                            </Text>

                            {/* Signature Section */}
                            <View style={styles.sigRow}>
                                <View style={styles.sigBox}>
                                    <Text>CNIC No</Text>

                                    <Text style={{ fontSize: 14, marginTop: 26, borderBottom: 1 }}>{Informarion?.CNIC}</Text>

                                </View>
                                <View style={styles.sigBox}>
                                    <Text>Shipper Signature</Text>
                                    <View style={styles.line} />
                                </View>

                                <View style={styles.sigBox}>
                                    <Text>Shipper Thumb Impression</Text>
                                    <View style={styles.line} />
                                </View>
                                <View style={styles.sigBox}>
                                    <Text>Receiver Signature</Text>
                                    <View style={styles.line} />
                                </View>
                            </View>

                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#555' }}>
                                    No stamp required. This is a system-generated invoice.
                                </Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </DashboardLayout>
    )
}
export default ViewInvoice;