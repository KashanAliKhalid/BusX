
import React, { Component } from "react";
import { useLocation, NavLink, useHistory } from "react-router-dom";
const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

import {Nav, NavDropdown, SplitButton, Dropdown, DropdownButton} from "react-bootstrap";
import '../../assets/css/sidebar.css'


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
            BusX
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
                    activeRoute('/admin/trackbuses')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-square-pin' /> <p>Track buses</p> </span>}   onClick={()=>{history.push('/admin/trackbuses')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>

            </li>

            <li
                className={
                    activeRoute('/admin/routes')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-map-big' /> <p>Routes</p> </span>}   onClick={()=>{history.push('/admin/routes')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>

            <li
                className={
                    activeRoute('/admin/drivers')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-single-02' /> <p>Drivers</p> </span>}   onClick={()=>{history.push('/admin/drivers')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>

            <li
                className={
                    activeRoute('/admin/assets')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-bus-front-12' /> <p>Assets</p> </span>}   onClick={()=>{history.push('/admin/assets')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>
            </li>



                <li
                    className={
                        activeRoute('/admin/fuel')
                    }
                >
                    <NavDropdown title={<span> <i className='nc-icon nc-chart-bar-32' /> <p>Fuel Management</p> </span>}   onClick={()=>{history.push('/admin/fuel')}}>
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                    </NavDropdown>
            </li>



            <li
                className={
                    activeRoute('/admin/data')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-app' /> <p>Data Management</p> </span>}>
                    <DropdownButton variant='dropdownnested' id="dropdown-item-button" title={<span> <i  className='nc-icon nc-backpack dropdown-icon' /> <p className='dropdown-text'>Students</p> </span>}>
                        <Dropdown.Item onClick={()=>{history.push('/admin/data/addstudent')}} className='btn-dropdownnested-item' as="button"><span> <i  className='dropdown-icon nc-icon nc-simple-add' /> <p className='dropdown-text'>Add Student</p> </span></Dropdown.Item>
                        <Dropdown.Item onClick={()=>{history.push('/admin/data/studentlist')}} className='btn-dropdownnested-item' as="button"><span> <i  className='nc-icon nc-bullet-list-67 dropdown-icon' /> <p className='dropdown-text'>Students list</p> </span></Dropdown.Item>

                    </DropdownButton>

                    <DropdownButton variant='dropdownnested' id="dropdown-item-button" title={<span> <i  className='nc-icon nc-bus-front-12 dropdown-icon' /> <p className='dropdown-text'>Buses</p> </span>}>
                        <Dropdown.Item onClick={()=>{history.push('/admin/data/addbus')}} className='btn-dropdownnested-item' as="button"><span> <i  className='dropdown-icon nc-icon nc-simple-add' /> <p className='dropdown-text'>Add Bus</p> </span></Dropdown.Item>
                        <Dropdown.Item onClick={()=>{history.push('/admin/data/buslist')}} className='btn-dropdownnested-item' as="button"><span> <i  className='nc-icon nc-bullet-list-67 dropdown-icon' /> <p className='dropdown-text'>Bus list</p> </span></Dropdown.Item>

                    </DropdownButton>

                    <DropdownButton variant='dropdownnested' id="dropdown-item-button" title={<span> <i  className='nc-icon nc-single-02 dropdown-icon' /> <p className='dropdown-text'>Drivers</p> </span>}>
                        <Dropdown.Item onClick={()=>{history.push('/admin/data/adddriver')}} className='btn-dropdownnested-item' as="button"><span> <i  className='dropdown-icon nc-icon nc-simple-add' /> <p className='dropdown-text'>Add Driver</p> </span></Dropdown.Item>
                        <Dropdown.Item onClick={()=>{history.push('/admin/data/driverlist')}} className='btn-dropdownnested-item' as="button"><span> <i  className='nc-icon nc-bullet-list-67 dropdown-icon' /> <p className='dropdown-text'>Drivers list</p> </span></Dropdown.Item>

                    </DropdownButton>




                </NavDropdown>
            </li>

            <li
                className={
                    activeRoute('/admin/license')
                }
            >
                <NavDropdown title={<span> <i className='nc-icon nc-key-25' /> <p>Licensing</p> </span>}   onClick={()=>{history.push('/admin/license')}}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>

                </NavDropdown>

            </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
