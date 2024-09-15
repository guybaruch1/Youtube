const net = require('net');

// Function to send a message to the C++ server and return recommendations
function sendToCppServer(message, callback) {
  const client = new net.Socket();
  
  // Connect to the C++ server (assuming it's running on localhost and port 5555)
  client.connect(5555, '127.0.0.1', () => {
    console.log('Connected to C++ server');
    client.write(message);  // Send the message
  });

  // Handle data received from the C++ server (response, e.g., recommendations)
  client.on('data', (data) => {
    console.log('Received from C++ server:', data.toString());

    // Call the callback with the recommendations data
    callback(data.toString());
    client.destroy();  // Close connection after receiving data
  });

  // Handle client closing the connection
  client.on('close', () => {
    console.log('Connection to C++ server closed');
  });

  // Handle errors
  client.on('error', (err) => {
    console.error('Error connecting to C++ server:', err.message);
  });
}

module.exports = { sendToCppServer };
