import React, {useState, useContext} from "react";
import "./Login.css";
import axios from 'axios';
// import {UserContext} from '../../context/context';
import {useNavigate} from 'react-router-dom';


function Login(){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isCredentialCorrect, setIsCredentialCorrect] = useState(true);
    // const [token, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    // console.log(token)
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //       username,
    //       password
    //     });
    //     setToken(token);onSubmit={handleSubmit}
    //   }
    async function loginUser(e) {
        e.preventDefault();
        const user = await axios.get(`https://z-event-list.herokuapp.com/users/login/${username}`);
        if(!user.data)
            setIsCredentialCorrect(false);
        if(user.data.password === password){
            setIsCredentialCorrect(true);
            localStorage.setItem("username", username);
            // console.log(ReactSession.get("username"))
            navigate('/');
            window.location.reload();
        }
        else{
            setIsCredentialCorrect(false);
            localStorage.setItem("username", null);
            // console.log("not ")
        }



    }
      
    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <span>{isCredentialCorrect === false ? <span style={{color:'red', fontSize:`${15}px`}}> Incorrect Credential  </span> : null}</span>
            <form onSubmit={loginUser}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;