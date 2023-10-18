import React from 'react';

const Chat = (socket, username, room) => {
    return (
        <div>
            <div className="chat__header">
                <p>Chat Now!</p>
            </div>
            <div className="chat__body"></div>
            <div className="chat__footer">
                <input type="text" placeholder='Send your message...'/>
                <button>Send</button>    
            </div> 
        </div>
    );
};

export default Chat;