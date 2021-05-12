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
import React, { Component } from "react";
import { useLocation, NavLink, useHistory } from "react-router-dom";
const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

import { Nav, NavDropdown } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
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
                src={require("assets/img/reactlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Creative Tim
          </a>
        </div>
        <Nav>

          <li
              className={
                activeRoute('/admin/dashboard')
              }
          >
            <NavDropdown title={<span> <i className='nc-icon nc-chart-pie-35' /> <p>Dashboard </p> </span>}   onClick={()=>{history.push('/admin/dashboard')}}>
              <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

            </NavDropdown>
            {/*<NavLink*/}
            {/*  to={prop.layout + prop.path}*/}
            {/*  className="nav-link"*/}
            {/*  activeClassName="active"*/}
            {/*>*/}
            {/*  <i className={prop.icon} />*/}
            {/*  <p>{prop.name}</p>*/}
            {/*</NavLink>*/}
          </li>

          <li
              className={
                activeRoute('/admin/user')
              }
          >
            <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>User Profile</p> </span>}   onClick={()=>{history.push('/admin/user')}}>
              <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

            </NavDropdown>
          </li>

            <li
                className={
                    activeRoute('/admin/notifications')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Track buses</p> </span>}   onClick={()=>{history.push('/admin/notifications')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>

            </li>

            <li
                className={
                    activeRoute('/admin/table')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Routes</p> </span>}   onClick={()=>{history.push('/admin/table')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>

            <li
                className={
                    activeRoute('/admin/icons')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Drivers</p> </span>}   onClick={()=>{history.push('/admin/icons')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>

            <li
                className={
                    activeRoute('/admin/maps')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Assets</p> </span>}   onClick={()=>{history.push('/admin/maps')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>



                <li
                    className={
                        activeRoute('/admin/notifications')
                    }
                >
                    <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Fuel Management</p> </span>}   onClick={()=>{history.push('/admin/notifications')}}>
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                    </NavDropdown>
            </li>



            <li
                className={
                    activeRoute('/admin/notifications')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Data Management</p> </span>}   onClick={()=>{history.push('/admin/notifications')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>

            <li
                className={
                    activeRoute('/admin/notifications')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-circle-09' /> <p>Licensing</p> </span>}   onClick={()=>{history.push('/admin/notifications')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>

            </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
