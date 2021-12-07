
import React, { Component } from "react";
import { useLocation, NavLink, useHistory } from "react-router-dom";
const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

import {Nav, NavDropdown, SplitButton, Dropdown, DropdownButton} from "react-bootstrap";
import '../../assets/css/sidebar.css'


function SuperAdminSidebar({ color, image, routes }) {
    const history=useHistory();
    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar" data-image={image} data-color={color}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + image + ")",

                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a
                        href="https://www.creative-tim.com?ref=lbd-sidebar"
                        className="simple-text logo-mini mx-1"
                    >
                        <div className="logo-img">
                            <img
                                src={require("assets/img/logo2.png").default}
                                alt="..."
                            />
                        </div>
                    </a>
                    <a className="simple-text" href="http://www.creative-tim.com">
                        BusX
                    </a>
                </div>
                <Nav>


                    <li
                        className={
                            activeRoute('/superadmin/licenses')
                        }
                    >
                        <NavLink   className="nav-link" to={'/superadmin/licenses'}>
                            <span> <i className='nc-icon nc-credit-card' /> <p>Licenses </p> </span>
                        </NavLink>
                    </li>

                    <li
                        className={
                            activeRoute('/superadmin/feedbacks')
                        }
                    >
                        <NavLink to='/admin/feedbacks'   className="nav-link" >
                            <span> <i className='nc-icon nc-chat-round' /> <p>Feedbacks</p> </span>
                        </NavLink>
                    </li>


                    <li
                        className={
                            activeRoute('/superadmin/payments')
                        }
                    >
                        <NavLink to='/superadmin/payments'   className="nav-link" >
                            <span> <i className='nc-icon nc-money-coins' /> <p>Paymemts</p> </span>
                        </NavLink>
                    </li>


                    <li
                        className={
                            activeRoute('/superadmin/admins')
                        }
                    >
                        <NavLink to='/superadmin/admins'   className="nav-link">
                            <span> <i className='nc-icon nc-single-02' /> <p>Admins</p> </span>
                        </NavLink>

                    </li>

                </Nav>
            </div>
        </div>
    );
}

export default SuperAdminSidebar;
