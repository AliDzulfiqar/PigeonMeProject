import React, { useEffect, useState } from 'react';

function Chat({socket, username, room}) {
    const [currentMessage, SetCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                sender: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
        };
    }
    
    useEffect(()=>{
        socket.on("receive_message", (message) => {
            console.log(message);
        })
    }, [socket])

    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>Chat Now!</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input type="text" placeholder='Send your message...' onChange={(event) => {
                    SetCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>Send</button>    
            </div> 
        </div>
    );
};

export default Chat;