const messageManager = require('./server/message/message-manager');
const chatManager = require('./server/chat-manager');

let socket = null;

const run = (() => {
    socket = require('socket.io-client')('http://localhost:3000');

    if (!socket) {
        throw Error('Socket is Invalid');
    }

    socket.on('message', (res) => {
        chatManager.updateMessageContainer(res.result);
    });
});

const sendMessage = ((res) => {
    socket.emit('message', messageManager.message(res), (() => {
        chatManager.updateMessageContainer(res);
    }));
});

const join = ((param, callback) => {
    if (param) {
        console.log(param);
        socket.emit('join', {
            roomId: param.roomId
        }, callback);
    }
});

const leave = ((param) => {
    if (param) {
        socket.emit('leave', {
            roomId: param.roomId, cb: param.cb
        });
    }
});

module.exports = {run, sendMessage, join, leave};