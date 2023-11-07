import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { v4 as uuidv4 } from "uuid";

function Chat({ socket, username, room }) {
  const [currentMessage, SetCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [image, setImage] = useState(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
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

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      SetCurrentMessage("");
      setImage(null);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat Now!</p>
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
                      <img
                        src={messageContent.image}
                        alt="Sent Image"
                        className="sent-image"
                      />
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
        <input
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
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
