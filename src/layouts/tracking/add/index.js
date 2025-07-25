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
  Card,
  CardContent,
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
  const createdAt = `${parts.find((p) => p.type === "year").value}-${parts.find((p) => p.type === "month").value
    }-${parts.find((p) => p.type === "day").value}`;
  const [trackingInfo, setTrackingInfo] = useState({
    CNIC: "",
    ContactNo: "",
    Email: "",
    PostalCode: "",
    Address: "",
    CityId: 1,
    CreatedBy: createdBy,
    ModifiedBy: createdBy,
    Weight: 0,
    WeightUnit: "Kg",
    Description: "",
    BookingCityId: "",
    ConsignAddress: "",
    ConsignCountryId: "",
    ConsignZipCode: "",
    ConsignContactNo: "",
    FreightAmountPKR: 0,
    ValuePKR: 0,
    NoOfPcs:0
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
  const [isPost,setIsPost] = useState(false)
  const handleSaveCompany = async (e) => {
    setIsPost(true)
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
        >
          <Card style={{ backgroundColor: '#fff' }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Top Section */}


                <Grid item xs={6}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: 2, // 16px padding inside the box
                    backgroundColor: '#f8fde3',
                    marginTop: 3
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Shipper Informarion</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Shipper FirstName"
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
                        label="Shipper LastName"
                        name="LastName"
                        value={trackingInfo?.LastName}
                        onChange={(e) => handleChangeData(e)}
                        fullWidth
                        required
                        size="small"
                      />
                    </Grid>

                    <Grid display="flex" item xs={12} gap={2} sm={12}>
                      <TextField
                        label="Address"
                        name="Address"
                        value={trackingInfo?.Address}
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
                        size="small"
                        label="Postal code"
                        name="PostalCode"
                        onChange={(e) => handleChangeData(e)}
                        value={trackingInfo?.PostalCode}
                        fullWidth
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

                  </Grid>
                </Grid>

                <Grid item xs={6}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: 2, // 16px padding inside the box
                    backgroundColor: '#fde7e3',
                    marginTop: 3
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Consignee Informarion</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Consignee Full Name"
                        name="ConsignName"
                        value={trackingInfo?.ConsignName}
                        onChange={(e) => handleChangeData(e)}
                        fullWidth
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Address"
                        name="ConsignAddress"
                        value={trackingInfo?.ConsignAddress}
                        onChange={(e) => handleChangeData(e)}
                        fullWidth
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Zip Code"
                        name="ConsignZipCode"
                        value={trackingInfo?.ConsignZipCode}
                        onChange={(e) => handleChangeData(e)}
                        fullWidth
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Contact No"
                        name="ConsignContactNo"
                        value={trackingInfo?.ConsignContactNo}
                        onChange={(e) => handleChangeData(e)}
                        fullWidth
                        required
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Freight Amount (PKR)"
                    name="FreightAmountPKR"
                    value={trackingInfo?.FreightAmountPKR}
                    onChange={(e) => handleChangeData(e)}
                    size="small"
                    type="number"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Value (PKR)"
                    name="ValuePKR"
                    value={trackingInfo?.ValuePKR}
                    onChange={(e) => handleChangeData(e)}
                    size="small"
                    type="number"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
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

                
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3}>
                  <TextField
                    label="No Of Pcs"
                    name="NoOfPcs"
                    value={trackingInfo?.NoOfPcs}
                    onChange={(e) => handleChangeData(e)}
                    size="small"
                    type="number"
                    required
                    fullWidth
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
            </CardContent>
          </Card>
        </MDBox>
        <Grid container spacing={1} sx={{marginTop:2}}>
          <Grid item xs={12}>
            <Box display="flex" style={{ justifyContent: "center" }} gap={2} mb={2}>
              <Button
                variant="contained"
                style={{ color: "#fff" }}
                disabled={isPost}
                type="submit"
              >
                <Icon fontSize="large">save</Icon>
                Save
              </Button>

              <Button
                variant="outlined"
                disabled={isPost}
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
