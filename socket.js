const chartService = require('./BL/services/chart.service')
const generatorService = require('./BL/services/generator.service')

const socketFn =  (socket) => {
    console.log("connecting now:", socket.id);

    let userBySocket = [];

    const fetchGeneratorData = async () => {
        try {
          const data = await generatorService.readGenerator("6678464e815884d6e23a4542",true);
        //   console.log(data);
        } catch (error) {
          console.error('Error fetching generator data:', error);
        }
      };
    
      fetchGeneratorData()

    // socket.on('start-data', (data)=> {
    //     setInterval(async (data) =>  {
    //         const data = await chartService.getLastData(data)
    //         socket.emit('get-data', {message: data});
    //     }, 5000);
    // })

    socket.on('start-data', (data) => {
        const interval = setInterval(async () => {
          try {
            const fetchedData = await chartService.getLastData(data);
            socket.emit('get-data', { message: fetchedData });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }, 5000);
  
        // Cleanup function to clear the interval
        return () => clearInterval(interval);
      });

    

    socket.on('disconnect', () => {
        console.log(`disconnecting now: ${socket.id}`);
        // clearInterval(intervalId);

        // Remove the user from the array
        userBySocket = userBySocket.filter(user => user.socketId !== socket.id);
        // console.log(userBySocket.length);
    });

}

module.exports = socketFn