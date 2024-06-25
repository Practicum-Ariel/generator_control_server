const socketFn =  (socket) => {
    console.log("connecting now:", socket.id);

    let userBySocket = [];

    const intervalId = setInterval(() => {
        socket.emit('get-data', { message: 'Data from server every 5 seconds' });
    }, 5000);

    

    socket.on('disconnect', () => {
        console.log(`disconnecting now: ${socket.id}`);
        clearInterval(intervalId);

        // Remove the user from the array
        userBySocket = userBySocket.filter(user => user.socketId !== socket.id);
        // console.log(userBySocket.length);
    });

}

module.exports = socketFn