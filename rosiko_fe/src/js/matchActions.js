import countDice from "./diceUtils";
import axios from 'axios';
import endPoint from "./endPoint";

export const getPlayer = (match, userId) => {

    if(match === null) return null

    let players = match.players
    let targetPlayer = null

    for(let player of players){
        if(player.id === userId){
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

export async function joinMatch( userId, playerName, matchId ){
    try{
        await axios.put(endPoint + '/api/v1/match/join', { "matchId": matchId, "userId": userId, "playerName":  playerName} )
    }
    catch(error){
        console.error(error);
    }
}

export async function leavesMatch( userId, matchId ){

    try{
        await axios.put(endPoint + '/api/v1/match/leaves', { "matchId" : matchId, "userId" : userId } );
        console.log("User " + userId + " left match " + matchId);
    }
    catch(error){
        console.error(error);
    }
}

export async function getMatch( matchId ){
    let match = null;

    try{
        let response = await axios.get(endPoint + '/api/v1/match/' + matchId )
        match = response.data;
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
    let playerOnDutyId = match.playerOnDutyId

    for(let i=0; i<players.length   ; i++){
        if(players[i].id === playerOnDutyId){
            playerOnDuty = players[i]
            break
        }
    }

    return playerOnDuty
}

export function placeArmies( matchId, armiesToPlaceThisTurn, setArmiesToPlaceThisTurn ){    
    try{
        console.log("Player on duty are placing the armies")
        let armiesToPlace = {"matchId": Number(matchId), "armies": armiesToPlaceThisTurn}
        axios.post(endPoint + '/api/v1/match/place_armies', armiesToPlace)
        .then(()=>{setArmiesToPlaceThisTurn({})})
    }
    catch(error){
        console.error(error)
    }
}

const moveArmies = (match, armies, setMovedArmies) => {
    let territoryFrom = match.territoryFrom;
    let territoryTo = match.territoryTo;

    if(territoryFrom.placedArmies - armies >= 1 && territoryTo.placedArmies + armies >= 1){
        setMovedArmies(armies);
    }    
}

const attack = (match, attackerDice, setRolling) => {
    let diceNumber = countDice(attackerDice);

    setRolling(true);

    try{
        let payload = {"matchId": Number(match.id), "numberOfAttackerDice": diceNumber}
        axios.post(endPoint + '/api/v1/match/attack', payload)
    }
    catch(error){
        console.error(error)
    }
}

const deselectTerritory = (match, territory) => {
    try{
        let payload = {"matchId": Number(match.id), "territoryId": territory.id}
        axios.put(endPoint + '/api/v1/match/deselect_territory', payload)
    }
    catch(error){
        console.error(error)
    }
}

const selectTerritoryFrom = (match, territory) => {
    try{
        let payload = {"matchId": Number(match.id), "territoryId": territory.id}
        axios.put(endPoint + '/api/v1/match/select_territory_from', payload)
    }
    catch(error) { console.error(error) }
}

const selectTerritoryTo = (match, territory) => {
    try{
        let payload = {"matchId": Number(match.id), "territoryId": territory.id}
        axios.put(endPoint + '/api/v1/match/select_territory_to', payload)
    }
    catch(error) { console.error(error) }
}

//Ritorna il numero corretto di armate
const getNumberOfArmies = (match, territory, placedArmies, movedArmies) => {

    if( territory === null || territory === undefined ) return 0;

    let armies = territory.placedArmies;
    let territoryId = territory.id;
    let territoryFrom = match.territoryFrom;
    let territoryTo = match.territoryTo;
    
    if(placedArmies !== undefined && placedArmies[territoryId]) armies += placedArmies[territoryId];
    if(territoryFrom !== null && territoryTo !== null && territoryFrom.id === territoryId) armies -= movedArmies;
    if(territoryFrom !== null && territoryTo !== null && territoryTo.id === territoryId) armies += movedArmies; 
    
    return armies;
}

const endsAttacks = (match) => {
    try{
        let payload = {"matchId": Number(match.id)}
        axios.put(endPoint + '/api/v1/match/displacement_stage', payload)
    }
    catch(error) { console.error(error) }
}

const endsTurn = (match) => {
    try{
        let payload = {"matchId": Number(match.id)}
        axios.post(endPoint + '/api/v1/match/ends_turn', payload)
    }
    catch(error) { console.error(error) }
}

const playCards = ( match, player, cardSet) => {
    try{
        let payload = {"matchId": Number(match.id), "card_1": cardSet[0].id, "card_2": cardSet[1].id, "card_3": cardSet[2].id, "playerId": player.id}
        axios.post(endPoint + '/api/v1/match/play_cards', payload)
    }
    catch(error) { console.error(error) }
}

const confirmMove = (match, movedArmies, setMovedArmies) => {
    try{
        let json = {"matchId": match.id, "territoryFrom": match.territoryFrom.id, "territoryTo": match.territoryTo.id, "movedArmies": movedArmies}
        axios.put(endPoint + '/api/v1/match/confirm_move', json).then(()=>{setMovedArmies(0)})
    }
    catch(error) { console.error(error) }
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
                if(territories[i].id === cards[j].territoryId && territories[i].ownerId === player.id){
                    bonus += 2;
                    i=territories.length;
                }
            }
        }
    }

    return bonus;
}

const surrender = (match, player) => {
    try{
        let payload = {"matchId": Number(match.id), "playerId": player.id}
        axios.post(endPoint + '/api/v1/match/surrender', payload)
    }
    catch(error) { console.error(error) }
}

export default {
    getAvailableMatches,
    moveArmies,
    attack,
    deselectTerritory,
    selectTerritoryFrom,
    selectTerritoryTo,
    getNumberOfArmies,
    endsTurn,
    endsAttacks,
    playCards,
    confirmMove,
    trisBonusCalculator,
    surrender
};