import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import endPoint from "./endPoint";

export class WebSocket {

    constructor(){
        this.client = Stomp.over(new SockJS(endPoint + "/stomp"));
    }

    connect(){
        this.client.connect(
            {},
            (header) => {
                this.socketID = header.headers["user-name"];
                console.log("Socket ID: " + this.socketID);
            }
        );  
        return this.socketID;
    }

    getSocketId(){
        return this.socketID;
    }    
}

export default WebSocket;