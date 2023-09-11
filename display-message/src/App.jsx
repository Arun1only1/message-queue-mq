import { Box, Stack, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const socket = io("http://localhost:8000");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const pushMessage = (message) => {
      if (messages.length >= 7) {
        setMessages([...messages.slice(1), message]);
      } else {
        setMessages([...messages, message]);
      }
    };

    socket.on("message", pushMessage);

    return () => {
      socket.disconnect();
    };
  }, [messages]);
  return (
    <Box
      sx={{
        padding: "2rem",
        minWidth: "40vw",
        borderRadius: "10px",
        minHeight: "60vh",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Stack
        sx={{
          padding: "1rem",
          color: "grey",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Typography variant="h6" sx={{ color: "green" }}>
          Message
        </Typography>
        <Typography variant="h6" sx={{ color: "green" }}>
          Priority
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="column">
        {messages.map((item, index) => {
          return (
            <Stack
              key={index}
              sx={{
                padding: "1rem",
                color: "grey",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Typography variant="h6" sx={{ padding: "5px" }}>
                {item.message}
              </Typography>
              <Typography variant="h6" sx={{ padding: "5px" }}>
                {item.priority}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}

export default App;
