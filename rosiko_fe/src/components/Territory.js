import React, {useEffect, useState} from "react";
import '../styles/Territory.css';
import { Slider, Button, Card, CardContent, Typography, IconButton, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Dice } from "./Dice";
import countDice from "../js/diceUtils";
import { ArmiesTheme } from "../js/armiesPalette";
import MatchController from "../js/matchActions";

//Restituisce il numero massimo di dadi che si possono utilizzare per il territorio
const getNumberOfDice = (props) => {
    let dice = 0;

    if(props.variant === "attacker"){
        if(props.territory.placedArmies > 1) dice = 1;
        if(props.territory.placedArmies > 2) dice = 2;
        if(props.territory.placedArmies > 3) dice = 3;
    }
    if(props.variant === "defender"){
        if(props.territory.placedArmies >= 1) dice = 1;
        if(props.territory.placedArmies >= 2) dice = 2;
        if(props.territory.placedArmies >= 3) dice = 3;
    }  

    return dice;
}

//Restituisce il valore dei dadi da mostrare all'inizio
const getDice = (props) => {
    let dice = ["none","none","none"];

    //Caso in cui non ci sono risultati di lanci precedenti
    if(props.match.diceAttacker === null && props.match.diceDefender === null){
        for(let i=0; i<dice.length; i++){
            if(i+1 <= getNumberOfDice(props)){
                dice[i] = "5";
            }
        }
    }
    else{ //Caso in cui ci sono risultati di lanci precedenti
        if(props.variant === "attacker") {
            dice = props.match.diceAttacker;
            for(let i=0; i<dice.length; i++){
                if(i+1 <= getNumberOfDice(props) && dice[i] === "none"){
                    dice[i] = "add";
                }
            }
        }
        if(props.variant === "defender") dice = props.match.diceDefender;
    }

    return dice;
}


const Terrirory = (props) => {
    const [dices, setDices] = useState(getDice(props));
    let isPlayerOnDuty = props.isPlayerOnDuty;

    useEffect( () => {
        setDices(getDice(props)); 
    },[props]);

    //Ritorna il pulsante di attacco nel casso sia il territorio attaccante
    const getAttackButton = () =>{

        if(props.variant === "attacker" && 
        (props.match.defender === null || props.match.attacker.ownerId !== props.match.defender.ownerId)) {
            return(
                <Button 
                    className="attack_button" 
                    size="small" 
                    color="secondary" 
                    disabled={props.match.defender === null || getNumberOfDice(props) < 1 || props.isRolling}
                    onClick={() => {MatchController.attack(props.match, dices, props.setRolling)}}>
                        Attack
                </Button>
            );            
        }        
    }

    //Ritorna il pulsante per deselezionare il territorio
    const getCloseButton = () =>{

        let button = null;

        if( props.isPlayerOnDuty ) {
            button = (
                <IconButton 
                    className="exit_button" 
                    aria-label="exit" 
                    size="small" 
                    onClick={()=>{MatchController.deselectTerritory(props.match, props.territory);}}>                
                    <CloseIcon sx={{color: ArmiesTheme[props.territory.color].contrastText}}/>
                </IconButton>   
            );                     
        }
        
        return button;
    }

    //Ritorna false se il dado ha perso e true se ha vinto
    const isWinner = (numDice) => {
        let win = true;

        //Caso in cui non c'è un risultato da mostrare
        if(props.match.diceAttacker === null && props.match.diceDefender === null) return win;
        
        //Caso in cui c'è un riusltato da mostrare
        let attacker = props.match.diceAttacker[numDice];
        let defender = props.match.diceDefender[numDice];
        if(props.variant === "attacker"){
            if(attacker !== "none" && defender !== "none" && attacker <= defender) win = false;
        }
        if(props.variant === "defender"){
            if(attacker !== "none" && defender !== "none" && attacker > defender) win = false;
        }

        return win;
    }

    //Ritorna i dadi
    const getDiceButtons = () => {
        let showDice = JSON.parse(JSON.stringify(dices));

        //Caso in cui non c'è bisogno di lanciare i dadi
        if(props.variant === "territoryFrom" || props.variant === "territoryTo") return null;

        //Aumenta o decrementa i dadi da utilizzare
        const onClickHandlerDice = (numDice) => {
            if(props.variant === "defender") return;
            let newDices = dices;
            if(newDices[numDice] === "add"){ 
                for(let i=0; i<newDices.length; i++){
                    if(newDices[i] === "add"){
                        newDices[i] = "5";
                        break;
                    } 
                }
            }
            else{
                if(newDices[numDice] !== "none"){ 
                    for(let i=newDices.length-1; i>=1; i--){
                        if(newDices[i] !== "add" && newDices[i] !== "none"){
                            newDices[i] = "add";
                            break;
                        } 
                    }
                }  
            }
            setDices([newDices[0], newDices[1], newDices[2]]);
        }

        if(props.isRolling){
            for(let i=0; i<countDice(dices); i++){ showDice[i] = "rolling"; }
        }

        return (
            <div>
                <IconButton 
                    className = "diceButton"
                    onClick = {() => onClickHandlerDice(0)}
                    disabled = {showDice[0] === "none" || props.variant === "defender" || !isPlayerOnDuty || props.isRolling}
                    color = "primary"
                    >
                    <Dice 
                        className="dice" 
                        isRolling={props.isRolling}
                        value={showDice[0]} 
                        fill={ArmiesTheme[props.territory.color].contrastText}
                        win={isWinner(0)}/>
                </IconButton>
                <IconButton 
                    className = "diceButton"
                    onClick = {() => onClickHandlerDice(1)}
                    disabled = {showDice[1] === "none" || props.variant === "defender" || !isPlayerOnDuty || props.isRolling}
                    color = "primary">
                    <Dice 
                        className="dice" 
                        isRolling={props.isRolling}
                        value={showDice[1]} 
                        fill={ArmiesTheme[props.territory.color].contrastText}
                        win={isWinner(1)}/> 
                </IconButton>
                <IconButton 
                    className = "diceButton"
                    onClick = {() => onClickHandlerDice(2)}
                    disabled = {showDice[2] === "none" || props.variant === "defender" || !isPlayerOnDuty || props.isRolling}
                    color = "primary"
                >
                    <Dice 
                        className="dice" 
                        isRolling={props.isRolling}
                        value={showDice[2]} 
                        fill={ArmiesTheme[props.territory.color].contrastText}
                        win={isWinner(2)}
                        />  
                </IconButton>   
            </div>
        )
    }

    //Ritorna lo slider per lo spostamento delle armate successivo alla conquista del territorio
    const getMoveArmiesAfterAttack = () => {

        let component = null

        const handleSliderChange = (event, newValue) => {
            if(props.movedArmies !== newValue){
                props.setMovedArmies(newValue);
            }
        };

        if( props.match.territoryFrom !== null 
            && props.match.territoryTo !== null 
            && props.match.territoryFrom.ownerId === props.match.territoryTo.ownerId 
            && props.territory.id === props.match.territoryFrom.id
        ){            
            let minArmies = 0;
            let maxArmies = props.match.attacker.placedArmies -1;

            if(props.movedArmies < minArmies) props.setMovedArmies(minArmies);
            
            if(minArmies !== maxArmies){
                component = (
                    <div>
                        <Slider
                            className = "moveArmies"
                            color = "secondary"
                            step = {1}
                            min = {minArmies}
                            max = {maxArmies}   
                            onChange = {handleSliderChange}                 
                        />
                    </div>                
                );  
            }          
        }

        return component;
    }

    //Ritorna lo slider per lo spostamento delle armate della fase di spostamento
    const getMooveArmies = () => {
        let component = null;

        const handleSliderChange = (event, newValue) => {
            if(props.movedArmies !== newValue){  
                MatchController.moveArmies(props.match, newValue, props.setMovedArmies);
            }
        };

        if( props.match.territoryFrom !== null 
            && props.match.territoryTo !== null 
            && props.match.territoryFrom.ownerId === props.match.territoryTo.ownerId 
            && props.territory.id === props.match.territoryFrom.id
        ) {            
            let minArmies = 0;
            let maxArmies = props.match.territoryFrom.placedArmies -1;
            
            if(minArmies !== maxArmies){
                component = (
                    <div>
                        <Slider
                            className = "moveArmies"
                            color = "secondary"
                            step = {1}
                            min = {minArmies}
                            max = {maxArmies}   
                            onChange = {handleSliderChange}                 
                        />
                    </div>                
                );  
            }          
        }

        return component;
    }

    //Ritorna los slider per lo spostamento delle armate a seconda della fase di gioco
    const getMoveArmiesSlider = () => {
        let slider = null

        if(props.match.stage === "ATTACK") slider = getMoveArmiesAfterAttack();
        if(props.match.stage === "DISPLACEMENT") slider = getMooveArmies();
        
        return slider;
    }
    
    return (
        <Card className="territory" style={{backgroundColor: ArmiesTheme[props.territory.color].main}}>
            {getCloseButton()}
            <Chip className="armies_chip" size="small" label={MatchController.getNumberOfArmies(props.match, props.territory, props.placedArmies, props.movedArmies)}/>
            <CardContent className="territory_card_content">                
                <Typography className="title_card" component="div" textAlign="center" sx={{color: ArmiesTheme[props.territory.color].contrastText}}>
                    {props.territory.name}
                </Typography>
                {getDiceButtons()}
                {isPlayerOnDuty ? getAttackButton() : null}
                {isPlayerOnDuty ? getMoveArmiesSlider() : null}
            </CardContent>
        </Card>
    );  
}

export default Terrirory;
