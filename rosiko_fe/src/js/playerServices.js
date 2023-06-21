import endPoint from "./endPoint";
import axios from 'axios';

export async function resumePlayer(){

    let player = null
    let playerId = localStorage.getItem("playerId")

    if( playerId === null || playerId === "null" ){
        player = await getNewPlayer();
    }
    else{
        player = await getPlayer(playerId);
    }

    localStorage.setItem("playerId", player.id)
    localStorage.setItem("matchId", player.currentMatchID)

    return player;
}

export async function getPlayer( playerID ){

    let player = null;
    
    try{
        let response = await axios.get( endPoint + '/api/v1/player/' + playerID )
        player = response.data;
    }
    catch(error){
        console.error(error);
    }

    return player;
}

export async function getNewPlayer(){
    let player = null;
    
    try{
        let response = await axios.get( endPoint + '/api/v1/player/new_player' )
        player = response.data;
    }
    catch(error){
        console.error(error);
    }
    
    return player;
}

export const updatePlayer = ( player ) => {
    axios.put(endPoint + '/api/v1/player/update', player )
    .catch(error => {
        console.error(error);
    }); 
}

export const updateSocketId = ( playerId, socketId ) => {
    if(playerId !==  null && socketId !==  null){
        axios.put( endPoint + '/api/v1/player/update_socket/' + playerId, { "socketId": socketId } )
         .then(() => console.log('Socket updated'))
         .catch( error => console.error(error))
    }
}