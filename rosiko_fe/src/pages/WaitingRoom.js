import React, { useState, useEffect, useContext } from "react";
import { UserContext } from './App';
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Button, Typography } from "@mui/material";
import { List } from "@mui/material";
import { ArmiesTheme } from "../js/armiesPalette";
import '../styles/WaitingRoom.css';
import {getMatch, leavesMatch, startMatch} from "../js/matchActions";

function WaitingRoom() {   
    const {client, userId, isConnect} = useContext(UserContext);
    const [match, setMatch] = useState();
    const navigate = useNavigate();
    let { id } = useParams();  

    //Iscrizione all'endpoint per ricevere aggiornamenti sul match
    useEffect(
        () => {
            try{
                if(isConnect) socketSubscribe();
            }
            catch(e){
                console.error("Subscription failed")
                client.onConnect( () => { socketSubscribe() })
            } 
    }, [isConnect])
    
    useEffect(()=>{
        const fetchData = async ()=>{
            let match = await getMatch( id );
            setMatch(match);   
        }

        fetchData()
            .catch(console.error)
    },[id])

    useEffect(() => {
        if( match !== undefined && match.state === 'STARTED' ){              
            client.unsubscribe("waiting_room");
            navigate("/match/" + match.id);
        }
    }, [match])


    const socketSubscribe = () => {
        client.subscribe("/user/queue/match", payload => {
            let updatedMatch = JSON.parse(payload.body);
            console.log("/user/queue/match updatedMatch:");
            setMatch(updatedMatch);
        },
        {id: "waiting_room"})
        console.log("Socket subscribed to /user/queue/match")
    }

    const getPlayers = () => {

        var players = match.players;
        var playersItem = null;
        if(players !== undefined && players.length > 0){
            playersItem = players.map((player) => 
                <div className="player_item" key={player.id}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: ArmiesTheme[player.color].main}}/>
                    <Typography>{player.name}</Typography>
                </div>
            );
        }        
        return playersItem;
    }

    const submitPlay = async () => {
        await startMatch( match.id );
    }

    const leavesMatchSubmit = () => {
        try{
            leavesMatch(userId, match.id);
            setMatch(null);
        }
        catch(e){
            console.error(e);
        }
        navigate("/home"); 
    }

    const getWaitingRoomComponent = () => {

        if(match === null || match === undefined) return null;
        
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
                            onClick={() => {leavesMatchSubmit(match)}}
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
  
    return getWaitingRoomComponent();
}

export default WaitingRoom;