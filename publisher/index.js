import amqp from "amqplib";
import dayjs from "dayjs";

import { generateRandomNumber } from "./utils/random.number.generator.js";
import { generateSentence } from "./utils/random.txt.generator.js";

const publish = async () => {
  try {
    // connect amqp  server
    const connection = await amqp.connect("amqp://rabbitmq");
    // const connection = await amqp.connect("amqp://localhost");//for local setup

    const channel = await connection.createChannel();
    const queue = "test";

    setInterval(() => {
      const message = {
        message: generateSentence(1),
        timestamp: dayjs().toISOString(),
        priority: generateRandomNumber(),
      };

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }, 50); //1000/50=20 messages per second
  } catch (error) {
    console.log(error.message);
    setTimeout(publish, 5000); // retry after 5 seconds
  }

  process.on("SIGINT", () => {
    connection.close();
    process.exit();
  });
};

publish();
