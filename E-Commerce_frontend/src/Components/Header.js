import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";

const activeStyle = {
  color: "brown",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: 18,
};
const inActiveStyle = {
  color: "gray",
  textDecoration: "none",
  fontWeight: "normal",
  fontSize: 18,
};
const Header = () => {
  const [header, setheader] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role === "customer" && token != null) {
      setheader(
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          style={{
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // 💡 Light white bg
            backdropFilter: "blur(5px)",
          }}
        >
          <Container>
            <Navbar.Brand href="#">
              <img
                src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg"
                width="40"
                height="40"
                className="d-inline-block align-center"
                style={{ borderRadius: "50%" }}
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink
                  to="/customer"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Customer
                </NavLink>
                &nbsp;&nbsp;
                <NavLink
                  to="/customer/cart"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Cart
                </NavLink>
                 &nbsp;&nbsp;
                 <NavLink
                  to="/customer/profile"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Profile
                </NavLink>
                 &nbsp;&nbsp;
                 <NavLink
                  to="/customer/orders"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  MyOrder
                </NavLink>
                 &nbsp;&nbsp;
                <NavLink
                  to="/customer/changepassword"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  ChangePassword
                </NavLink>
                  &nbsp;&nbsp;
                  <NavLink
                  to="/customer/editprofile"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  EditProfile
                </NavLink>


                &nbsp;&nbsp;
                <NavLink
                  to="/logout"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Logout
                </NavLink>
                &nbsp;&nbsp;
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else if (role === "admin" && token != null) {
      setheader(
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          style={{
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // 💡 Light white bg
            backdropFilter: "blur(5px)",
          }}
        >
          <Container>
            <Navbar.Brand href="#">
              <img
                src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg"
                width="40"
                height="40"
                className="d-inline-block align-center"
                style={{ borderRadius: "50%" }}
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink
                  to="/admin"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Admin
                </NavLink>
                &nbsp;&nbsp;
                 <NavLink
                  to="/admin/addproduct"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  AddProduct
                </NavLink>
                &nbsp;&nbsp;
                <NavLink
                  to="/admin/viewproduct"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  ViewProduct
                </NavLink>
                &nbsp;&nbsp;
                <NavLink
                  to="/admin/managecustomer"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  ManageCustomer
                </NavLink>
                &nbsp;&nbsp;
                <NavLink
                  to="/logout"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Logout
                </NavLink>
                &nbsp;&nbsp;
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      setheader(
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          style={{
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // 💡 Light white bg
            backdropFilter: "blur(5px)",
          }}
        >
          <Container>
            <Navbar.Brand href="#">
              <img
                src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg"
                width="40"
                height="40"
                className="d-inline-block align-center"
                style={{ borderRadius: "50%" }}
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Index
                </NavLink>
                &nbsp;&nbsp;
                <NavLink
                  to="/login"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  Login
                </NavLink>
                &nbsp;&nbsp;
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }, []);

  return header;
};
export default Header;
