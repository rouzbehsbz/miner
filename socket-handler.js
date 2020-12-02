function socketHandler(server){
    
    const io = socketIo(server);
    io.adapter(ioRedis({host : 'localhost', port : 6379}));

    let queueList = [];
    let rooms = [];

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
                socket.turn = 1;
                Osocket.turn = 2;

                socket.join(roomId);
                Osocket.join(roomId);

                rooms[roomId] = new GameController(roomId, socket.username, Osocket.username, socket.trophy, Osocket.trophy);

                io.in(roomId).emit('startGame', {
                    '1' : {
                        username : socket.username,
                        trophy : socket.trophy
                    },
                    '2' : {
                        username : Osocket.username,
                        trophy : Osocket.trophy
                    },
                    'initGame' : {
                        col : rooms[roomId].setting.col,
                        row : rooms[roomId].setting.row,
                        boardData : rooms[roomId].boardData
                    }
                });

                delete queueList[socket.id];
                delete queueList[Osocket.id];

            }
            else{

                queueList[socket.id] = socket;
                socket.emit('joinQueue');

            }
        
        });

        socket.on('selectCell', async(data)=>{

            let findRoom = rooms[socket.roomId];
            
            if(findRoom.gameTurn == socket.turn){

                let newData = await findRoom.selectCell(data.row, data.col, socket.turn);
                log(newData);
                if(newData){

                    io.in(socket.roomId).emit('selectCell', newData);

                }

            }
            else{
                return;
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

        socket.on('reconnect', ()=>{
            console.log('reconnect fired!');
        });

    });

}

module.exports = socketHandler;