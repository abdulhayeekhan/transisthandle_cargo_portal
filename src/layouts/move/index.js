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
import { Checkbox } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCollectionCenterCitiesList } from "store/cities";
import { useDispatch } from "react-redux";
import { GetTrackingData } from 'store/tracking';
import { GetTrackingStatus } from "store/trackingstatus";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const baseURL = process.env.REACT_APP_API_URL;
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Blue
        },
        secondary: {
            main: "#d32f2f", // Red
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});

function MoveTracking() {
    const navigate = useNavigate();
    const [IsForUK, setIsForUK] = useState(true);
    const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    const [trackingStatusList, setTrackingStatusList] = useState([]);
    console.log('trackingStatusList:', trackingStatusList)
    const createdBy = userInfo?.id;
    const [deliveryStatusId, setDeliveryStatusId] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [pageSize, setPageSize] = useState(10000);
    const [trackingInfo, setTrackingInfo] = useState([])
    const [trackingId, setTrackingId] = useState("");
    const [leftList, setLeftList] = useState([]);
    const [rightList, setRightList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [statusId, setStatusId] = useState("");
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const GetHandleTrackingStatusList = async () => {
        const response = await dispatch(GetTrackingStatus(IsForUK))
        if (response?.payload) {
            setTrackingStatusList(response.payload);
        }
    }
    const GetTrackingList = async () => {
        setLoading(true);
        let body = {
            pageNo: currentPage,
            pageSize: pageSize,
            trackingId,
            deliveryStatusId,
            IsforUK: IsForUK
        };
        setLeftList([]);
        setRightList([]);
        setSelectedIds([]);
        setTrackingInfo([]);
        setTotalRecords(0);

        const response = await dispatch(GetTrackingData(body))
        if (response?.payload) {
            setTrackingInfo(response.payload?.data);
            setLeftList(response.payload?.data);
            setTotalRecords(response.payload?.totalCount)
        }

    };

    // Fetch data when page or pageSize changes
    useEffect(() => {
        GetHandleTrackingStatusList()
    }, [pageSize, trackingId, deliveryStatusId]);

    const handleSwap = () => {
        const toMove = leftList.filter((item) => selectedIds.includes(item.Id));
        const remaining = leftList.filter((item) => !selectedIds.includes(item.Id));
        setLeftList(remaining);
        setRightList((prev) => [...prev, ...toMove]);
        setSelectedIds([]); // clear selection
    };
    const handleIsForUKChange = async (e) => {
        setTrackingStatusList([])
        setIsForUK(e.target.value === "true");

        const response = await dispatch(GetTrackingStatus(e.target.value))
        if (response?.payload) {
            setTrackingStatusList(response?.payload);
        }
    }

    const handleEditTracking = (e, index, field) => {
        const updated = [...rightList];
        updated[index][field] = e.target.value;
        setRightList(updated);
    };
    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        if (rightList.length === 0) {
            toast.error("Please select at least one tracking to update status.");
            return;
        }
        if (!statusId) {
            toast.error("Please select a status to update.");
            return;
        }

        const body = {
            shipmentIds: rightList.map(item => item.Id),
            statusId: statusId,
            createdBy: createdBy
        }
        try {
            const response = await axios.post(`${baseURL}/localShipment/UpdateShipmentStatus`, body);
            if (response?.data?.success) {
                toast.success("Tracking status updated successfully");
                setRightList([]);
                setLeftList([]);
                setSelectedIds([]);
            } else {
                toast.error("Failed to update tracking status");
            }
        } catch (error) {
            console.error("Error updating tracking status:", error);
            toast.error("An error occurred while updating tracking status");
        }
    }


    return (
        <DashboardLayout>
            <ThemeProvider theme={theme}>
                <form onSubmit={(e) => handleUpdateStatus(e)}>
                    <MDBox
                    >
                        <Card style={{ backgroundColor: '#fff' }}>
                            <CardContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end" alignItems="center">
                                        <Box display="flex" flexDirection="column" gap={4}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    value={IsForUK.toString()} // ensure it's a string for comparison
                                                    onChange={e => handleIsForUKChange(e)}
                                                    display="flex"
                                                    gap={4}
                                                >
                                                    <FormControlLabel value={"true"} control={<Radio />} label="For UK" />
                                                    <FormControlLabel value={"false"} control={<Radio />} label="For USA" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Tracking Status"
                                            value={deliveryStatusId}
                                            onChange={(e) => setDeliveryStatusId(e.target.value)}
                                            variant="outlined"
                                            fullWidth
                                            select
                                            size="small"
                                        >
                                            <MenuItem value={""}>--SELECT STATUS--</MenuItem>
                                            {trackingStatusList.map((option) => (
                                                <MenuItem key={option.Id} value={option.Id}>
                                                    {option.StatusName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                                        <Icon fontSize="large" color="primary" sx={{ cursor: 'pointer' }}>
                                            swap_horiz
                                        </Icon>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Move Tracking Status"
                                            value={statusId}
                                            onChange={(e) => setStatusId(e.target.value)}
                                            variant="outlined"
                                            fullWidth
                                            select
                                            size="small"
                                        >
                                            <MenuItem value={""}>--Move Tracking Status--</MenuItem>
                                            {trackingStatusList.map((option) => (
                                                <MenuItem
                                                    key={option.Id}
                                                    value={option.Id}
                                                    disabled={
                                                        parseInt(option.Id) <= parseInt(deliveryStatusId) // Disable same or lower statuses
                                                    }
                                                >
                                                    {option.StatusName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>


                                    <Grid item xs={12} sm={2} display="flex" justifyContent="flex-end" alignItems="center">
                                        <Button
                                            variant="contained"
                                            style={{ color: "#fff" }}
                                            onClick={() => GetTrackingList()}
                                        >
                                            Search
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    {/* Left Column: Get Trackings */}
                                    <Grid item xs={5} sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#F5F5F5', marginTop: 3 }}>
                                        <Typography variant="h6" gutterBottom>Get Trackings</Typography>

                                        {leftList?.map((item) => (
                                            <Box key={item.Id} display="flex" borderBottom="1px solid #eee" fontSize={15}>
                                                <Box width="10%">
                                                    <Checkbox
                                                        checked={selectedIds.includes(item.Id)}
                                                        onChange={() =>
                                                            setSelectedIds((prev) =>
                                                                prev.includes(item.Id)
                                                                    ? prev.filter((id) => id !== item.Id)
                                                                    : [...prev, item.Id]
                                                            )
                                                        }
                                                    />
                                                </Box>
                                                <Box width="40%" paddingTop={1}>{item.TrackingId}</Box>
                                                <Box width="40%" paddingTop={1}>
                                                    {item.FirstName} {item.LastName}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Grid>


                                    {/* Swap Icon in Center */}
                                    <Grid item xs={1} display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 3 }}>
                                        <Icon fontSize="large" color="primary" sx={{ cursor: 'pointer' }} onClick={handleSwap}>
                                            swap_horiz
                                        </Icon>
                                    </Grid>

                                    {/* Right Column: Move Tracking */}
                                    <Grid item xs={5} sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#f8fde3', marginTop: 3 }}>
                                        <Typography variant="h6" gutterBottom>Move Tracking</Typography>

                                        {rightList.map((item, index) => (
                                            <Box key={item.Id} display="flex" borderBottom="1px solid #eee" fontSize={15}>
                                                <Box width="10%">{index + 1}</Box>
                                                <Box width="40%">{item.TrackingId}</Box>
                                                <Box width="40%">
                                                    {item.FirstName} {item.LastName}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Grid>

                                </Grid>


                            </CardContent>
                        </Card>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Box display="flex" style={{ justifyContent: "center" }} gap={2} mt={3} mb={2}>
                                    <Button variant="contained" type="submit" style={{ color: "#fff" }}>
                                        <Icon fontSize="large">save</Icon>
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </MDBox>
                </form>
            </ThemeProvider>
        </DashboardLayout>
    );
}

export default MoveTracking;
