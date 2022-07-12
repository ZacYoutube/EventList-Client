import React,{useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import "./navbar.css";
import {UserContext} from '../../context/context';
import Logo from "./logo-wobg.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header(){
    // const [token, setToken] = useContext(UserContext);
    
    const [user, setUser] = useState(null);

    useEffect(()=>{    
        setUser(localStorage.getItem('username'));
        window.addEventListener('storage', storageEventHandler, false);
    },[])

    function storageEventHandler() {
        setUser(localStorage.getItem('username'))
    }

    function signOut(){
        if(localStorage.getItem("username")){
            localStorage.setItem("username", "null");
            Navigate("/")
            // window.location.reload();
        }
            // 
            // storageEventHandler();
        // }
    }
    console.log(localStorage.getItem('username'))
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><img src={Logo} width="70" height="60" alt=""/><span style={{color: "#8B0D19"}}>Event List</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/createEvent">Post</Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={()=>signOut()}>{user === "null" || user === null? "Login" : user}</Nav.Link>
                </Nav>
                </Navbar.Collapse>
      </Container>
    </Navbar>
        
    )
}

export default Header;