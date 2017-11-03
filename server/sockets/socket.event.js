const ioEvent = (io) => {
    console.log('Init Event');
    io.on('connection', (socket) => {
    	socket.on('private message', (data) => {
    		console.log(data);
    	});	
    });
};


export default ioEvent;
