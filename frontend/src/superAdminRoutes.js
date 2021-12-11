
import Dashboard from 'views/Dashboard'
import AddLicense from "./views/superAdminViews/AddLicense";
import LicenseList from "./views/superAdminViews/LicenseList";
import LicenseDetails from "./views/superAdminViews/LicenseDetails";
import AddAdmin from "./views/superAdminViews/AddAdmin";
import AdminList from "./views/superAdminViews/AdminList";
import AdminProfile from "./views/superAdminViews/AdminProfile";
import Payments from "./views/superAdminViews/Payments";
import AddPayment from "./views/superAdminViews/AddPayment";
import PaymentDetails from "./views/superAdminViews/PaymentDetails";

const SuperAdminRoutes = [

    {
        path: "/licenses",
        component: LicenseList,
        layout: "/superadmin",
    },
    {
        path: "/addlicense",
        component: AddLicense,
        layout: "/superadmin",
    },
    {
        path: "/license/:id",
        component: LicenseDetails,
        layout: "/superadmin",
    },
    {
        path: "/admins",
        component: AdminList,
        layout: "/superadmin",
    },
    {
        path: "/addadmin",
        component: AddAdmin,
        layout: "/superadmin",
    },
    {
        path: "/admin/:id",
        component: AdminProfile,
        layout: "/superadmin",
    },
    {
        path: "/payments",
        component: Payments,
        layout: "/superadmin",
    },
    {
        path: "/addpayment",
        component: AddPayment,
        layout: "/superadmin",
    },
    {
        path: "/payment/:id",
        component: PaymentDetails,
        layout: "/superadmin",
    },



];

export default SuperAdminRoutes;
