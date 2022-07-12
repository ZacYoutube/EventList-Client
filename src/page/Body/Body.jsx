import EventItem from "../../component/Event/EventItem";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./Body.css";

function Body(){

    const [eventList, setEvent] = useState([]);
    const [sort, setSort] = useState(false);
    console.log(localStorage.getItem("username"))

    useEffect(() => {   
        getEvents();
      }, []);

    const getEvents = async () => {
        const events = await axios.get(`http://localhost:9000/events/`);
        setEvent(events.data)
        // console.log(events)
    }

    function markSort(){
        setSort(!sort);
    }

    return(
        <div className="body">
            <h1 style={{marginTop:`${2}%`}}>Events Happening...</h1>
            <div>
                <button style={{width:'fit-content'}} className="btn btn-primary" onClick={()=>markSort()}>{sort===false?"Sort by date?":"Unsort"}</button>
            </div>
            <div className="event-card-container">
                <EventItem eventArr = {eventList} sort={sort}/>
            </div>
        </div>
    )
}

export default Body;