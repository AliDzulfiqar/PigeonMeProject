import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="app">
      {!showChat ? (
        <div className="main-page">
          <h1 className="create-room--header">PigeonMe!</h1>
          <div className="form-wrapper">
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
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
