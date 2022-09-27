const amqplib = require('amqplib/callback_api');

const queue = 'user Register';

//Sender 
export const sender = (data) => amqplib.connect('amqp://localhost', (error, connection) => {

  if (error) throw error;
  connection.createChannel((error, channel1) => {
    if (error) throw error;
    channel1.assertQueue(queue);
    channel1.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log(`Sending Message : ${data}`);
  });
});


//Receiver 
const receiver = () => amqplib.connect('amqp://localhost', (error, connection) => {

  if (error) throw error;
  connection.createChannel((error, channel2) => {
    if (error) throw error;

    channel2.assertQueue(queue);
    channel2.consume(queue, (data) => {

      if (data !== null) {
        const msg = (data.content);
       
        console.log("receiver--------", JSON.parse(msg));
        
        channel2.ack(data);

      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });
}); 
receiver();