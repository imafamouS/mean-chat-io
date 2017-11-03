import SocketIO from 'socket.io';
import SocketEvent from './socket.event';

export default function(app){
	let io  = SocketIO(4000);
	console.log('Init socket');
	SocketEvent(io);
}