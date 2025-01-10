import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import AppBar from "assets/theme/components/appBar";
import { AuthProvider } from "context/AuthContext";
import PrivateRoute from "components/PrivateRoute";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/new-white-logo.png";
import brandDark from "assets/images/new-black-thc.png";
import AddShipment from "layouts/shipment/add";
import AddMultiShip from "layouts/shipment/add-multi";
import SignIn from "layouts/authentication/sign-in";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AddCompany from "layouts/company/add";
import AddUser from "layouts/user/add";
import ShipmentRate from "layouts/shipment/rate";
import EditCompany from "layouts/company/update";
import { toast, ToastContainer } from "react-toastify";
import AddFlight from "layouts/flights/add";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  let userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  let roleId = userInfo?.userLavel;
  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);
  console.log("Appjs roleId", roleId);
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      // if (route.private) {
      //   return (
      //     <Route
      //       exact
      //       path={route.route}
      //       element={<PrivateRoute element={route.component} />}
      //       key={route.key}
      //     />
      //   );
      // }

      if (route.route) {
        // Check if route requires authentication
        if (route.private) {
          return (
            <Route
              path={route.route}
              element={<PrivateRoute element={route.component} />}
              key={route.key}
            />
          );
        }
        return <Route path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <ToastContainer />
        <CssBaseline />
        {layout === "dashboard" && userInfo !== null && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Transist Handle Cargo"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <DashboardLayout>
              <DashboardNavbar />
              <Configurator />
              {configsButton}
            </DashboardLayout>
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/add-shipment" element={<PrivateRoute element={AddShipment} />} />
          <Route path="/add-flight" element={<PrivateRoute element={AddFlight} />} />
          <Route path="/add-company" element={<PrivateRoute element={AddCompany} />} />
          <Route path="/edit-company/:companyId" element={<PrivateRoute element={EditCompany} />} />
          <Route path="/add-user" element={<PrivateRoute element={AddUser} />} />
          <Route path="/add-multi" element={<PrivateRoute element={AddMultiShip} />} />
          <Route path="/get-shipment-rate" element={<PrivateRoute element={ShipmentRate} />} />
          <Route path="/authentication/sign-in" logo={brandDark} element={<SignIn />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
