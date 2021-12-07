
import React, { Component,useEffect } from "react";
import { useLocation, Route, Switch,Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import SuperAdminSidebar from "components/Sidebar/SuperAdminSideber";
import sidebarImage from "assets/img/sidebar-3.jpg";
import {useSelector} from "react-redux";
import SuperAdminRoutes from "../superAdminRoutes";

function SuperAdmin({history}) {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const location = useLocation();
    const mainPanel = React.useRef(null);
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin

    useEffect(()=>{

    },[userInfo])

    const redirect=(url)=> <Redirect to={`${url}`}/>

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/superadmin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={(props) => <prop.component {...props} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    React.useEffect(() => {

        if(userInfo!==null && userInfo.type==="SuperAdmin")
        {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            mainPanel.current.scrollTop = 0;
            if (
                window.innerWidth < 993 &&
                document.documentElement.className.indexOf("nav-open") !== -1
            ) {
                document.documentElement.classList.toggle("nav-open");
                var element = document.getElementById("bodyClick");
                element.parentNode.removeChild(element);
            }

        }


    }, [location]);

    const superAdminPage=()=>{
        if(userInfo==null)
            return redirect('/login');
        else if(userInfo.type!=="SuperAdmin")
        {
            return redirect('/403')
        }
        else{
            return (
                <div>
                    <div className="wrapper">
                        <SuperAdminSidebar color={color} image={hasImage ? image : ""} routes={SuperAdminRoutes} />
                        <div className="main-panel" ref={mainPanel}>
                            <AdminNavbar />
                            <div className="content">
                                <Switch>{getRoutes(SuperAdminRoutes)}</Switch>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (

        <>

            {
                superAdminPage()

            }

        </>

    );
}

export default SuperAdmin;
