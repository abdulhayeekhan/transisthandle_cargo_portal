// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Shipment from "layouts/shipment";
import AddShipment from "layouts/shipment/add";
import Company from "layouts/company";
import ShipmentRate from "layouts/shipment/rate";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: Dashboard,
    private: true,
  },
  {
    type: "collapse",
    name: "Shipment",
    key: "shipment",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/shipment",
    component: Shipment,
    private: true,
  },
  {
    type: "collapse",
    name: "Company",
    key: "company",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/company",
    component: Company,
    private: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: Billing,
    private: true,
  },
];

export default routes;
