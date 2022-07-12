import React from "react";
import { useState, useEffect,useContext } from "react";
import { useLocation } from 'react-router-dom'
import "./CreateEvent.css";
import axios from 'axios';
import nextId from "react-id-generator";
import {useNavigate} from 'react-router-dom';
// import {UserContext} from '../../context/context';
// import { ReactSession } from 'react-client-session';


function CreateEvent(){
    const location = useLocation();
    const [eventName, setEventName] = useState();
    const [eventDesc, setEventDesc] = useState();
    const [eventLoc, setEventLoc] = useState();
    const [eventDate, setEventDate] = useState();
    const [eventImg, setEventImg] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState();
    // const [token, setToken] = useContext(UserContext);

    const navigate = useNavigate();

    // console.log(location.state)

    useEffect(()=>{
        if(location.state && location.state.props){
            var obj = location.state.props;
            setEventName(obj.eventName);
            setEventDesc(obj.eventDescription);
            setEventLoc(obj.eventLocation);
            setEventDate(obj.eventDate);
            setEventImg(obj.eventImg);
        }
    }, []);

    const formatDate = (d) => {
        d = new Date(d);
        var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        return datestring;
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(localStorage.getItem("username") !== "null"){
            setIsLoggedIn(false);
            if(location.state && location.state.props){
                await axios.patch(`https://z-event-list.herokuapp.com/events/${location.state.props.eventId}`,{
                    eventName: eventName,
                    eventDescription: eventDesc,
                    eventLocation: eventLoc,
                    eventDate: eventDate,
                    eventImg: eventImg
                }).then(function(res){
                    navigate('/')
                    console.log(res);
                });
            }else{
                const user =  await axios.get(`https://z-event-list.herokuapp.com/users/login/${localStorage.getItem("username")}`);
                await axios.post(`https://z-event-list.herokuapp.com/events/`,{
                    eventId: nextId(),
                    eventName: eventName,
                    eventDescription: eventDesc,
                    eventLocation: eventLoc,
                    userId: user.data.userId,
                    eventDate: eventDate,
                    eventImg: eventImg
                }).then(function(res){
                    navigate('/')
                    console.log(res);
                });
            }
    
        }else{
            setIsLoggedIn(true);
        }
        
       
    }

    return(
        <div className="create-event-container">
            <h1 style={{marginTop:`${20}px`}}>{location.state && location.state.props ? 'Edit':'Post'} Event</h1>
            <div>{isLoggedIn && isLoggedIn === true ? <span style={{fontSize:`${15}px`, color: 'red'}}>Please log in first</span> : null}</div>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Even Name: </label><input type="text" onChange={e => setEventName(e.target.value)} value={eventName ? eventName : null}/>
                </p>
                <p>
                    <label>Even Description: </label><input type="text" onChange={e => setEventDesc(e.target.value)} value={eventDesc ? eventDesc : null}/>
                </p>
                <p>
                    <label>Even Location: </label><input type="text" onChange={e => setEventLoc(e.target.value)} value={eventLoc ? eventLoc : null}/>
                </p>
                <p>
                    <label>Even Date: </label><input type="date" onChange={e => setEventDate(new Date(e.target.value))} value={eventDate ? formatDate(eventDate) : null}/>
                </p>
                <p>
                    <label>Even Image: </label><input type="text" placeholder="To save effort, use an online image url for this" onChange={e => setEventImg(e.target.value)} value={eventImg ? eventImg : null}/>
                </p>
                <div>
                    <button type="submit" className="btn btn-primary">{location.state && location.state.props ? 'Edit' : 'Post'}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent;