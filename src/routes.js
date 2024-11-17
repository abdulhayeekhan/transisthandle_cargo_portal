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
import Users from "layouts/user";
import PropTypes from "prop-types";
import { useAuth } from "context/AuthContext";
// @mui icons
import Icon from "@mui/material/Icon";
import { useContext, useEffect, useState } from "react";
// const [roleId, setRoleId] = useState(null);
// useEffect(() => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const roleId = userInfo?.userLavel;
//   setRoleId(fetchedRoleId);
// }, []);
const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
const roleId = userInfo?.userLavel;

// console.log("userLevel:", userLevel);
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: Dashboard,
    private: true,
    rolesAllowed: [1, 2, 3, 4],
  },
  {
    type: "collapse",
    name: "Shipment",
    key: "shipment",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/shipment",
    component: Shipment,
    private: true,
    rolesAllowed: [1, 2, 3, 4],
  },
  roleId === 1 ||
    (roleId === 3 && {
      type: "collapse",
      name: "Company",
      key: "company",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/company",
      component: Company,
      private: true,
      rolesAllowed: [1],
    }),
  roleId === 1 ||
    (roleId === 3 && {
      type: "collapse",
      name: "Users",
      key: "users",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/users",
      component: Users,
      private: true,
      rolesAllowed: [1, 3],
    }),
  roleId === 1 && {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: Billing,
    private: true,
    rolesAllowed: [1],
  },
];
// const getRoutes = (userLevel) => {
//   return [
//     {
//       type: "collapse",
//       name: "Dashboard",
//       key: "dashboard",
//       icon: <Icon fontSize="small">dashboard</Icon>,
//       route: "/dashboard",
//       component: Dashboard,
//       private: true,
//       rolesAllowed: [1, 2, 3, 4],
//     },
//     {
//       type: "collapse",
//       name: "Shipment",
//       key: "shipment",
//       icon: <Icon fontSize="small">table_view</Icon>,
//       route: "/shipment",
//       component: Shipment,
//       private: true,
//       rolesAllowed: [1, 2, 3, 4],
//     },
//     userLevel === 1 && {
//       type: "collapse",
//       name: "Company",
//       key: "company",
//       icon: <Icon fontSize="small">table_view</Icon>,
//       route: "/company",
//       component: Company,
//       private: true,
//       rolesAllowed: [1],
//     },
//     userLevel === 1 ||
//       (userLevel === 3 && {
//         type: "collapse",
//         name: "Users",
//         key: "users",
//         icon: <Icon fontSize="small">table_view</Icon>,
//         route: "/users",
//         component: Users,
//         private: true,
//         rolesAllowed: [1, 3],
//       }),
//     userLevel === 1 && {
//       type: "collapse",
//       name: "Billing",
//       key: "billing",
//       icon: <Icon fontSize="small">receipt_long</Icon>,
//       route: "/billing",
//       component: Billing,
//       private: true,
//       rolesAllowed: [1],
//     },
//   ].filter(Boolean);
// };

//const routes = getRoutes();

// const RoutesComponent = () => {
//   const { userLevel } = useAuth(); // Use `useAuth` hook inside the component

//   const routes = getRoutes(userLevel); // Get the routes based on userLevel

//   console.log("routes", routes);
//   return routes;
// };

//const filteredRoutes = routes.filter((route) => route.rolesAllowed.includes(roleId));

export default routes;
