import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import { FaSmile, FaFrown, FaLaugh } from "react-icons/fa";  // Icons for reactions

function GroupChatConversation() {
    const { groupChatId, groupChatName } = useParams(); // Get groupChatId and groupChatName from URL

    useEffect(() => {
      console.log("Group Chat ID:", groupChatId);
      console.log("Group Chat Name:", groupChatName);
    }, [groupChatId, groupChatName]);


    const [messages, setMessages] = useState([]); // State for messages
  const [newMessage, setNewMessage] = useState(""); // State for new message input
  const [loading, setLoading] = useState(true); // Loading state for messages

  // Fetch group chat messages on component mount and at regular intervals (polling)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get/group-chat-messages/${groupChatId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        setMessages(response.data); // Set fetched messages to state
        setLoading(false); // Stop loading after messages are fetched
      } catch (error) {
        console.error("Error fetching group chat messages:", error);
      }
    };

    fetchMessages();

    // Set up polling to fetch new messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [groupChatId]);

  // Handle sending a new message
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/send/group-chat-message', {
        content: newMessage,
        group_chat_id: groupChatId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      // Add the new message to the state immediately after sending
      const sentMessage = {
        content: newMessage,
        sender_id: localStorage.getItem('auth_user_id'),  // Assuming auth user ID is stored in localStorage
        is_auth_user: true, // Mark this as sent by the current user
        created_at: new Date(),  // Timestamp
        reactions: []  // No reactions yet
      };

      setMessages([...messages, sentMessage]);
      setNewMessage(""); // Clear input field after message is sent
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle reacting to a message
  const handleReactToMessage = async (messageId, emoji) => {
    try {
      await axios.post('http://localhost:8000/api/message/react', {
        message_id: messageId,
        emoji: emoji
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Group Chat Header */}
          <div className='card shadow-lg border-0 mb-2' style={{ backgroundColor: '#36393F' }}>
            <div className='card-body'>
              <span className='fs-5 fw-semibold text-white'>{groupChatName}</span>
            </div>
          </div>

          {/* Messages Section */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px', marginBottom: '20px' }}>
            {loading ? (
              <p>Loading messages...</p>
            ) : (
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={`d-flex ${message.is_auth_user ? 'justify-content-end' : 'justify-content-start'}`}>
                    {!message.is_auth_user && (
                      <img
                        src={message.sender?.avatar}
                        alt="User avatar"
                        className="rounded-circle me-2"
                        style={{ width: '40px', height: '40px' }}
                      />
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '60%', marginBottom: '10px' }}>
                      {/* Message content */}
                      <div className={`p-2 rounded-4 ${message.is_auth_user ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                        {message.content}
                      </div>

                      {/* Reactions Display */}
                      {!message.is_auth_user && message.reactions && message.reactions.length > 0 && (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                          {message.reactions.map((reaction, i) => (
                            <span key={i} style={{ fontSize: '18px' }}>{reaction.emoji}</span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form to send a new message */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', position: 'sticky', bottom: 0 }}>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Send a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ backgroundColor: '#585858', color: 'white', flexGrow: 1, marginRight: '10px' }}
            />
            <button type="submit" className="btn rounded-5 border-0 shadow-lg" style={{ width: '50px' }}>
              <IoMdSend className='text-white' />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default GroupChatConversation;
