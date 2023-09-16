const net = require('net');
const businessLogic = require('./BusinessLogic');

const server = net.createServer((socket) => {
  socket.on('data', (message) => {
    const symbol = message.slice(0,4).toString();
    const nullTerminator = message.indexOf(0);
    const company = message.slice(4, nullTerminator).toString();
    const quantity = message.slice(nullTerminator+1, nullTerminator+5).readInt32BE();
    const result = businessLogic.processMessage(symbol, company, quantity);
    let respose;
    if (result == -1)
        respose = "Price: ERROR NOT KNOWN";
    else
        respose = "Price: "+ result.toString();
    socket.write(respose);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
