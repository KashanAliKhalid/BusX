/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import AddStudent from "./views/AddStudent.js";
import StudentList from "./views/StudentList.js";
import StudentProfileUpdate from './views/StudentProfileUpdate'
import AddBus from "./views/AddBus";
import BusList from "./views/BusList"
import TrackBuses from "./views/TrackBuses";
import BusProfileUpdate from "./views/BusProfileUpdate";
import AddDriver from "./views/AddDriver";
import DriverList from "./views/DriverList";
import DriverProfileUpdate from "./views/DriverProfileUpdate";
import AssetManageList from "./views/AssetManageList";
import BusDetails from "./views/BusDetails";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/trackbuses",
    component: TrackBuses,
    layout: "/admin",
  },
  {
    path: "/notifications",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/data/addstudent",
    component: AddStudent,
    layout: "/admin",
  },

  {
    path: "/data/studentlist",
    component: StudentList,
    layout: "/admin",
  },
  {
    path: "/data/studentprofile/:id",
    component: StudentProfileUpdate,
    layout: "/admin",
  },
  {
    path: "/data/addbus",
    component: AddBus,
    layout: "/admin",
  },
  {
    path: "/data/buslist",
    component: BusList,
    layout: "/admin",
  },
  {
    path:"/data/busprofile/:id",
    component:BusProfileUpdate,
    layout: "/admin",

  },
  {
    path:"/data/adddriver",
    component:AddDriver,
    layout: "/admin",

  },
  {
    path:"/data/driverlist",
    component:DriverList,
    layout: "/admin",

  },
  {
    path:"/data/driverprofile/:id",
    component:DriverProfileUpdate,
    layout: "/admin",

  },
  {
    path:"/assets",
    component:AssetManageList,
    layout: "/admin",

  },
  {
    path:"/busdetails",
    component:BusDetails,
    layout: "/admin",

  },


];

export default dashboardRoutes;
