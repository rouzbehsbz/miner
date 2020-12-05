function socketHandler(server){
    
    const io = socketIo(server);
    io.adapter(ioRedis(config.redis_url));
    io.use((socket, next)=>{
        sessionMiddleware(socket.request, socket.request.res || {}, next);
    });

    let queue = [];
    let rooms = [];

    io.on('connection', (socket)=>{

        socket.on('init', ()=>{

            socket.username = socket.request.session.userInfo.username;
            socket.trophy = socket.request.session.userInfo.trophy;

        })

        socket.on('joinQueue', ()=>{

            if(!isUndefined(queue[Object.keys(queue)[0]])){

                let roomId = uniqid.time();
                let Osocket = queue[Object.keys(queue)[0]];

                socket.roomId = roomId;
                Osocket.roomId = roomId;
                socket.turn = 1;
                Osocket.turn = 2;

                socket.join(roomId);
                Osocket.join(roomId);

                rooms[roomId] = new GameController(roomId, socket, Osocket);

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

                delete queue[socket.id];
                delete queue[Osocket.id];

            }
            else{

                queue[socket.id] = socket;
                socket.emit('joinQueue');

            }
        
        });

        socket.on('selectCell', async(data)=>{

            let findRoom = await rooms[socket.roomId];
            
            if(findRoom.gameTurn == socket.turn){

                let newData = await findRoom.selectCell(data.row, data.col, socket.turn);

                if(newData){

                    io.in(socket.roomId).emit('selectCell', newData);

                    if(newData.status == 'end'){

                        findRoom.socket.leave(socket.roomId);
                        findRoom.Osocket.leave(socket.roomId);
                        delete rooms[socket.roomId];
                        findRoom.socket.roomId = null;
                        findRoom.Osocket.roomId = null;

                    }

                }

            }
            else{
                return;
            }

        });

        socket.on('leaveQueue', ()=>{
            
            delete queue[socket.id];
            socket.emit('leaveQueue');

        });

        socket.on('disconnect', async()=>{

            socket.to(socket.roomId).emit('oppLeft');

            if(socket.roomId){

                await userModel.findOneAndUpdate({username : socket.username}, {$inc : {trophy : -10}});

            }

            delete queue[socket.id];

        });

    });

}

module.exports = socketHandler;