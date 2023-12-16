import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat(props) {
    const { socket } = props;
    const { userName } = props;
    const { room } = props;

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                sender: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData])
        };
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data])
        })
    }, [socket])


    return (
        <>
        <div className='chatBox'>
            <div className='chat-header'>
                <p>REACT Chat</p>
            </div>
                <div className='chat-body scroll'>
                    {messageList.map((messageContent, idx) => {
                        return (
                            <div className='message-content' id={userName === messageContent.sender ? "you" : "other"}>
                                <p key={idx}>{messageContent.message}</p>
                            </div>
                        )
                    })}
                </div>
            <div className='chat-footer'>
                <input className="message" type="text" placeholder="Write your message here..." onChange={(e) => {
                    setCurrentMessage(e.target.value)
                }}
                onKeyDown={(e) => {
                    e.key === "Enter" && sendMessage();
                }}
                />
                <button className="sendBtn" onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
        </>
    )
}

export default Chat