import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { v4 as uuidv4 } from "uuid";

// Chat App Functionality
function Chat({ socket, username, room }) {
  const [currentMessage, SetCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [image, setImage] = useState(null);

  // Send Message Functionality
  const sendMessage = async () => {
    if (currentMessage !== "" || image) {
      const messageData = {
        id: uuidv4(),
        room: room,
        sender: username,
        message: currentMessage,
        image: image ? URL.createObjectURL(image) : null,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // Wait to send message
      await socket.emit("send_message", messageData);

      // Message list to be displayed in chat window
      setMessageList((list) => [...list, messageData]);

      // Set message and image to null so that it refreshes
      SetCurrentMessage("");
      setImage(null);
    }
  };

  // React useEffect to handle receive message
  useEffect(() => {
    const receiveMessageHandler = (message) => {
      setMessageList((list) => [...list, message]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  // Render chat window
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Room: {room}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.sender ? "sender" : "receiver"}
              >
                <div className="message-wrapper">
                  <div className="message-content" key={messageContent.id}>
                    {messageContent.image && (
                      <img src={messageContent.image} className="sent-image" alt=""/>
                    )}
                    {messageContent.message && <p>{messageContent.message}</p>}
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="sender">{messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input className="input-text"
          type="text"
          value={currentMessage}
          placeholder="Send your message..."
          onChange={(event) => {
            SetCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <input className="input-image"
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
