import React, {useState, useEffect} from "react";
import { Button, Typography, Divider } from "@mui/material";
import Territory from "./Territory";
import '../styles/Attack.css';
import Arrow from "./Arrow";
import {ArmiesTheme} from "../js/armiesPalette";
import MatchController from '../js/matchActions';
import apiGateway from "../js/apiGateway";

function Attack(props) {
    const [attackerTerritory, setAttackerTerritory] = useState(props.match.attacker);
    const [defenderTerritory, setDefenderTerritory] = useState(props.match.defender); 
    const [isRolling, setRolling] = useState(false); 
    let isPlayerOnDuty = props.match.playerOnDuty.id === props.player.id;
    let showArrow = props.match.attacker !== null && props.match.defender !== null;
    let showTitle = (props.match.attacker !== null || props.match.defender !== null) || isPlayerOnDuty;

    useEffect(()=>{
        setAttackerTerritory(props.match.attacker);
        setDefenderTerritory(props.match.defender);
        setRolling(false);
    },[props]);

    const getAttacker = () => {

        let attacker = null;

        if(isPlayerOnDuty === true){
            attacker = (
                <Typography className="MediumEmphasis paragraph_margin" variant="body2">
                    Select your territory to attack from or move on to the next phase of the game.
                </Typography>
            );
        }        

        if(attackerTerritory != null){
            attacker = <Territory 
                className = "territory_margin" 
                territory = {attackerTerritory} 
                match = {props.match} 
                isPlayerOnDuty = {isPlayerOnDuty} 
                setMatch = {props.setMatch}
                movedArmies = {props.movedArmies}
                setMovedArmies = {props.setMovedArmies} 
                isRolling = {isRolling}
                setRolling = {setRolling}
                variant = "attacker"/>
        }

        return attacker;
    }

    const getDefender = () => {
        let defender = null;

        if(defenderTerritory != null){
            defender = <Territory 
                className = "territory_margin" 
                territory = {defenderTerritory} 
                match = {props.match} 
                isPlayerOnDuty = {isPlayerOnDuty}
                setMatch = {props.setMatch}
                movedArmies = {props.movedArmies}
                isRolling = {isRolling} 
                variant = "defender"/>
        }

        return defender;
    }    

    const getButtons = () => {
        let button = null;

        const endAttacks = () => {
            apiGateway.endsAttack(props.match);
        }

        if( isPlayerOnDuty === true) {
            if( props.movedArmies > 0 || (
                props.match.territoryFrom !== null 
                && props.match.territoryTo !== null 
                && props.match.territoryFrom.owner.id === props.match.territoryTo.owner.id)
            ){
                button = <Button className="ends_turn_button" onClick={() => {MatchController.confirmMove(props.match, props.movedArmies)}} variant="contained" >Confirm move</Button>;
            }
            else{ 
                button = <div>
                    <Button className = "ends_attack_button margin_right" onClick={endAttacks} variant="outlined">Ends attacks</Button> 
                    <Button className = "ends_attack_button" onClick={()=>{apiGateway.endsTurn(props.match)}} variant="outlined">Ends turn</Button> 
                </div>
            }
        }
       
        return button;
    }
    
    return (
        <div className="attack">
            {showTitle ? <Typography className="action_panel_title" variant="h6"> Attack phase </Typography> : null}
            {getAttacker()}
            {showArrow ? <Arrow className="arrow" color={ArmiesTheme["GRAY"].main}/> : null}
            {getDefender()}
            {getButtons()}              
            {showTitle ? <Divider className="control_panel_divider"/> : null}              
        </div>
    );  
}

export default Attack;
