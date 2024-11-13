import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

function ShippingForm() {
  const [stateValue, setStateValue] = useState(null);
  const [countryValue, setCountryValue] = useState(null);

  const [countryId, setCountryId] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [shipCountryCode, setShipCountryCode] = useState("");
  const [shipStateCode, setShipStateCode] = useState("");
  console.log("shipCountryCode:", shipCountryCode);

  const [shipmentInfo, setShipmentInfo] = useState({
    ShipmentRequest: {
      Request: {
        SubVersion: "1801",
        RequestOption: "nonvalidate",
        TransactionReference: {
          CustomerContext: "",
        },
      },
      Shipment: {
        Description: "Ship WS test",
        Shipper: {
          Name: "ShipperName",
          AttentionName: "ShipperZs Attn Name",
          TaxIdentificationNumber: "123456",
          Phone: {
            Number: "1115554758",
            Extension: " ",
          },
          ShipperNumber: 456,
          FaxNumber: "8002222222",
          Address: {
            AddressLine: "2311 York Rd",
            City: "Timonium",
            StateProvinceCode: "MD",
            PostalCode: "21093",
            CountryCode: "US",
          },
        },
        ShipTo: {
          Name: "",
          AttentionName: "",
          Phone: {
            Number: "",
          },
          Address: {
            AddressLine: "",
            City: "",
            StateProvinceCode: shipStateCode,
            PostalCode: "",
            CountryCode: shipCountryCode,
          },
          Residential: "",
        },
        ShipFrom: {
          Name: "T and T Designs",
          AttentionName: "1160b_74",
          Phone: {
            Number: "1234567890",
          },
          FaxNumber: "1234567890",
          Address: {
            AddressLine: "2311 York Rd",
            City: "Alpharetta",
            StateProvinceCode: "GA",
            PostalCode: "30005",
            CountryCode: "US",
          },
        },
        PaymentInformation: {
          ShipmentCharge: {
            Type: "01",
            BillShipper: {
              AccountNumber: 78546,
            },
          },
        },
        Service: {
          Code: "03",
          Description: "Express",
        },
        Package: {
          Description: " ",
          Packaging: {
            Code: "02",
            Description: "Nails",
          },
          Dimensions: {
            UnitOfMeasurement: {
              Code: "IN",
              Description: "Inches",
            },
            Length: "10",
            Width: "30",
            Height: "45",
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: "LBS",
              Description: "Pounds",
            },
            Weight: "5",
          },
        },
      },
      LabelSpecification: {
        LabelImageFormat: {
          Code: "GIF",
          Description: "GIF",
        },
        HTTPUserAgent: "Mozilla/4.5",
      },
    },
  });

  const handleInputChange = (path, value) => {
    setShipmentInfo((prevInfo) => {
      // Copy previous state
      const newInfo = { ...prevInfo };
      // Get the last key in the path
      const keys = path.split(".");
      const lastKey = keys.pop();

      // Navigate through the object structure based on path
      let current = newInfo;
      for (const key of keys) {
        current[key] = { ...current[key] };
        current = current[key];
      }

      // Update the target field
      current[lastKey] = value;

      return newInfo;
    });
  };

  const GetCountryies = async () => {
    const { data } = await axios.get(`${baseURL}/country/getUPS`);
    setCountryList(data);
  };

  // const GetStateData = async () => {
  //   const { data } = await axios.get(`${baseURL}/state/getByCountry/${countryId}`);
  //   setStateList(data);
  // };

  useEffect(() => {
    GetCountryies();
  }, [countryId, shipStateCode, shipCountryCode]);

  const handleCountryChange = async (event, newValue) => {
    if (newValue !== null) {
      setCountryValue(newValue);
      setCountryId(newValue.id);
      setShipCountryCode(newValue.alpha2);
      const { data } = await axios.get(`${baseURL}/state/getByCountry/${newValue.id}`);
      setStateList(data);
      setStateValue(null);
    } else {
      console.log("No value country");
      setCountryValue(null);
    }
  };
  const handleStateChange = (event, newValue) => {
    if (newValue !== null) {
      console.log("state code:", newValue.code);
      setStateValue(newValue);
      setShipStateCode(newValue?.code);
    } else {
      setStateValue(null);
    }
  };
  console.log("shipmentInfo:", shipmentInfo);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox
        sx={{
          height: "75vh", // Set a fixed height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          padding: 2,
          marginY: 2,
        }}
      >
        <form>
          <Grid container spacing={2}>
            {/* Top Section */}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.AttentionName", e.target.value)
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.Name", e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                name="creditAccountId"
                size="medium"
                options={countryList}
                value={countryValue} // Bind the selected value (object with `id`, `label`, `code`)
                onChange={handleCountryChange}
                getOptionLabel={(option) => `${option.Country} (${option.alpha2})`} // Combine `label` and `code` for display
                renderInput={(params) => (
                  <TextField
                    name="creditAccountId"
                    size="medium"
                    required
                    {...params}
                    label="State"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                name="creditAccountId"
                size="medium"
                options={stateList}
                value={stateValue} // Bind the selected value (object with `id`, `label`, `code`)
                onChange={handleStateChange}
                getOptionLabel={(option) => `${option.state}`} // Combine `label` and `code` for display
                renderInput={(params) => (
                  <TextField
                    name="creditAccountId"
                    size="medium"
                    required
                    {...params}
                    label="State"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.Address.City", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal code"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.ShipTo.Address.PostalCode",
                    e.target.value
                  )
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address Line 1 *"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.ShipTo.Address.AddressLine",
                    e.target.value
                  )
                }
                size="medium"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Address Line 2" fullWidth />
            </Grid>

            {/* Country Selector */}

            {/* Weight and Units */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="Pounds & Ounces">
                  <FormControlLabel
                    value="Pounds & Ounces"
                    control={<Radio />}
                    label="Pounds & Ounces"
                  />
                  <FormControlLabel value="Grams" control={<Radio />} label="Grams" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Weight (LB)" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Weight (OZ)" type="number" fullWidth />
            </Grid>

            {/* Dimensions */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="Inches">
                  <FormControlLabel value="Inches" control={<Radio />} label="Inches" />
                  <FormControlLabel value="Cm" control={<Radio />} label="Cm" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Size (L)" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Size (W)" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Size (H)" type="number" fullWidth />
            </Grid>

            {/* Package and Service */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Package</InputLabel>
                <Select defaultValue="UPS Package">
                  <MenuItem value="UPS Package">UPS Package</MenuItem>
                  {/* Add other package options as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Service</InputLabel>
                <Select defaultValue="Saver - DaimonShip">
                  <MenuItem value="Saver - DaimonShip">Saver - DaimonShip</MenuItem>
                  {/* Add other service options as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Signature */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Signature</InputLabel>
                <Select defaultValue="Delivery">
                  <MenuItem value="Delivery">Delivery</MenuItem>
                  {/* Add other signature options as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} sm={4}>
              <TextField label="City" fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="State" fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Postal Code" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" type="email" fullWidth />
            </Grid>

            {/* Customs Declarations */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Contents</InputLabel>
                <Select defaultValue="Merchandise">
                  <MenuItem value="Merchandise">Merchandise</MenuItem>
                  {/* Add other content options as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>If Undeliverable</InputLabel>
                <Select defaultValue="Return To Sender">
                  <MenuItem value="Return To Sender">Return To Sender</MenuItem>
                  {/* Add other options as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Export Declaration Number" fullWidth />
            </Grid>

            {/* Declaration Section */}
            <Grid item xs={12}>
              <TextField label="Description" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="SKU" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Quantity" type="number" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Item Value" type="number" fullWidth />
            </Grid>

            {/* Total Value */}
            <Grid item xs={12} sm={6}>
              <TextField label="Total Value" type="number" fullWidth />
            </Grid>
          </Grid>
        </form>
      </MDBox>
    </DashboardLayout>
  );
}

export default ShippingForm;
