function socketHandler(server){
    
    const io = socketIo(server);
    io.adapter(ioRedis({host : 'localhost', port : 6379}));

    let queueList = [];

    io.on('connection', (socket)=>{

        socket.on('init', (data)=>{

            socket.username = data.username;
            socket.trophy = data.trophy;

        });

        socket.on('joinQueue', ()=>{

            if(!isUndefined(queueList[Object.keys(queueList)[0]])){

                let roomId = uniqid.time();
                let Osocket = queueList[Object.keys(queueList)[0]];

                socket.roomId = roomId;
                Osocket.roomId = roomId;

                socket.join(roomId);
                Osocket.join(roomId);

                io.in(roomId).emit('startGame');

                delete queueList[socket.id];
                delete queueList[Osocket.id];

            }
            else{

                queueList[socket.id] = socket;
                socket.emit('joinQueue');

            }
        
        });

        socket.on('leaveQueue', ()=>{
            
            delete queueList[socket.id];
            socket.emit('leaveQueue');

        });

        socket.on('disconnect', ()=>{

            socket.to(socket.roomId).emit('oppLeft');
            delete queueList[socket.id];

        });

    });

}

module.exports = socketHandler;