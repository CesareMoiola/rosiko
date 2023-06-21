class WSGateway {

    constructor(){
        this.webSocket = require('./webSocket');
        this.webSocket.connect();
        this.client = this.webSocket.client;
    }

    placeArmies = function(matchId, placedArmies){
        this.client.send("/app/place_armies", {}, JSON.stringify({matchId : matchId, armies : placedArmies}));   
    }
    
    attack = function(matchId, diceNumber){
        this.client.send("/app/attack", {}, JSON.stringify({matchId : matchId, numberOfAttackerDice: diceNumber}));
    }
    
    selectAttacker = function(matchId, territoryId){
        this.client.send("/app/select_attacker", {}, JSON.stringify({matchId : matchId, territoryId : territoryId}));
    }
    
    selectDefender = function(matchId, territoryId){
        this.client.send("/app/select_defender", {}, JSON.stringify({matchId : matchId, territoryId : territoryId}));
    }
    
    deselectTerritory = function(matchId, territoryId){
        this.client.send("/app/deselect_territory", {}, JSON.stringify({matchId : matchId, territoryId : territoryId}));
    }
    
    selectTerritoryFrom = function(matchId, territoryId){
        this.client.send("/app/select_territory_from", {}, JSON.stringify({matchId : matchId, territoryId : territoryId})); 
    }
    
    selectTerritoryTo = function(matchId, territoryId){
        this.client.send("/app/select_territory_to", {}, JSON.stringify({matchId : matchId, territoryId : territoryId})); 
    }
    
    endsTurn = (match) => {
        this.client.send("/app/ends_turn", {}, JSON.stringify({  matchId : match.id }));     
    }
    
    endsAttack = (match) => {
        this.client.send("/app/displacement_stage", {}, JSON.stringify({ matchId : match.id, }));  
    }
    
    confirmMove = (match, movedArmies) => {
        this.client.send("/app/confirm_move", {}, JSON.stringify({  matchId : match.id, territoryFrom : match.territoryFrom.id, territoryTo: match.territoryTo.id, movedArmies: movedArmies })); 
    }
    
    playCards = (match, player, cardSet) => {
        this.client.send("/app/play_cards", {}, JSON.stringify({matchId : match.id, playerId : player.id, card_1 : cardSet[0].id, card_2 : cardSet[1].id, card_3 : cardSet[2].id}));
    }
    
    surrender = (match, player) => {
        this.client.send("/api/v1/match/leaves", {}, JSON.stringify({matchId : match.id, playerId : player.id}));
    }
    
    leavesMatch = (match, playerId) => {
        this.client.send("/api/v1/match/leaves", {}, JSON.stringify({matchId : match.id, playerId : playerId}));
    }
}

export default WSGateway;