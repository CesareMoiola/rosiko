import endPoint from "./endPoint";

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

export default {
    newMatch,
    getJoinableMatches: getAvailableMatches,
    getPlayer,
    getMatch,
    getPlayers
};