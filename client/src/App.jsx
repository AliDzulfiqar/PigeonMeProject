import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Join Chat</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
