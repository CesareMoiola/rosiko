import React, {useState} from "react";
import '../styles/ControlPanel.css';
import { CardContent, Divider, Typography, List, ListItem, Avatar, IconButton} from "@mui/material";
import Place3Armies from "./Place3Armies";
import PlaceArmies from "./PlaceArmies";
import GameOver from "./GameOver";
import Attack from "./Attack";
import Displacement from "./Displacement";
import { ArmiesTheme } from "../js/armiesPalette";
import FlagIcon from '@mui/icons-material/Flag';
import CardsIcon from "../images/CardsIcon";
import { getPlayerOnDuty } from '../js/matchActions';

function ControlPanel(props) {

    const [surrenderPanel, setSurrenderPanel] = useState(false);
    let isPlayerOnDuty = props.match.playerOnDutyId === props.player.id;

    const getColor = (player) => {
        let color = null;
        let playerOnDuty = getPlayerOnDuty(props.match);

        if(playerOnDuty.id === player.id ){
            color = ArmiesTheme[playerOnDuty.color].main;
        }

        return color;
    }

    const getAvatarColor = (player) => {
        let color = ArmiesTheme[player.color].main;

        if(player.active === false){
            color = ArmiesTheme["GRAY"].main;
        }

        return color;
    }

    const getTextColor = (player) => {
        let color = null;
        let playerOnDuty = getPlayerOnDuty(props.match)

        if( playerOnDuty.id === player.id ){
            color = ArmiesTheme[playerOnDuty.color].contrastText;
        }        
        
        if(player.active === false){
            color = ArmiesTheme["GRAY"].main;
        }

        return color;
    }

    const getPlayerInfo = (player) => {
        let message = null;
        let stage = null;
        let playerOnDuty = getPlayerOnDuty(props.match)

        if(playerOnDuty.id === player.id ){
            if(playerOnDuty.id === props.player.id){
                stage = "my turn";
            }
            else{
                switch(props.match.stage){
                    case "INITIAL_PLACEMENT": stage = "placement"; break;
                    case "PLACEMENT": stage = "placement"; break;
                    case "ATTACK": stage = "attack"; break;
                    case "DISPLACEMENT": stage = "displacement"; break;
                    case "GAME_OVER": stage = "win"; break;
                    default: stage = null; break;
                }
            }   
            
            message = <Typography align="right" variant="caption" color={getTextColor(player)}>{stage}</Typography>
        }
        else{
            message = <div className="playerInfo"><CardsIcon className="cardsIcon" fill={ArmiesTheme["GRAY"].main}/><Typography align="right" variant="caption" color={ArmiesTheme["GRAY"].main}>{" " + player.cards.length}</Typography></div>;
        }

        return message;
    }

    const getPlayers = (match) => {
        var playersItem = null;
        
        if(match.players.length > 0){
            playersItem = match.players.map((player) => 
            <ListItem  className= "list_item2" key={player.id} sx={{backgroundColor: getColor(player)}}>
                <Avatar className= "avatar" sx={{bgcolor: getAvatarColor(player)}}/>
                <div className = "player_lable">
                    <Typography align="left" color={getTextColor(player)}> {player.name} </Typography>
                    {getPlayerInfo(player)}
                </div>                
            </ListItem>
            );
        }        
        return playersItem;
    }

    const getActionPanel = () => {
        let actionPanel;
        let match = props.match;
        let player = props.player;
        let cards = props.cards;

        //Mostra il pannello di azione in base alla fase di gioco
        if(player.active || match.stage === "GAME_OVER"){
            if(surrenderPanel === true){
                actionPanel = <GameOver player = {player} match = {match} variant = "surrender" setSurrender={setSurrenderPanel}/>
            }
            else{
                switch(match.stage){
                    //Caso di piazzamento iniziale delle armate
                    case "INITIAL_PLACEMENT" :  actionPanel = <Place3Armies player={player} match={match} setMatch={props.setMatch}/>; break;  
                    case "PLACEMENT" :          actionPanel = <PlaceArmies player={player} match={match} setMatch={props.setMatch} cards={cards}/>; break;
                    case "ATTACK" :             actionPanel = <Attack player={player} match={match} setMatch={props.setMatch} movedArmies={props.movedArmies} setMovedArmies={props.setMovedArmies}/>; break;
                    case "DISPLACEMENT" :       actionPanel = <Displacement player={player} match={match} setMatch={props.setMatch} movedArmies={props.movedArmies} setMovedArmies={props.setMovedArmies}/>; break;
                    case "GAME_OVER":           actionPanel = <GameOver player={player} match={match} variant="winner"/>; break;
                    default :                   actionPanel = null; break;
                }
            }            
        }
        else actionPanel = <GameOver player = {player} match = {match} variant="inactive"/>;
        
        return actionPanel;
    }

    return (
        <div className="menu controlPanel" elevation={4}>
            <CardContent className="controlPanelContent scrollable">
                <div>
                <div className="controlPanelHeading">
                    <Typography variant="h5" fontWeight="bold">
                        Rosiko
                    </Typography>
                    <IconButton className="surrender_button" size="small" fontSize="small" disabled={props.match.stage === "GAME_OVER"} onClick={()=>{setSurrenderPanel(!surrenderPanel)}}>
                        <FlagIcon sx={{color: ArmiesTheme.GRAY.main}}/>
                    </IconButton>
                </div>
                <Divider className="control_panel_divider"/>                
                    <List className="player_list">
                        {getPlayers(props.match)}
                    </List>
                    <Divider className="control_panel_divider"/>
                    {getActionPanel()}
                </div>            
            </CardContent>
        </div>
    );  
}

export default ControlPanel;
