import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

function ShippingMultiShip() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));

  const [stateValue, setStateValue] = useState(null);
  const [countryValue, setCountryValue] = useState(null);
  const [email, setEmail] = useState("dumy@email.com");

  const [countryId, setCountryId] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [shipCountryCode, setShipCountryCode] = useState("");
  const [shipStateCode, setShipStateCode] = useState("");
  const GetCompanyInformation = async () => {
    const data = await axios.get(`${baseURL}/company/getSingle/${userInfo?.companyId}`);
    console.log("company data:", data?.data?.companyName);
    setCompanyName(data?.data?.companyName);
    setShipmentInfo((prevState) => ({
      ...prevState,
      ShipmentRequest: {
        ...prevState.ShipmentRequest,
        Shipment: {
          ...prevState.ShipmentRequest.Shipment,
          Description: data?.data?.companyName,
        },
      },
    }));
  };
  // console.log("shipCountryCode:", shipCountryCode);
  // setShipmentInfo({...shipmentInfo,ShipmentRequest.Shipment.ShipTo.Address.CountryCode})
  // ShipmentRequest.Shipment.ShipTo.Address.CountryCode.StateProvinceCode
  // ShipmentRequest.Shipment.ShipTo.Address.CountryCode
  // ShipmentRequest.Shipment.Package.Dimensions.Length
  // ShipmentRequest.Shipment.Package.Dimensions.Width
  // ShipmentRequest.Shipment.Package.PackageWeight.Weight
  const [declaration, setDeclaration] = useState([
    {
      arrayid: uuidv4(),
      description: "",
      Qty: 1,
      unitPrice: 0,
      HtsCode: "",
      totalPrice: 0,
    },
  ]);
  console.log("declaration:", declaration);
  const handleNewRow = (e) => {
    e.preventDefault();
    setDeclaration([
      ...declaration,
      {
        arrayid: uuidv4(),
        description: "",
        Qty: 1,
        unitPrice: 0,
        HtsCode: "",
        totalPrice: 0,
      },
    ]);
  };
  const handleremoverow = async (id) => {
    const NewRecord = await declaration.filter((data) => data.arrayid !== id);
    setDeclaration(NewRecord);
  };
  const handleChangeRows = (e, id) => {
    e.preventDefault();
    const newRows = declaration?.map((item) =>
      item.arrayid === id ? { ...item, [e.target.name]: e.target.value } : item
    );
    setDeclaration(newRows);
  };
  // ShipmentRequest?.Request?.TransactionReference?.CustomerContext
  //ShipmentRequest.Shipment.ShipTo.Address.AddressLine[0];
  function generateUniqueKey() {
    const prefix = "THC"; // Optional prefix
    const getRandomDigit = () => Math.floor(Math.random() * 10); // Random digit between 0-9
    const getRandomLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Random letter (A-Z)

    // Generate 8 random characters (letters + digits)
    let randomString = "";
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        randomString += getRandomLetter(); // Add a random letter
      } else {
        randomString += getRandomDigit(); // Add a random digit
      }
    }

    const CustomerContextKey = prefix + "-" + randomString.toUpperCase(); // Combine prefix and the random string

    setShipmentInfo((prevState) => ({
      ...prevState,
      ShipmentRequest: {
        ...prevState.ShipmentRequest,
        Request: {
          ...prevState.ShipmentRequest.Request,
          TransactionReference: {
            ...prevState.ShipmentRequest.Request.TransactionReference,
            CustomerContext: CustomerContextKey, // Update the CustomerContext here
          },
        },
      },
    }));
  }

  const [shipmentInfo, setShipmentInfo] = useState({
    ShipmentRequest: {
      Request: {
        SubVersion: "1801",
        RequestOption: "nonvalidate",
        TransactionReference: { CustomerContext: "" },
      },
      Shipment: {
        Description: "",
        Shipper: {
          Name: "Escm GmbH",
          AttentionName: "Shahzad Choudary",
          TaxIdentificationNumber: "DE331991534",
          Phone: {
            Number: "15202446893",
            Extension: "0049",
          },
          ShipperNumber: "A70C63",
          FaxNumber: "015202446893",
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
          Residential: "false",
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
          Code: "65",
          Description: "UPS Saver",
        },
        Package: [
          {
            Description: "",
            Packaging: {
              Code: "02",
              Description: "Nails",
            },
            Dimensions: {
              UnitOfMeasurement: {
                Code: "CM",
                Description: "Centimeters",
              },
              Length: "",
              Width: "",
              Height: "",
            },
            PackageWeight: {
              UnitOfMeasurement: {
                Code: "KGS",
                Description: "Kilograms",
              },
              Weight: "",
            },
          },
        ],
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
  console.log("shipmentInfo", shipmentInfo);
  // Function to add a new package
  const addPackage = () => {
    setShipmentInfo((prev) => ({
      ...prev,
      ShipmentRequest: {
        ...prev.ShipmentRequest,
        Shipment: {
          ...prev.ShipmentRequest.Shipment,
          Package: [
            ...prev.ShipmentRequest.Shipment.Package,
            {
              Description: "",
              Packaging: {
                Code: "02",
                Description: "Nails",
              },
              Dimensions: {
                UnitOfMeasurement: {
                  Code: "CM",
                  Description: "Centimeters",
                },
                Length: "",
                Width: "",
                Height: "",
              },
              PackageWeight: {
                UnitOfMeasurement: {
                  Code: "KGS",
                  Description: "Kilograms",
                },
                Weight: "",
              },
            },
          ],
        },
      },
    }));
  };

  // Function to update a package
  //   const updatePackage = (index, field, value) => {
  //     console.log("response:", index, "filed:", field, "Value", value);
  //     setShipmentInfo((prev) => {
  //       const updatedPackages = [...prev.ShipmentRequest.Shipment.Package];
  //       updatedPackages[index] = {
  //         ...updatedPackages[index],
  //         [field]: value,
  //       };
  //       return {
  //         ...prev,
  //         ShipmentRequest: {
  //           ...prev.ShipmentRequest,
  //           Shipment: {
  //             ...prev.ShipmentRequest.Shipment,
  //             Package: updatedPackages,
  //           },
  //         },
  //       };
  //     });
  //   };

  const updatePackage = (index, fieldPath, value) => {
    setShipmentInfo((prev) => {
      const updatedPackages = [...prev.ShipmentRequest.Shipment.Package];
      const fieldKeys = fieldPath.split("."); // Split the nested field path, e.g., "PackageWeight.Weight"

      // Update the nested field
      let nestedField = updatedPackages[index];
      fieldKeys.forEach((key, idx) => {
        if (idx === fieldKeys.length - 1) {
          nestedField[key] = value; // Update the final field
        } else {
          nestedField = nestedField[key]; // Traverse deeper
        }
      });

      return {
        ...prev,
        ShipmentRequest: {
          ...prev.ShipmentRequest,
          Shipment: {
            ...prev.ShipmentRequest.Shipment,
            Package: updatedPackages,
          },
        },
      };
    });
  };

  // Function to remove a package
  const removePackage = (index) => {
    setShipmentInfo((prev) => {
      const updatedPackages = [...prev.ShipmentRequest.Shipment.Package];
      updatedPackages.splice(index, 1);
      return {
        ...prev,
        ShipmentRequest: {
          ...prev.ShipmentRequest,
          Shipment: {
            ...prev.ShipmentRequest.Shipment,
            Package: updatedPackages,
          },
        },
      };
    });
  };
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
    generateUniqueKey();
    GetCompanyInformation();
  }, [countryId, shipStateCode, shipCountryCode]);

  // const handleAddress = async (index,address) =>{
  //   setShipmentInfo((prevInfo) => ({
  //     ...prevInfo,
  //     ShipmentRequest: {
  //       ...prevInfo.ShipmentRequest,
  //       Shipment: {
  //         ...prevInfo.ShipmentRequest.Shipment,
  //         ShipTo: {
  //           ...prevInfo.ShipmentRequest.Shipment.ShipTo,
  //           Address: {
  //             ...prevInfo.ShipmentRequest.Shipment.ShipTo.Address,
  //             AddressLine[index]: address,
  //           },
  //         },
  //       },
  //     },
  //   }));
  // }

  const handleAddress = async (index, address) => {
    setShipmentInfo((prevInfo) => {
      const updatedAddressLine = [...prevInfo.ShipmentRequest.Shipment.ShipTo.Address.AddressLine]; // Copy the AddressLine array
      updatedAddressLine[index] = address; // Update the specific index

      return {
        ...prevInfo,
        ShipmentRequest: {
          ...prevInfo.ShipmentRequest,
          Shipment: {
            ...prevInfo.ShipmentRequest.Shipment,
            ShipTo: {
              ...prevInfo.ShipmentRequest.Shipment.ShipTo,
              Address: {
                ...prevInfo.ShipmentRequest.Shipment.ShipTo.Address,
                AddressLine: updatedAddressLine, // Set the updated array
              },
            },
          },
        },
      };
    });
  };

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

  const current = new Date();

  const shipDate = `${current.getFullYear()}-${("0" + (current.getMonth() + 1)).slice(-2)}-${(
    "0" + current.getDate()
  ).slice(-2)}`;
  const [saveButton, setSaveButton] = useState(false);
  const handleSaveCompany = async (e) => {
    e.preventDefault();
    setSaveButton(true);
    const body = {
      shipData: shipmentInfo,
      invoiceData: {
        email,
        createdBy: userInfo?.id,
        shipDate,
        clientCompanyId: userInfo?.companyId,
        Details: declaration,
      },
    };
    const headers = {
      Authorization: token, // Replace with your actual token
    };
    await axios
      .post(`${baseURL}/ups/generate-multi-label`, body, { headers })
      .then((response) => {
        console.log("response", response);
        setSaveButton(true);
        navigate("/shipment");
        toast.success("create successully");
      })
      .catch((error) => {
        toast.error("" + error);
        setSaveButton(false);
      });
    e.preventDefault();
  };
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <form onSubmit={(e) => handleSaveCompany(e)}>
        <MDBox
          sx={{
            height: "60vh", // Set a fixed height for the scrollable area
            overflowY: "auto", // Enable vertical scrolling
            padding: 2,
            marginY: 2,
          }}
        >
          <Grid container spacing={2}>
            {/* Top Section */}
            <Grid item xs={12}>
              <Typography>Ship To</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Consignee"
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
                required
                size="small"
              />
            </Grid>
            <Grid display="flex" item xs={12} gap={2} sm={6}>
              <TextField
                label="Address Line 1"
                size="small"
                required
                onChange={(e) => handleAddress(0, e.target.value)}
                fullWidth
              />
              {/* <TextField label="Address Line 2" disabled={true} size="small" fullWidth /> */}
            </Grid>
            <Grid display="flex" item xs={12} gap={2} sm={6}>
              <TextField
                label="Address Line 2"
                size="small"
                onChange={(e) => handleAddress(1, e.target.value)}
                fullWidth
              />
              {/* <TextField label="Address Line 2" disabled={true} size="small" fullWidth /> */}
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                size="small"
              />
            </Grid> */}
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
                    label="Country/Territory"
                  />
                )}
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
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                size="small"
                required
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.Address.City", e.target.value)
                }
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
                getOptionLabel={(option) => `${option.state} (${option.code})`} // Combine `label` and `code` for display
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
                label="Contact"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.ShipTo.Phone.Number", e.target.value)
                }
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Customer Reference"
                onChange={(e) =>
                  handleInputChange("ShipmentRequest.Shipment.Description", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>

            {/* Country Selector */}
            <Grid style={{ display: "flex", justifyContent: "space-between" }} item xs={12}>
              <Typography>Weight(KG) & Dimensions(CM)</Typography>
              <Button onClick={addPackage}>
                <Icon>add</Icon>
                Add Packege
              </Button>
            </Grid>
            {shipmentInfo.ShipmentRequest.Shipment.Package.map((pkg, index) => (
              <>
                {/* Weight and Units */}
                <Grid display="flex" item xs={12} gap={2} sm={3}>
                  <TextField
                    label="Description"
                    value={pkg?.Description}
                    onChange={(e) => updatePackage(index, "Description", e.target.value)}
                    size="small"
                    required
                    fullWidth
                  />
                  {/* <TextField label="Weight (Gram)" size="small" type="number" fullWidth /> */}
                </Grid>
                <Grid display="flex" item xs={12} gap={2} sm={2}>
                  <TextField
                    label="Weight (KG)"
                    value={pkg?.PackageWeight.Weight}
                    onChange={(e) => updatePackage(index, "PackageWeight.Weight", e.target.value)}
                    size="small"
                    type="number"
                    required
                    fullWidth
                  />
                  {/* <TextField label="Weight (Gram)" size="small" type="number" fullWidth /> */}
                </Grid>

                {/* Dimensions */}
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Size (L) CM"
                    value={pkg?.Dimensions.Length}
                    onChange={(e) => updatePackage(index, "Dimensions.Length", e.target.value)}
                    required
                    size="small"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Size (W) CM"
                    value={pkg?.Dimensions.Width}
                    onChange={(e) => updatePackage(index, "Dimensions.Width", e.target.value)}
                    required
                    size="small"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Size (H) CM"
                    value={pkg?.Dimensions.Height}
                    onChange={(e) => updatePackage(index, "Dimensions.Height", e.target.value)}
                    required
                    size="small"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button
                    style={{ color: "red", justifyContent: "center" }}
                    onClick={() => removePackage(index)}
                  >
                    <Icon fontSize="large">delete_forever</Icon>
                  </Button>
                </Grid>
              </>
            ))}

            <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography mt={2}>Declaration</Typography>
              <Button onClick={handleNewRow}>
                <Icon>add</Icon>
                Add Declaration
              </Button>
            </Grid>
            {/* Declaration Section */}
            <Grid container spacing={6}>
              {declaration?.map((item) => (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Description"
                      name="description"
                      value={item?.description}
                      fullWidth
                      required
                      onChange={(e) => handleChangeRows(e, item?.arrayid)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Hts Code"
                      name="HtsCode"
                      onChange={(e) => handleChangeRows(e, item?.arrayid)}
                      value={item?.HtsCode}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      label="Quantity"
                      name="Qty"
                      value={item?.Qty}
                      onChange={(e) => handleChangeRows(e, item?.arrayid)}
                      type="number"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Item Value"
                      name="unitPrice"
                      value={item?.unitPrice}
                      onChange={(e) => handleChangeRows(e, item?.arrayid)}
                      required
                      type="number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Total Value"
                      required
                      name="totalPrice"
                      value={item?.Qty * item?.unitPrice}
                      onInput={(e) => handleChangeRows(e, item?.arrayid)}
                      type="number"
                      fullWidth
                      InputProps={{
                        readOnly: true, // Makes the field readonly
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      style={{ color: "red", justifyContent: "center" }}
                      onClick={() => handleremoverow(item?.arrayid)}
                    >
                      <Icon fontSize="large">delete_forever</Icon>
                    </Button>
                  </Grid>
                </>
              ))}
              <Grid item xs={12}></Grid>
            </Grid>

            {/* Total Value */}
          </Grid>
        </MDBox>
        <Grid container spacing={6} mt={1}>
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
                onClick={(e) => navigate("/shipment")}
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

export default ShippingMultiShip;
