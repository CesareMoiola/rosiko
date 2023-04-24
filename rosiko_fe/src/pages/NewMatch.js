import React, { useState, useEffect } from "react";
import { Button, TextField } from '@mui/material';
import '../styles/NewMatch.css';
import {useNavigate, Link as RouterLink} from 'react-router-dom';

const WebSocket = require("../js/webSocket").default;
const client = WebSocket.getClient();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function NewMatch(){
  const [matchName, setMatchName] = useState('');
  const [password, setPassword] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [matchId, setMatchId] = useState(undefined);
  const navigate = useNavigate();

  //Reindirizza alla waiting room appena si ottienne l'id del match
  useEffect(()=>{ if(matchId !== undefined){ 
    try{
      client.unsubscribe("new_match");
      navigate("/waiting_room/" + matchId); 
    }
    catch(e){
      console.error(e);
      navigate("/"); 
    }    
  }},[matchId, navigate]);

  //Iscrizione al websocket
  useEffect(()=>{
    try{
      client.subscribe(
        "/user/queue/new_match", 
        function (payload) { setMatchId(JSON.parse(payload.body).id); },
        {id: "new_match"}
      );
    }
    catch(e){
      console.error(e);
      navigate("/"); 
    }    
  },[navigate]);

  const handleMatchName = event => {
    if(event.target.value.length <= 12) setMatchName(event.target.value);
  }
  const handlePassword = event => {
    if(event.target.value.length <= 12) setPassword(event.target.value);
  }
  const handlePlayerName = event => {
    if(event.target.value.length <= 12) setPlayerName(event.target.value);
  }  
  const newMatchSubmit = event =>{     
    event.preventDefault(); //Evita che viene ricaricata la pagina
    try{
      client.send("/app/new_match", {}, JSON.stringify({matchName: matchName, password: password, playerName: playerName}));
    }
    catch(e){
      console.error(e);
      navigate("/"); 
    } 
  }  

  return (
    <div className="new-match">
      <div className="menu">
        <h1 className="title">New match</h1>
        <form onSubmit={newMatchSubmit}>
          <TextField 
            className="new-match-input"
            label="Match name" 
            variant="outlined" 
            autoComplete="off"
            id = "matchName"
            name="matchName"
            value={capitalizeFirstLetter(matchName)}
            onChange={handleMatchName}/><br/>
          <TextField 
            className="new-match-input"
            label="Password" 
            variant="outlined" 
            autoComplete="off"
            type="password"
            id = "password"
            name="password"
            value={password}
            onChange={handlePassword}/><br/>
          <TextField 
            className="new-match-input"
            label="Player name" 
            variant="outlined"
            autoComplete="off"
            id = "playerName"
            name="playerName"
            value={capitalizeFirstLetter(playerName)}
            onChange={handlePlayerName}/><br/>
          <div className="buttons">
            <Button 
              className="home-button" 
              variant="outlined"
              component={RouterLink}
              to="/"
              >Back</Button>
            <Button 
              className="home-button" 
              type="submit"
              variant="contained" 
              disabled = {!(
                matchName.replaceAll(' ','') !== '' 
                && playerName.replaceAll(' ','') !== '' 
              )}
              >Done</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMatch;
