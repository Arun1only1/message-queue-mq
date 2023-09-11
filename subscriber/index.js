import amqp from "amqplib";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "node:http";

// express app
const app = express();

// to make sure that the body is parsed as json
app.use(express.json());

// to make sure no cors errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).json({});
  }

  return next();
});

// test api
app.get("/", (req, res) => {
  return res.send("Hello World");
});

// port
const port = 8000;

// app server
const server = createServer(app);

// socket io server
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// subscribe to rabbit mq server
const subscribe = async () => {
  try {
    // rabbit mq server
    const connection = await amqp.connect("amqp://rabbitmq");
    // const connection = await amqp.connect("amqp://localhost");//local setup

    const channel = await connection.createChannel();
    const queue = "test";

    await channel.assertQueue(queue);

    channel.consume(queue, (message) => {
      if (message) {
        const parsedMessage = JSON.parse(message.content.toString());

        // filter message with priority >= 7 and emit them to socket
        if (parsedMessage.priority >= 7) {
          io.emit("message", parsedMessage);
        }

        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(subscribe, 5000); // retry after 5 seconds
  }

  process.on("SIGINT", () => {
    connection.close();
    process.exit();
  });
};

subscribe();

// start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
