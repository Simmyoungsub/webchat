const socketManager = require('./socket-manager');
const roomManager = require('./room-manager');

const run = (() => {
    socketManager.run();
    roomManager.run();

    const messageDom = document.getElementById('message');
    const room1Dom = document.getElementById('room1');
    const room2Dom = document.getElementById('room2');
    const leave1Dom = document.getElementById('leave1');
    const leave2Dom = document.getElementById('leave2');
    const joinHandler = function(room) {
        roomId = room;
    };
    let roomId = null;
    const clearRoom = (() => {
        roomId = null;
    });

    room1Dom.addEventListener('click', () => {
        socketManager.join({
            roomId: 'room1'
        }, joinHandler);
    });

    room2Dom.addEventListener('click', () => {
        socketManager.join({
            roomId: 'room2'
        }, joinHandler);
    });

    leave1Dom.addEventListener('click', () => {
        socketManager.leave({roomId, callback: clearRoom});
    });

    leave2Dom.addEventListener('click', () => {
        socketManager.leave({roomId, callback: clearRoom});
    });

    document.getElementById('send').addEventListener('click', () => {
        if (roomId) {
            const message = messageDom.value;
            socketManager.sendMessage({roomId, message});
        }else {
            alert('please select room');
        }
    });
});

run();