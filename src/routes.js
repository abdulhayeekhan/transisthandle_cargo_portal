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
import Tracking from "layouts/tracking";
import AddShipment from "layouts/shipment/add";
import Company from "layouts/company";
import FlightList from "layouts/flights";
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
console.log("roleId", roleId);
// console.log("userLevel:", userLevel);
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboard",
    component: Dashboard,
    private: true,
    rolesAllowed: [1, 2, 3, 4],
  },
  {
    type: "collapse",
    name: "Tracking",
    key: "tracking",
    icon: <Icon fontSize="medium">track_changes</Icon>,
    route: "/tracking",
    component: Tracking,
    private: true,
    rolesAllowed: [1, 2],
  },
  {
    type: "collapse",
    name: "Shipment",
    key: "shipment",
    icon: <Icon fontSize="medium">airport_shuttle</Icon>,
    route: "/shipment",
    component: Shipment,
    private: true,
    rolesAllowed: [1, 2, 3, 4],
  },
  {
    type: "collapse",
    name: "Flights",
    key: "flights",
    icon: <Icon fontSize="medium">flight_takeoff</Icon>,
    route: "/flights",
    component: FlightList,
    private: true,
    rolesAllowed: [1, 2, 3, 4],
  },
  (roleId === 1 || roleId === 2) && {
    type: "collapse",
    name: "Company",
    key: "company",
    icon: <Icon fontSize="medium">verified_user</Icon>,
    route: "/company",
    component: Company,
    private: true,
    rolesAllowed: [1],
  },
  (roleId === 1 || roleId === 3) && {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="medium">supervisor_account</Icon>,
    route: "/users",
    component: Users,
    private: true,
    rolesAllowed: [1, 3],
  },
  roleId === 1 && {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="medium">receipt_long</Icon>,
    route: "/billing",
    component: Billing,
    private: true,
    rolesAllowed: [1],
  },
];
// const getRoutes = () => {
//   let userLevel = "";
//   useEffect(() => {
//     const getLevel = async () => {
//       const userInfo = await JSON.parse(localStorage?.getItem("userInfo"));
//       userLevel = await userInfo?.userLavel;
//     };
//     getLevel();
//   }, [userLevel]);
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
// console.log("getRoutes:", getRoutes);

//const routes = getRoutes();

// const RoutesComponent = () => {
//   const { userLevel } = useAuth(); // Use `useAuth` hook inside the component

//   const routes = getRoutes(userLevel); // Get the routes based on userLevel

//   console.log("routes", routes);
//   return routes;
// };
// const getRoutes = () => {
//   const [roleId, setRoleId] = useState("");
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
//     if (userInfo !== null || userInfo !== "") {
//       setRoleId(userInfo?.userLavel);
//     }
//   }, []);

//   const userInfo = JSON.parse(localStorage?.getItem("userInfo"));

//   const routes = [
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
//     // Conditionally include routes based on user role
//     (roleId === 1 || roleId === 2) && {
//       type: "collapse",
//       name: "Company",
//       key: "company",
//       icon: <Icon fontSize="small">business</Icon>,
//       route: "/company",
//       component: Company,
//       private: true,
//       rolesAllowed: [1],
//     },
//     (roleId === 1 || roleId === 3) && {
//       type: "collapse",
//       name: "Users",
//       key: "users",
//       icon: <Icon fontSize="small">people</Icon>,
//       route: "/users",
//       component: Users,
//       private: true,
//       rolesAllowed: [1, 3],
//     },
//     roleId === 1 && {
//       type: "collapse",
//       name: "Billing",
//       key: "billing",
//       icon: <Icon fontSize="small">receipt_long</Icon>,
//       route: "/billing",
//       component: Billing,
//       private: true,
//       rolesAllowed: [1],
//     },
//   ];

//   // Filter out any undefined routes (those that do not match the conditions)
//   return routes.filter((route) => route !== false);
// };
// const data = getRoutes();
// console.log("data", data);
//const filteredRoutes = routes.filter((route) => route.rolesAllowed.includes(roleId));

export default routes;
