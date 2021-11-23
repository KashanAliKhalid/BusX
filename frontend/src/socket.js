import socketIOClient from "socket.io-client";
let socket;

socket = socketIOClient('http://localhost:3000/');

export {socket}
