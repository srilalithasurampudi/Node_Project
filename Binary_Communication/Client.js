const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.connect(8080, 'localhost', () => {
    console.log('Connected to server');
    rl.question('Enter Company:', (company) => {
        rl.question('Enter Symbol: ', (symbol) => {
            rl.question('Enter Num Ordered: ', (numOrdered) => {
                const binaryMessage = constructBinaryMessage(symbol, company, numOrdered);
                client.write(binaryMessage);
                rl.close();
            });
        });
    });
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('close', () => {
  console.log('Connection closed');
});

function constructBinaryMessage(symbol, company, numOrdered) {
    if (symbol.length > 4) {
        symbol = symbol.substring(0, 4);
    } else if (symbol.length < 4) {
        symbol = symbol.padEnd(4);
    }
    const messageLength = 4 + Buffer.from(company, 'utf8').length + 1 + 4;
    const binaryMessage = Buffer.alloc(messageLength);
    binaryMessage.write(symbol, 0, 'utf8');
    binaryMessage.write(company, 4, 'utf8');
    binaryMessage.writeUInt8(0, 4 + Buffer.from(company, 'utf8').length);
    binaryMessage.writeInt32BE(numOrdered, 4 + Buffer.from(company, 'utf8').length + 1);
    return binaryMessage;
}
