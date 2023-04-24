import endPoint from "./endPoint";

const WebSocket = require("../js/webSocket").default;
const client = WebSocket.getClient();

const newMatch = function(matchName, password, playerName){
    const url = endPoint + "/new_match";
    var match = null;

    var data = {
        matchName: matchName,
        matcgPassword: password,
        playerName: playerName   
    }

    var request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        match = JSON.parse(request.responseText);
    }

    console.log("New match created");
    
    return match;
}

const getAvailableMatches = function(){
    const url = endPoint + "/available_matches";
    var request = new XMLHttpRequest();
    var matches = null;
    
    request.open("GET", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    if (request.status === 200) {
        matches = JSON.parse(request.responseText);
    }
    
    return matches;
}

const getPlayer = function(matchId, playerId){
    const url = endPoint + "/get_player";
    var request = new XMLHttpRequest();
    var player = null;
    
    request.open("GET", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({matchId: matchId, playerId: playerId}));

    if (request.status === 200) {
        player = JSON.parse(request.responseText);
    }
    else{
        console.log("ERROR on " + url + " status: " + request.status);
    }
    
    return player;
}

const getPlayers = function(matchId){
    const url = endPoint + "/get_players";
    var request = new XMLHttpRequest();
    var players = null;
    
    request.open("GET", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({matchId: matchId}));

    if (request.status === 200) {
        players = JSON.parse(request.responseText);
    }
    else{
        console.log("ERROR on " + url + " status: " + request.status);
    }
    
    return players;
}

const getMatch = function(matchId){
    let url = endPoint + "/get_match?matchId=" + matchId;
    let request = new XMLHttpRequest();
    let match = null;
    
    request.open("GET", url, false);
    request.send(null);

    if (request.status === 200) {
        match = JSON.parse(request.responseText);
    }
    else{
        console.log("ERROR on " + url + " status: " + request.status);
    }

    return match;
}

const placeArmies = function(matchId, placedArmies){
    client.send("/app/place_armies", {}, JSON.stringify({matchId : matchId, armies : placedArmies}));   
}

const attack = function(matchId, diceNumber){
    client.send("/app/attack", {}, JSON.stringify({matchId : matchId, numberOfAttackerDice: diceNumber}));
}

const selectAttacker = function(matchId, territoryId){
    client.send("/app/select_attacker", {}, JSON.stringify({matchId : matchId, territoryId : territoryId}));
}

const selectDefender = function(matchId, territoryId){
    client.send("/app/select_defender", {}, JSON.stringify({matchId : matchId, territoryId : territoryId}));
}

const deselectTerritory = function(matchId, territoryId){
    client.send("/app/deselect_territory", {}, JSON.stringify({matchId : matchId, territoryId : territoryId}));
}

const selectTerritoryFrom = function(matchId, territoryId){
    client.send("/app/select_territory_from", {}, JSON.stringify({matchId : matchId, territoryId : territoryId})); 
}

const selectTerritoryTo = function(matchId, territoryId){
    client.send("/app/select_territory_to", {}, JSON.stringify({matchId : matchId, territoryId : territoryId})); 
}

const endsTurn = (match) => {
    client.send("/app/ends_turn", {}, JSON.stringify({  matchId : match.id }));     
}

const endsAttack = (match) => {
    client.send("/app/displacement_stage", {}, JSON.stringify({ matchId : match.id, }));  
}

const confirmMove = (match, movedArmies) => {
    console.log("confirmMove: ");
    console.dir(match);
    console.dir(movedArmies);
    client.send("/app/confirm_move", {}, JSON.stringify({  matchId : match.id, territoryFrom : match.territoryFrom.id, territoryTo: match.territoryTo.id, movedArmies: movedArmies })); 
}

const playCards = (match, player, cardSet) => {
    client.send("/app/play_cards", {}, JSON.stringify({matchId : match.id, playerId : player.id, card_1 : cardSet[0].id, card_2 : cardSet[1].id, card_3 : cardSet[2].id}));
}

const surrender = (match, player) => {
    client.send("/app/surrender", {}, JSON.stringify({matchId : match.id, playerId : player.id}));
}

const leavesMatch = (match, playerId) => {
    client.send("/app/leaves_match", {}, JSON.stringify({matchId : match.id, playerId : playerId}));
}

export default {
    newMatch,
    getJoinableMatches: getAvailableMatches,
    getPlayer,
    getMatch,
    getPlayers,
    placeArmies,
    attack,
    selectAttacker,
    selectDefender,
    deselectTerritory,
    selectTerritoryFrom,
    selectTerritoryTo,
    endsTurn,
    confirmMove,
    endsAttack,
    playCards,
    surrender,
    leavesMatch
};