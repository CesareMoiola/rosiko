import endPoint from "./endPoint";
import axios from 'axios';

export async function resumeUser(){

    let user = null
    let userId = localStorage.getItem("userId")

    if( userId === null || userId === "null" ){
        user = await getNewUser();
    }
    else{
        user = await getUser(userId);
    }

    localStorage.setItem("userId", user.id)
    localStorage.setItem("matchId", user.currentMatchId)

    return user;
}

export async function getUser( userId ){

    let user = null;
    
    try{
        let response = await axios.get( endPoint + '/api/v1/user/' + userId )
        user = response.data;
    }
    catch(error){
        console.error(error);
    }

    return user;
}

export async function getNewUser(){
    let user = null;
    
    try{
        let response = await axios.get( endPoint + '/api/v1/user/new_user' )
        user = response.data;
    }
    catch(error){
        console.error(error);
    }
    
    return user;
}

export const updatePlayer = ( player ) => {
    axios.put(endPoint + '/api/v1/player/update', player )
    .catch(error => {
        console.error(error);
    }); 
}

export const updateSocketId = ( userId, socketId, setSocketId ) => {
    if(userId !==  null && socketId !==  null){
        axios.put( endPoint + '/api/v1/user/update_socket/' + userId, { "socketId": socketId } )
         .then(() => {
            setSocketId(socketId)
            console.log('Socket updated')
        })
         .catch( error => console.error(error))
    }
}