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
  Typography,
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
  // console.log("shipCountryCode:", shipCountryCode);
  // setShipmentInfo({...shipmentInfo,ShipmentRequest.Shipment.ShipTo.Address.CountryCode})
  // ShipmentRequest.Shipment.ShipTo.Address.CountryCode.StateProvinceCode
  // ShipmentRequest.Shipment.ShipTo.Address.CountryCode
  // ShipmentRequest.Shipment.Package.Dimensions.Length
  // ShipmentRequest.Shipment.Package.Dimensions.Width
  // ShipmentRequest.Shipment.Package.PackageWeight.Weight
  const [shipmentInfo, setShipmentInfo] = useState({
    ShipmentRequest: {
      Request: {
        SubVersion: "1801",
        RequestOption: "nonvalidate",
        TransactionReference: { CustomerContext: "" },
      },
      Shipment: {
        Description: "Ship WS test",
        Shipper: {
          Name: "Escm GmbH",
          AttentionName: "Shahzad Choudary",
          TaxIdentificationNumber: "DE331991534",
          Phone: {
            Number: "015202446893",
            Extension: " ",
          },
          ShipperNumber: " ",
          FaxNumber: "8002222222",
          Address: {
            AddressLine: ["Butzweilerhof Allee 3"],
            City: "Koln",
            StateProvinceCode: "NW",
            PostalCode: "50829",
            CountryCode: "DE",
          },
        },
        ShipTo: {
          Name: "",
          AttentionName: "",
          Phone: { Number: "" },
          Address: {
            AddressLine: [""],
            City: "",
            StateProvinceCode: "",
            PostalCode: "",
            CountryCode: "",
          },
          Residential: " ",
        },
        ShipFrom: {
          Name: "Escm GmbH",
          AttentionName: "Shahzad Choudary",
          Phone: { Number: "015202446893" },
          FaxNumber: "",
          Address: {
            AddressLine: ["Butzweilerhof Allee 3"],
            City: "Koln",
            StateProvinceCode: "NW",
            PostalCode: "50829",
            CountryCode: "DE",
          },
        },
        PaymentInformation: {
          ShipmentCharge: {
            Type: "01",
            BillShipper: { AccountNumber: "A70C63" },
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
            Length: "",
            Width: "",
            Height: "",
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: "KG",
              Description: "Kilograms",
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
      setShipmentInfo((prevState) => ({
        ...prevState,
        ShipmentRequest: {
          ...prevState.ShipmentRequest,
          Shipment: {
            ...prevState.ShipmentRequest.Shipment,
            ShipTo: {
              ...prevState.ShipmentRequest.Shipment.ShipTo,
              Address: {
                ...prevState.ShipmentRequest.Shipment.ShipTo.Address,
                CountryCode: newValue.alpha2, // Replace with your desired value
              },
            },
          },
        },
      }));
      const { data } = await axios.get(`${baseURL}/state/getByCountry/${newValue.id}`);
      setStateList(data);
      setStateValue(null);
    } else {
      setCountryValue(null);
      setShipmentInfo((prevState) => ({
        ...prevState,
        ShipmentRequest: {
          ...prevState.ShipmentRequest,
          Shipment: {
            ...prevState.ShipmentRequest.Shipment,
            ShipTo: {
              ...prevState.ShipmentRequest.Shipment.ShipTo,
              Address: {
                ...prevState.ShipmentRequest.Shipment.ShipTo.Address,
                CountryCode: "",
                StateProvinceCode: "", // Replace with your desired value
              },
            },
          },
        },
      }));
    }
  };
  const handleStateChange = (event, newValue) => {
    if (newValue !== null) {
      setStateValue(newValue);
      setShipStateCode(newValue?.code);
      setShipmentInfo((prevState) => ({
        ...prevState,
        ShipmentRequest: {
          ...prevState.ShipmentRequest,
          Shipment: {
            ...prevState.ShipmentRequest.Shipment,
            ShipTo: {
              ...prevState.ShipmentRequest.Shipment.ShipTo,
              Address: {
                ...prevState.ShipmentRequest.Shipment.ShipTo.Address,
                StateProvinceCode: newValue.code, // Replace with your desired value
              },
            },
          },
        },
      }));
    } else {
      setStateValue(null);
      setShipmentInfo((prevState) => ({
        ...prevState,
        ShipmentRequest: {
          ...prevState.ShipmentRequest,
          Shipment: {
            ...prevState.ShipmentRequest.Shipment,
            ShipTo: {
              ...prevState.ShipmentRequest.Shipment.ShipTo,
              Address: {
                ...prevState.ShipmentRequest.Shipment.ShipTo.Address,
                StateProvinceCode: "", // Replace with your desired value
              },
            },
          },
        },
      }));
    }
  };
  console.log("shipmentInfo:", shipmentInfo);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox
        sx={{
          height: "70vh", // Set a fixed height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          padding: 2,
          marginY: 2,
        }}
      >
        <form>
          <Grid container spacing={2}>
            {/* Top Section */}
            <Grid item xs={12}>
              <Typography>Ship To</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.AttentionName", e.target.value)
                }
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.Name", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                name="creditAccountId"
                size="small"
                options={countryList}
                value={countryValue} // Bind the selected value (object with `id`, `label`, `code`)
                onChange={handleCountryChange}
                getOptionLabel={(option) => `${option.Country} (${option.alpha2})`} // Combine `label` and `code` for display
                renderInput={(params) => (
                  <TextField
                    name="creditAccountId"
                    size="small"
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
                size="small"
                options={stateList}
                value={stateValue} // Bind the selected value (object with `id`, `label`, `code`)
                onChange={handleStateChange}
                getOptionLabel={(option) => `${option.state}`} // Combine `label` and `code` for display
                renderInput={(params) => (
                  <TextField
                    name="creditAccountId"
                    size="small"
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
                size="small"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.Address.City", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
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
            <Grid display="flex" item xs={12} gap={2} sm={12}>
              <TextField
                label="Address Line 1 *"
                size="small"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.ShipTo.Address.AddressLine",
                    e.target.value
                  )
                }
                fullWidth
              />
              <TextField label="Address Line 2" size="small" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>

            {/* Country Selector */}
            <Grid item xs={12}>
              <Typography>Weight(KG) & Dimensions(In)</Typography>
            </Grid>
            {/* Weight and Units */}
            <Grid display="flex" item xs={12} gap={2} sm={6}>
              <TextField
                label="Weight (KG)"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.Package.PackageWeight.Weight",
                    e.target.value
                  )
                }
                size="small"
                type="number"
                fullWidth
              />
              <TextField label="Weight (Gram)" size="small" type="number" fullWidth />
            </Grid>

            {/* Dimensions */}
            <Grid item xs={12} sm={2}>
              <TextField
                label="Size (L) inches"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.Package.Dimensions.Length",
                    e.target.value
                  )
                }
                size="small"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Size (W) inches"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.Package.Dimensions.Width",
                    e.target.value
                  )
                }
                size="small"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Size (H) inches"
                onChange={(e) =>
                  handleInputChange(
                    "ShipmentRequest.Shipment.Package.Dimensions.Height",
                    e.target.value
                  )
                }
                size="small"
                type="number"
                fullWidth
              />
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
