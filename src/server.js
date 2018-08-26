const
    http = require('http').createServer(),
    io = require('socket.io')(http),
    messageFormatter = require('./server/message/message-manager');

io.on('connection', (socket) => {
    console.log(`${socket.id} is connected`);

    socket.broadcast.emit('message', messageFormatter.toClientMessage({message: 'Anonymous User Connected'}));

    socket.on('message', (res, cb) => {
        console.log(res);
        cb();
        socket.to(res.roomId).emit('message', messageFormatter.toClientMessage(res));
    });

    socket.on('join', (res, cb) => {
        socket.join(res.roomId);
        console.log(`${socket.id} is join in ${res.roomId}`);
        if (cb) {
            cb(res.roomId);
        }
    });

    socket.on('leave', (res, cb) => {
        socket.leave(res.roomId);
        console.log(`${socket.id} is leave in ${res.roomId}`);
        console.log(res);
        if (cb) {
            cb();
        }
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} is disconnect`);
    });
});

http.listen(3000);