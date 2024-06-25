const chartService = require('./BL/services/chart.service')

const socketFn =  (socket) => {
    console.log("connecting now:", socket.id);

    let userBySocket = [];

    socket.on('start-data', ()=> {
        setInterval(async () =>  {
            const data = await chartService.getLastData("6678464e815884d6e23a4542")
            socket.emit('get-data', {message: data});
        }, 5000);
    })

    

    socket.on('disconnect', () => {
        console.log(`disconnecting now: ${socket.id}`);
        // clearInterval(intervalId);

        // Remove the user from the array
        userBySocket = userBySocket.filter(user => user.socketId !== socket.id);
        // console.log(userBySocket.length);
    });

}

module.exports = socketFn