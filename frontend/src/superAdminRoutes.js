
import Dashboard from 'views/Dashboard'
import AddLicense from "./views/superAdminViews/AddLicense";
import LicenseList from "./views/superAdminViews/LicenseList";
import LicenseDetails from "./views/superAdminViews/LicenseDetails";
import AddAdmin from "./views/superAdminViews/AddAdmin";
import AdminList from "./views/superAdminViews/AdminList";
import AdminProfile from "./views/superAdminViews/AdminProfile";

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
    }


];

export default SuperAdminRoutes;
