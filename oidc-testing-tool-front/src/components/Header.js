import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";


  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height:"63px",
        BrandHeight:"18px",
        image : "80%",
        sofrecomImage :"100%"
      }
    }
  listenScrollEvent = e => {
    if (window.scrollY > 0) {
      this.setState({height: '51px',BrandHeight:"7px",image:"68%",sofrecomImage:"85%"})
    } else {
      this.setState({height: '63px',BrandHeight:"18px",image:"80%",sofrecomImage:"100%"})
    }
  }
   componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }
  render() {
  return (
  
    <Navbar
      sticky="top" 
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: "black", height: this.state.height }}
    >
      <Navbar.Brand >
       {this.state.image === "80%" ?
       <img
          src={require("../assets/logo.png")}
          alt=""
          style={{ width: this.state.image }}
        /> :
        <img
        src={require("../assets/newLogo.png")}
        alt=""
        style={{ width: this.state.image }}
      />
      }
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <a
            href="/"
            style={{
              borderBottom: "4px solid ",
              lineHeight: 3 ,
              borderBlockColor: "#ff6600",
              fontWeight: "bold",
              fontSize: "14px",
              marginTop: this.state.BrandHeight,
              color: "#ff6600",
            }}
          >
            Test Generator | OIDC
          </a>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} >
            <img src={require("../assets/sofrecomLogo.png")} alt=""
            style={{ width: this.state.sofrecomImage }}
            />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
  }
  export default Header;
