import React, {useState} from "react";
import { useEffect, useContext } from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import "./view.css";
import {useNavigate} from 'react-router-dom';
// import {UserContext} from '../../context/context';

function ViewDetail(){
    const location = useLocation();
    const [user, setUser] = useState();
    // const [token, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        getUser();
    },[])

    const getUser = async () => {
        const user = await axios.get(`https://z-event-list.herokuapp.com/users/${location.state.userId}`);
        setUser(user.data);
    }

    const formatDate = (d) => {
        d = new Date(d);
        var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        return datestring;
    }

    const deletePost = async(e, id) => {
        e.preventDefault();
        console.log(id)
        await axios.delete(`https://z-event-list.herokuapp.com/events/${id}`).then(function(res){
            navigate('/')
            console.log(res);
        })
    }

    return(
        <div className="view-container">
            <br />
            <br />
            <h2>{location.state.eventName}</h2>
            <span>{location.state.eventDescription}</span>
            <br />
            <img src={location.state.eventImg} width="600" height="400" alt="" />
            <br />
            <div>{formatDate(location.state.eventDate)}</div>
            <br />
            <div>Created by: {user === undefined ? 'loading': user.userDisplayName}</div>

            <br />
            <div style={{display:'flex', flexDirection:'row', width:`${150}px`, justifyContent:'space-around',marginBottom:`${30}px`}}>
                {
                    localStorage.getItem("username")!=="null" && user && user.userName && localStorage.getItem("username") === user.userName ? 
                        <>
                            <a href=""><Link to='/createEvent' state={{ props: location.state }}>Edit</Link></a>
                            <a href="" onClick={(e) => deletePost(e,location.state.eventId)}>Delete</a>
                        </>

                        :

                        null
                }
            
            </div>
        </div>
    )
}


export default ViewDetail;
