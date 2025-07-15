import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCollectionCenterCitiesList } from "store/cities";
import { useDispatch } from "react-redux";
import { AddNewTracking } from "store/tracking";
const baseURL = process.env.REACT_APP_API_URL;

function AddTracking() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const createdBy = userInfo?.id;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());
  const createdAt = `${parts.find((p) => p.type === "year").value}-${
    parts.find((p) => p.type === "month").value
  }-${parts.find((p) => p.type === "day").value}`;
  const [trackingInfo, setTrackingInfo] = useState({
    CNIC: "",
    ContactNo: "",
    Email: "",
    PostalCode: "",
    CityId: 1,
    CreatedBy: createdBy,
    ModifiedBy: createdBy,
    Weight: 0,
    WeightUnit: "Kg",
    Description: "",
    BookingCityId: "",
  });
  console.log("trackingInfo:", trackingInfo);
  const [IsForUK, setIsForUK] = useState(true);
  const handleChangeData = async (e) => {
    setTrackingInfo({ ...trackingInfo, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const [bookingCities, setBookingCities] = useState([]);
  const [cityValue, setCityValue] = useState(null);
  const GetCountryies = async () => {
    const res = await dispatch(GetCollectionCenterCitiesList());
    if (res?.payload) {
      setBookingCities(res?.payload);
    }
  };

  useEffect(() => {
    GetCountryies();
  }, []);

  const handleCityChange = async (event, newValue) => {
    setCityValue(newValue);
    setTrackingInfo({ ...trackingInfo, BookingCityId: newValue?.id });
  };

  const [saveButton, setSaveButton] = useState(false);
  const handleSaveCompany = async (e) => {
    e.preventDefault();
    const finalBody = {
      ...trackingInfo,
      IsForUK: IsForUK,
    };
    await dispatch(AddNewTracking(finalBody));
    navigate("/tracking");
  };
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <form onSubmit={(e) => handleSaveCompany(e)}>
        <MDBox
          sx={{
            height: "65vh", // Set a fixed height for the scrollable area
            overflowY: "auto", // Enable vertical scrolling
            padding: 2,
            marginY: 2,
          }}
        >
          <Grid container spacing={2}>
            {/* Top Section */}
            <Grid item xs={12}>
              <Typography>Cutomer Info</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="FirstName"
                name="FirstName"
                value={trackingInfo?.FirstName}
                onChange={(e) => handleChangeData(e)}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LastName"
                name="LastName"
                value={trackingInfo?.LastName}
                onChange={(e) => handleChangeData(e)}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid display="flex" item xs={12} gap={2} sm={6}>
              <TextField
                label="Contact No"
                name="ContactNo"
                value={trackingInfo?.ContactNo}
                onChange={(e) => handleChangeData(e)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid display="flex" item xs={12} gap={2} sm={6}>
              <TextField
                label="Email"
                name="Email"
                value={trackingInfo?.Email}
                onChange={(e) => handleChangeData(e)}
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputMask
                mask="99999-9999999-9"
                name="CNIC"
                value={trackingInfo.CNIC}
                onChange={(e) => handleChangeData(e)}
              >
                {(inputProps) => (
                  <TextField
                    size="small"
                    name="CNIC"
                    label="CNIC No"
                    {...inputProps}
                    placeholder="XXXXX-XXXXXXX-X"
                    fullWidth
                    variant="outlined"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Weight (KG)"
                name="Weight"
                value={trackingInfo?.Weight}
                onChange={(e) => handleChangeData(e)}
                size="small"
                type="number"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Postal code"
                name="PostalCode"
                onChange={(e) => handleChangeData(e)}
                value={trackingInfo?.PostalCode}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                name="creditAccountId"
                size="small"
                options={bookingCities}
                value={cityValue} // Bind the selected value (object with `id`, `label`, `code`)
                onChange={handleCityChange}
                getOptionLabel={(option) => option.name} // Combine `label` and `code` for display
                renderInput={(params) => (
                  <TextField
                    name="creditAccountId"
                    size="small"
                    {...params}
                    label="Order Booking City"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Description"
                name="Description"
                value={trackingInfo?.Description}
                onChange={(e) => handleChangeData(e)}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" gap={4}>
                <FormControl>
                  <FormLabel>This Tracking</FormLabel>
                  <RadioGroup
                    row
                    value={IsForUK}
                    onChange={(e) => setIsForUK(e.target.value)}
                    display="flex"
                    gap={4}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="For UK" />
                    <FormControlLabel value={false} control={<Radio />} label="For USA" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display="flex" style={{ justifyContent: "center" }} gap={2} mb={2}>
              <Button
                variant="contained"
                style={{ color: "#fff" }}
                disabled={saveButton}
                type="submit"
              >
                <Icon fontSize="large">save</Icon>
                Save
              </Button>

              <Button
                variant="outlined"
                onClick={(e) => navigate("/tracking")}
                style={{ color: "grey" }}
              >
                <Icon fontSize="large">close</Icon>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}

export default AddTracking;
