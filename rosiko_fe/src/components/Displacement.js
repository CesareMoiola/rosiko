import React, {useState, useEffect} from "react";
import '../styles/Displacement.css';
import { Button, Typography, Divider } from "@mui/material";
import Territory from "./Territory";
import Arrow from "./Arrow";
import {ArmiesTheme} from "../js/armiesPalette";
import MatchController from "../js/MatchController";

function Displacement(props) {
    const [territoryFrom, setTerritoryFrom] = useState(props.match.territoryFrom);
    const [territoryTo, setTerritoryTo] = useState(props.match.territoryTo);
    let isPlayerOnDuty = props.match.playerOnDuty.id === props.player.id;
    let showArrow = props.match.territoryFrom !== null && props.match.territoryTo !== null;
    let showTitle = (props.match.territoryFrom !== null || props.match.territoryTo !== null) || isPlayerOnDuty;

    useEffect(()=>{
        setTerritoryFrom(props.match.territoryFrom);
        setTerritoryTo(props.match.territoryTo);
    },[props]);

    const getTerritoryFrom = () => {
        let territory = <Typography className="MediumEmphasis" variant="body2">
            Select territory to move armies from and territory to move them to or move on to the next stage of the game.
        </Typography>;

        if(!isPlayerOnDuty) territory = null;

        if(territoryFrom !== null){
            territory = <Territory 
                className = "territory_margin" 
                territory = {territoryFrom} 
                match={props.match} 
                isPlayerOnDuty={isPlayerOnDuty} 
                variant="territoryFrom"
                setMatch={props.setMatch}
                movedArmies = {props.movedArmies}
                setMovedArmies = {props.setMovedArmies}
                />
        }

        return territory;
    }

    const getTerritoryTo = () => {
        let territory = null;

        if(territoryTo != null){
            territory = <Territory  
                className = "territory_margin" 
                territory = {territoryTo} 
                match={props.match} 
                isPlayerOnDuty={isPlayerOnDuty} 
                variant="territoryTo"
                setMatch={props.setMatch}
                movedArmies = {props.movedArmies}
            />
        }

        return territory;
    }    

    const getEndsTurnButton = () => {
        let button = null;

        if(isPlayerOnDuty === true){
            if(props.movedArmies <= 0) {button = <Button className="ends_turn_button" onClick={() => {MatchController.endsTurn(props.match)}} variant="outlined">Ends turn</Button>;}
            else{ button = <Button className="ends_turn_button" onClick={() => {MatchController.confirmMove(props.match, props.movedArmies)}} variant="contained" >Confirm move</Button> }
        }

        return button;
    }
    
    return (
        <div>
            {showTitle ? <Typography className="action_panel_title" variant="h6"> Displacement phase </Typography> : null}
            {getTerritoryFrom()}
            {showArrow ? <Arrow className="arrow" color={ArmiesTheme["GRAY"].main}/> : null}
            {getTerritoryTo()}  
            {getEndsTurnButton()}            
            {showTitle ? <Divider className="control_panel_divider"/> : null}
        </div>
    );  
}

export default Displacement;
