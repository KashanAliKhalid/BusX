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
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import AddStudent from "./views/AddStudent.js";
import StudentList from "./views/StudentList.js";
import StudentProfile from './views/StudentProfile.js'
import AddBus from "./views/AddBus";
import BusList from "./views/BusList"
import TrackBuses from "./views/TrackBuses";
import BusProfile from "./views/BusProfile";
import AddDriver from "./views/AddDriver";
import DriverList from "./views/DriverList";
import DriverProfile from "./views/DriverProfile";


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
    component: StudentProfile,
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
    component:BusProfile,
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
    component:DriverProfile,
    layout: "/admin",

  },


];

export default dashboardRoutes;
