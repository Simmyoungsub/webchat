const toClientMessage = ((param) => {
    const obj = {
        status: true,
        result: {
            message: param.message
        }
    };

    return obj;
});

const message = ((param) => {
    const message = param.message;
    const roomId = param.roomId;

    return {roomId, message};
});

const Room = ((param) => {
    const roomId = param.roomId;
    const roomName = param.roomName;
    const regDate = param.regDate;

    return {roomId, roomName, regDate};
});

module.exports = {
    message,
    toClientMessage
};