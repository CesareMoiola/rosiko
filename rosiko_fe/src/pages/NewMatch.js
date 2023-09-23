import React, { useState, useContext } from "react";
import { UserContext } from './App';
import { Button, TextField } from '@mui/material';
import '../styles/NewMatch.css';
import {useNavigate, Link as RouterLink} from 'react-router-dom';
import {newMatch, joinMatch} from '../js/matchActions';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function NewMatch(){

  const { client, userId } = useContext(UserContext);
  const [matchName, setMatchName] = useState('');
  const [password, setPassword] = useState('');
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate(); 

  
  const handleMatchName = event => {
    if(event.target.value.length <= 12) setMatchName(event.target.value);
  }
  const handlePassword = event => {
    if(event.target.value.length <= 12) setPassword(event.target.value);
  }
  const handlePlayerName = event => {
    if(event.target.value.length <= 12) setPlayerName(event.target.value);
  }


  //Save new account and refresh all accounts
  async function newMatchSubmit(event){
    event.preventDefault();
    console.log("New match submit");
    
    let matchId = await newMatch(matchName, password);
    await joinMatch(userId, playerName, matchId);
    
    if(matchId !== null) navigate("/waiting_room/" + matchId);
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
            disabled={true}
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
