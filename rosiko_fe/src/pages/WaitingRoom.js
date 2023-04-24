import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Button, Typography } from "@mui/material";
import { List } from "@mui/material";
import { ArmiesTheme } from "../js/armiesPalette";
import '../styles/WaitingRoom.css';

const WebSocket = require("../js/webSocket").default;
const client = WebSocket.getClient();
const ApiGateway = require("../js/apiGateway").default;
const Data = require("../js/data").default;

function WaitingRoom() {   
    const navigate = useNavigate();
    let { id } = useParams();
    const [match, setMatch] = useState(ApiGateway.getMatch(id));    

    //Iscrizione all'endpoint per ricevere aggiornamenti sul match
    useEffect(
        () => {
            try{
                client.subscribe("/user/queue/match", payload => {
                    let updatedMatch = JSON.parse(payload.body);
    
                    if(updatedMatch.state === 'STARTED'){      
                        Data.setMatch(ApiGateway.getMatch(id));              
                        navigate("/match/" + updatedMatch.id);
                        client.unsubscribe("waiting_room");
                    }
                    else{
                        setMatch(updatedMatch);
                    }
                },
                {id: "waiting_room"}); 
            }
            catch(e){
              console.error(e);
              navigate("/"); 
            } 
        }, [navigate, id]
    );              

    const getPlayers = () => {
        var players = match.players;
        var playersItem = null;
        if(players.length > 0){
            playersItem = players.map((player) => 
                <div className="player_item" key={player.id}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: ArmiesTheme[player.color].main}}/>
                    <Typography>{player.name}</Typography>
                </div>
            );
        }        
        return playersItem;
    };  

    const submitPlay = () => {
        try{
            client.send("/app/start_match", {}, JSON.stringify({matchId : match.id}));
        }
        catch(e){
          console.error(e);
          navigate("/"); 
        }
    };

    const leavesMatch = () => {
        try{
            ApiGateway.leavesMatch(match, WebSocket.getUserId());
        }
        catch(e){
            console.error(e);
        }
        navigate("/"); 
    }
  
    return (
        <div className="waiting-room">
            <div className="menu">
                <h1 className="title">{match.name}</h1>
                <List className="player-list">
                    {getPlayers(match.id)}
                </List>
                <br/>
                <div className="buttons">
                    <Button 
                        className="home-button" 
                        variant="outlined"
                        onClick={() => {leavesMatch(match)}}
                    >Leaves</Button>
                    <Button  
                        className="home-button"
                        onClick={ () => {submitPlay()}}
                        variant="contained" 
                        disabled = {!(match.state === 'READY')}
                    >Play</Button>
                </div>
            </div>
        </div>        
    );    
}

export default WaitingRoom;