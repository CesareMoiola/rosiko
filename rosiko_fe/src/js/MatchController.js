import apiGateway from '../js/apiGateway';
import countDice from "../js/diceUtils";

const WebSocket = require("../js/webSocket").default;

const getPlayer = (match) => {
    let id = WebSocket.getUserId();
    let returnPlayer = null;

    match.players.forEach(p => {
        if(p.id === id){ 
            returnPlayer = p; 
        }
    });  
    return returnPlayer;
}

const placeArmy = (match, territoryId, placedArmies, setPlacedArmies) => {
    let player = getPlayer(match);
    let newPlacedArmies = {};
    
    if(placedArmies !== undefined) newPlacedArmies = JSON.parse(JSON.stringify(placedArmies));

    if( 
        player.availableArmies > 0
        && ((match.stage === "INITIAL_PLACEMENT" && player.armiesPlacedThisTurn < 3) || match.stage === "PLACEMENT")
    ){
        player.availableArmies--;
        player.armiesPlacedThisTurn++;
        if(newPlacedArmies.hasOwnProperty(territoryId)){
            newPlacedArmies[territoryId] = newPlacedArmies[territoryId] + 1;
        }
        else{
            newPlacedArmies[territoryId] = 1;
        }
        
        setPlacedArmies(newPlacedArmies);

        //Chiamata a backend solo quando sono state piazzate tutte le armate
        if(
            player.availableArmies === 0
            || (match.stage === "INITIAL_PLACEMENT" && player.armiesPlacedThisTurn === 3)
        ){
            console.dir(newPlacedArmies);
            apiGateway.placeArmies(match.id, newPlacedArmies);
        }        
    }
}

const moveArmies = (match, armies, setMovedArmies) => {
    let territoryFrom = match.territoryFrom;
    let territoryTo = match.territoryTo;

    if(territoryFrom.armies - armies >= 1 && territoryTo.armies + armies >= 1){
        setMovedArmies(armies);
    }    
}

const attack = (match, attackerDice, setRolling) => {
    let diceNumber = countDice(attackerDice);

    setRolling(true);

    //Chiamata a backend
    apiGateway.attack(match.id, diceNumber);
}

const selectAttacker = (match, territory, setMatch) => {
    //Chiamata al backend
    apiGateway.selectAttacker(match.id, territory.id);  
}

const selectDefender = (match, territory, setMatch) => {
    //Chiamata al backend
    apiGateway.selectDefender(match.id, territory.id);  
}

const deselectTerritory = (match, territory, setMatch, setMovedArmies) => {
    //Chiamata al backend
    apiGateway.deselectTerritory(match.id, territory.id); 
}

const selectTerritoryFrom = (match, territory, setMatch) => {
    //Chiamata al backend
    apiGateway.selectTerritoryFrom(match.id, territory.id); 
}

const selectTerritoryTo = (match, territory, setMatch) => {
    //Chiamata al backend
    apiGateway.selectTerritoryTo(match.id, territory.id); 
}

//Ritorna il numero corretto di armate
const getArmies = (match, territory, placedArmies, movedArmies) => {
    let armies = territory.armies;
    let id = territory.id;
    let territoryFrom = match.territoryFrom;
    let territoryTo = match.territoryTo;
    
    if(placedArmies != null && placedArmies.hasOwnProperty(id)) armies += placedArmies[id];
    if(territoryFrom !== null && territoryTo !== null && territoryFrom.id === id) armies -= movedArmies;
    if(territoryFrom !== null && territoryTo !== null && territoryTo.id === id) armies += movedArmies; 
    
    return armies;
}

const endsTurn = (match) => {
    apiGateway.endsTurn(match);
}

const confirmMove = (match, movedArmies, map) => {
    apiGateway.confirmMove(match, movedArmies);
}

const trisBonusCalculator = (player, cards, map) =>{
    let type1 = cards[0].cardType;
    let type2 = cards[1].cardType;
    let type3 = cards[2].cardType;
    let bonus = 0;
    
    //Bonus dovuto alle carte
    if(type1 === "TRACTOR" && type2 === "TRACTOR" && type3 === "TRACTOR" ){ bonus = 4 }
    if(type1 === "FARMER" && type2 === "FARMER" && type3 === "FARMER" ){ bonus = 6 }
    if(type1 === "COW" && type2 === "COW" && type3 === "COW" ){ bonus = 8 }
    if( (type1 !== "JOLLY" && type1 !== type2 && type1 !== type3) &&
        (type2 !== "JOLLY" && type2 !== type3 && type2 !== type1) &&
        (type3 !== "JOLLY" && type3 !== type1 && type3 !== type2)
    ){ bonus = 10 }
    if( (type1 === "JOLLY" && type2 === type3 && type2!== "JOLLY")||
        (type2 === "JOLLY" && type1 === type3 && type1!== "JOLLY")||
        (type3 === "JOLLY" && type1 === type2 && type1!== "JOLLY")
    ){ bonus = 12 }

    //Bonus dovuto ai territori posseduti
    if(bonus > 0){
        let territories = map.territories;
        
        for(let j=0; j<cards.length; j++){
            for(let i=0; i<territories.length; i++){                
                if(territories[i].id === cards[j].territoryId && territories[i].owner.id === player.id){
                    bonus += 2;
                    i=territories.length;
                }
            }
        }
    }

    return bonus;
}

export default {
    placeArmy,
    getPlayer,
    moveArmies,
    attack,
    selectAttacker,
    selectDefender,
    deselectTerritory,
    selectTerritoryFrom,
    selectTerritoryTo,
    getArmies,
    endsTurn,
    confirmMove,
    trisBonusCalculator
};