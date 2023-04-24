import React, { useState, useEffect } from "react";
import '../styles/JoinMatch.css';
import { Button, RadioGroup, Radio, FormControlLabel, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate, Link as RouterLink} from 'react-router-dom';

const ApiGateway = require("../js/apiGateway").default;
const WebSocket = require("../js/webSocket").default;
const client = WebSocket.getClient();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const JoinMatch = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [matchId, setMatchId] = useState(undefined);
  const [playerName, setPlayerName] = useState("");
  
  useEffect(
    () => {
      try{
        client.subscribe(
          "/queue/joinableMatches", 
          function (payload) {
            setMatches(JSON.parse(payload.body));
          },
          {id: "joinableMatches"}
        );
  
        setMatches(ApiGateway.getJoinableMatches());
      }
      catch(e){
        console.error(e);
        navigate("/"); 
      } 
    }, [navigate]
  )

  const joinMatchSubmit = event => {
    try{
      event.preventDefault(); //Evita che viene ricaricata la pagina
      client.send("/app/join_match", {}, JSON.stringify({matchId : matchId, playerName : playerName}));
      navigate("/waiting_room/" + matchId);
      client.unsubscribe("joinableMatches");
    }
    catch(e){
      console.error(e);
      navigate("/"); 
    } 
  }

  const handlePlayerName = event => {
    if(event.target.value.length <= 12) setPlayerName(event.target.value);
  }

  const selectMatch = (event, value) =>{
    setMatchId(value);
  }

  const getMatches = () => {
    return(
      matches.map(match => 
        <FormControlLabel 
          key={match.id} 
          value={match.id ? match.id : ""} 
          control={<Radio/>}
          label={
            <div className='matchLabel'>
                <LockIcon 
                  className='icon publicMatch' 
                  fontSize='small' 
                  sx={{visibility: match.password!==null ? "visible" : "hidden"}}/>
                <label className='matchName'>{match.name}</label>
                <PersonIcon className='icon personIcon-margin' fontSize='small'/>
                <label>{match.players.length}</label>
            </div>
          }>
        </FormControlLabel>
      ));
  }

  return (
    <div className="join-match">
      <div className="menu">
        <form onSubmit={joinMatchSubmit}>
          <h1 className="title">Join a match</h1>
          <RadioGroup 
            className="match-list" 
            name="matcheList"
            value={matchId ? matchId : ""}
            onChange={selectMatch}>
            {getMatches()}
          </RadioGroup>
          <br/>
          <TextField 
            className="player-name-input"
            label="Player name" 
            variant="outlined"
            autoComplete="off"
            id = "playerName"
            name="playerName"
            value={playerName ? capitalizeFirstLetter(playerName) : ""}
            onChange={handlePlayerName}/>
            <br/>
          <div className="buttons">
            <Button 
              className="home-button" 
              variant="outlined"
              component={RouterLink}
              to="/"
              >Back</Button>
            <Button 
              type="submit" 
              className="home-button" 
              variant="contained"
              disabled = {matchId === undefined || playerName.replaceAll(' ','') === ""}>Join</Button>
          </div>
        </form> 
      </div>       
    </div>
  );   
}

export default JoinMatch;
