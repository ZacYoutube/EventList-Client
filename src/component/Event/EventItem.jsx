import React,{useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./EventItem.css";

function EventItem(props){
    const [eventData, setEventData] = useState([]);
    const [redirects, setRedirects] = useState(false);
    const [redirectItem, setRedirectItem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        var eventArr = props.eventArr
        // console.log(props.eventArr)
        // setEventData()
        if(props.sort === true && eventArr.data && eventArr.data.length > 0){
            eventArr.data.sort((a, b) => a.eventDate.localeCompare(b.eventDate))
            setEventData(eventArr.data);
        }else if(props.sort === false && eventArr.data && eventArr.data.length > 0){
            eventArr.data.sort((a, b) => b.eventDate.localeCompare(a.eventDate))
            setEventData(eventArr.data);
        }else
            setEventData(eventArr.data);
    }, [props.eventArr, props.sort, eventData]);

    const redirect = (item) => {
        setRedirectItem(item);
        setRedirects(true);
    }

    if(redirects === true){
        navigate('/view',{ state: redirectItem } )
    }
    // console.log(eventData)
    return(
        <div className="event-container">
        {
            !eventData || eventData.length === 0 ? "loading" : eventData.map((item)=>{
                return <div className="card" onClick={()=>{redirect(item)}}>
                    <img className="card-image" src={item.eventImg} width="400" height="230" alt=""/>
                    <div className="card-text">
                        <h2>{item.eventName}</h2>
                        <p>{item.eventDescription}</p>
                        <span>Location: {item.eventLocation}</span>
                        <div className="date">{new Date(item.eventDate).toLocaleDateString()}</div>
                    </div>
                    <div className="card-stats">
                        <div className="stat">
                        <div className="type">View More</div>
                        </div>
                    
                    </div>
                </div>
            })
        }
        </div>
        
    )
}

export default EventItem;