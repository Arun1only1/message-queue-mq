# High-Volume Data Input Simulation

This project simulates a high-volume data input environment using various technologies, including a message queue, Node.js for backend services, React.js for the frontend, and Docker for containerization.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [Architecture and Design](#architecture-and-design)

## Overview

The objective of this project is to create a system that generates and processes high volumes of random messages. These messages are published to a message queue and then filtered and sent to a React.js frontend application via Socket.IO for display. There are two backend services: publisher and subscriber. Publisher publishes 20 messages per second and adds them to rabbit mq queue. Subscriber consumes messages from queue and emits the messages with priority greater than or equals to 7 to the display-message app where message is displayed on browser.

## Technologies

The project leverages the following technologies:

- Message Queue: [RabbitMQ](https://www.rabbitmq.com/)
- Backend: Node.js
- Frontend: React.js
- Containerization: Docker

## Installation

To run this project locally, follow these steps:

1. Clone this repository

2. Run `docker compose build` command on the terminal in project directory where docker-compose.yml file is present.

3. Run `docker compose up` command on the terminal in project directory where docker-compose.yml file is present.

4. Access the application in your web browser at `http://localhost:3000`

## Architecture and Design

![design](https://res.cloudinary.com/dlkcko4n6/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1694408372/message%20broker/yscjdjsn9gk3caag7qxk.jpg?_s=public-apps)

The project consists of the following components:

- **Message Queue**: This is where random messages are published.

- **Node.js Backend (Publisher)**: Publishes random messages to the message queue at a rate of 20 messages per second.

- **Node.js Backend (Subscriber)**: Subscribes to the message queue, filters messages with a priority of 7 or higher, and sends them to the frontend via Socket.IO.

- **React.js Frontend**: Receives messages via Socket.IO and displays them in the user interface.
