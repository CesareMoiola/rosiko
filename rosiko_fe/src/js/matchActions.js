import apiGateway from './apiGateway';
import countDice from "./diceUtils";
import axios from 'axios';
import endPoint from "./endPoint";

export const getPlayer = (match, playerId) => {

    if(match === null) return null

    let players = match.players
    let targetPlayer = null

    console.log("Get player: ")
    console.dir(match);

    for(let player of players){
        if(player.id === playerId){
            targetPlayer = player
            break
        }
    }

    return targetPlayer
}

export async function newMatch( matchName, password ){

    let matchId = null;

    try{
        let response = await axios.post(endPoint + '/api/v1/match/new', { "name": matchName, "password": password } )
        matchId = response.data.id;
        console.log("New match created: " + matchId);
    }
    catch(error){
        console.error(error);
    }

    return matchId;
}

export async function joinMatch( playerId, playerName, matchId ){
    
    let player = {"id": playerId, "name": playerName}

    try{
        await axios.put(endPoint + '/api/v1/match/join', { "matchId" : matchId, "player" : player } )
    }
    catch(error){
        console.error(error);
    }
}

export async function leavesMatch( playerId, matchId ){

    try{
        await axios.put(endPoint + '/api/v1/match/leaves', { "matchId" : matchId, "playerId" : playerId } );
        console.log("Player " + playerId + " left match " + matchId);
    }
    catch(error){
        console.error(error);
    }
}

export async function getMatch( matchId ){
    let match = null;

    try{
        console.log("Get match " + matchId );
        let response = await axios.get(endPoint + '/api/v1/match/' + matchId )
        match = response.data;
        console.dir(match);
    }
    catch(error){
        console.error(error);
    }    

    return match;
}

export async function getAvailableMatches(){
    let matches = []
    
    try{
        let response = await axios.get(endPoint + '/api/v1/match/available')
        matches = response.data
    }
    catch(error){
        console.error(error)
    }  

    return matches;
}

export function startMatch( matchId ){    
    try{
        axios.put(endPoint + '/api/v1/match/start/' + matchId)
    }
    catch(error){
        console.error(error)
    }
}


export async function getMatchState(matchId) {    
    let state = null;

    if(matchId === null) return null

    try{        
        let response = await axios.get(endPoint + '/api/v1/match/state/' + matchId )
        state = response.data;
    }
    catch(error){
      console.error(error);
    }

    return state;
}

export const getPlayerOnDuty = (match) => {
    let players = match.players
    let playerOnDuty = null
    let id = match.getPlayerOnDutyId

    for(let player in players){
        if(player.id === id){
            playerOnDuty = player
            break
        }
    }

    return playerOnDuty
}

const placeArmy = (player, match, territoryId, placedArmies, setPlacedArmies) => {
    let newPlacedArmies = JSON.parse(JSON.stringify(placedArmies))
    
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
    
    if( territory === null || territory === undefined ) return 0;

    let armies = territory.placedArmies;
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
    getAvailableMatches,
    placeArmy,
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