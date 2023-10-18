import React, { useState } from 'react';

const Chat = (socket, username, room) => {
    const [currentMessage, SetCurrentMessage] = useState("");
    const sendMessage = async () =>{
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                sender: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
        }
    }

    return (
        <div>
            <div className="chat__header">
                <p>Chat Now!</p>
            </div>
            <div className="chat__body"></div>
            <div className="chat__footer">
                <input type="text" placeholder='Send your message...' onChange={(event) => {
                    SetCurrentMessage(event.target.value);
                }}/>
                <button>Send</button>    
            </div> 
        </div>
    );
};

export default Chat;