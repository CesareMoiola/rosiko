import Home from './Home.js';
import NewMatch from './NewMatch.js';
import '../styles/App.css';
import {Route, Routes} from 'react-router-dom';
import WaitingRoom from './waitingRoom.js';
import Match from './Match.js';
import React, { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JoinMatch from './JoinMatch.js';
import { resumeUser } from '../js/playerServices';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {wsEndPoint} from "../js/endPoint";
import { useEffect } from 'react';
import { updateSocketId } from '../js/playerServices';
import { useNavigate } from "react-router-dom";
import {getMatchState} from '../js/matchActions';

/*import home_background from '../images/globe.svg';*/

const theme = createTheme(
  {
    palette: {
      primary: {
        main:"#212121", 
        light:"#616161", 
        dark: "black", 
        contrastText: "white"
      },
      secondary: {
        main:"#fafafa", 
        light:"#ffffff", 
        dark: "#eeeeee", 
        contrastText: "black"
      }
    },
    shape: {
      borderRadius: 16
    }
  }
);

export const UserContext = createContext()

function App() {
  
  const [ client, setClient] = useState( Stomp.over(new SockJS(wsEndPoint)) )
  const [ isConnect, setIsConnect] = useState(false)
  const [ userId, setUserId] = useState( null )
  const [ socketId, setSocketId] = useState( null )
  const [ matchId, setMatchId ] = useState( null )
  const navigate = useNavigate();
  
  useEffect(()=>{

    const fetchData = async () => {
      console.log("Resume user")
      let user = await resumeUser()
      console.dir(user)
      
      setUserId(user.id);
      setMatchId(user.currentMatchId);
    }

    fetchData()
      .catch(console.error);

  }, [])
  
  useEffect(()=>updateSocketId(userId, socketId, setSocketId), [userId, socketId])

  useEffect(()=>redirect(), [matchId, userId, socketId])

  useEffect(()=>socketConnection(), [userId])


  async function socketConnection(){
    console.dir(client)
    client
      .connect({},(header) => {
        let socketId = header.headers["user-name"]
        updateSocketId(userId, socketId, setSocketId)
        console.log("New socket Id: " + socketId);
        setIsConnect(true)
      })
    client
      .onDisconnect(()=>{
        console.log("DISCONNECTED")
        setIsConnect(false)
      })
  }

  async function redirect(){
    if( matchId != null && userId !== null && socketId != null){

      let matchState = await getMatchState(matchId);
      console.log("Match state: " + matchState);
      let path = "/home";  
      
      if(matchState === 'WAITING') path = "/waiting_room/" + matchId;
      if(matchState === 'READY')   path = "/waiting_room/" + matchId;
      if(matchState === 'STARTED') path = "/match/" + matchId;
      
      navigate(path);
    }
  }

  if(socketId == null ) return null

  /*style={{ backgroundImage: `url(${home_background})`}}*/
  return (
    <UserContext.Provider value={{ client, userId: userId, isConnect: isConnect }}>
      <div className="App" style={{ backgroundColor:"#e0e0e0"}}>
        <ThemeProvider theme = {theme}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/new_match" element={<NewMatch/>}/>
            <Route path="/join_match" element={<JoinMatch/>}/>
            <Route path="/waiting_room/:id" element={<WaitingRoom/>}/>
            <Route path="/match/:id" element={<Match/>}/>
          </Routes>   
        </ThemeProvider>    
      </div>
    </UserContext.Provider>
  );
}

export default App;
