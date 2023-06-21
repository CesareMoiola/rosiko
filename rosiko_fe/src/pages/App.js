import Home from './Home.js';
import NewMatch from './NewMatch.js';
import '../styles/App.css';
import {Route, Routes} from 'react-router-dom';
import WaitingRoom from './waitingRoom.js';
import Match from './Match.js';
import React, { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JoinMatch from './JoinMatch.js';
import { resumePlayer } from '../js/playerServices';
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
  const [ playerId, setPlayerId] = useState( null )
  const [ socketId, setSockedId] = useState( null )
  const [ matchId, setMatchId ] = useState( null )
  const navigate = useNavigate();
  
  useEffect(()=>{

    const fetchData = async () => {
      console.log("Resume player")
      let player = await resumePlayer()
      console.log("Player:")
      console.dir(player)
      
      setPlayerId(player.id);
      setMatchId(player.currentMatchID);
    }

    fetchData()
      .catch(console.error);

  }, [])
  
  useEffect(()=>updateSocketId(playerId, socketId), [playerId, socketId])

  useEffect(()=>redirect(), [matchId, playerId, socketId])

  useEffect(()=>socketConnection(), [playerId])


  function socketConnection(){
    client
      .connect({},(header) => {
        let socketId = header.headers["user-name"]
        updateSocketId(playerId, socketId)
        console.log("New socket Id: " + socketId);
      })
  }

  async function redirect(){
    if( matchId != null && playerId !== null && socketId != null){

      let matchState = await getMatchState(matchId);
      console.log("Match state: " + matchState);
      let path = "/home";  
      
      if(matchState === 'WAITING') path = "/waiting_room/" + matchId;
      if(matchState === 'READY')   path = "/waiting_room/" + matchId;
      if(matchState === 'STARTED') path = "/match/" + matchId;
      
      navigate(path);
    }
  }

  

  /*style={{ backgroundImage: `url(${home_background})`}}*/
  return (
    <UserContext.Provider value={{ client, playerId }}>
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
