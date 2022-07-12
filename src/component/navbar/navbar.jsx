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

function Navbar(){
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">EventList</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/createEvent">Post</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/login" onClick={()=>signOut()}>{user === "null" ? "Login" : user}</Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}

export default Navbar;