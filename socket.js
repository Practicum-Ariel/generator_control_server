const chartService = require('./BL/services/chart.service')
const generatorService = require('./BL/services/generator.service')

let userBySocket = [];

let sockets = {}

const socketFn = (socket) => {
    console.log("connecting now:", socket.id);

    socket.on('start-data', (data) => {
        const interval = setInterval(async () => {
            try {
                const fetchedData = await chartService.getLastData(data);
                // console.log(fetchedData);
                socket.emit('get-data', { message: fetchedData });
                console.log("send");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 5000);

        sockets[socket.id] = interval
    });

    socket.on('disconnect', () => {
        console.log(`disconnecting now: ${socket.id}`);
        clearInterval(sockets[socket.id]);
        delete sockets[socket.id]
    });

}

module.exports = socketFn