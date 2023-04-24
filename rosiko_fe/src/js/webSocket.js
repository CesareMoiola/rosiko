import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import endPoint from "./endPoint";

let userId;

class PrivateWebSocket {
    constructor() {
        this.client = Stomp.over(new SockJS(endPoint + "/stomp"));
        this.client.connect(
            {},
            function (header) {
                userId = header.headers["user-name"];
                console.log("User id: " + userId);
            }
        );        
    }
}

class WebSocket {
    constructor() {
        throw new Error('Use WebSocket.getClient()');
    }

    static getClient() {
        if (WebSocket.instance === undefined) {
            console.log("WEBSOCKET NEW CONNECTION");
            WebSocket.instance = new PrivateWebSocket();          
        }
        else{
            console.log("WEBSOCKET OLD CONNECTION");
        }
        return WebSocket.instance.client;
    }

    static getUserId(){return userId;}
}

export default WebSocket;