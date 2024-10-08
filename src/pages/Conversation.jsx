import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { IoMdSend } from "react-icons/io";
import { FaSmile, FaFrown, FaLaugh } from "react-icons/fa";  // Icons for reactions

function Conversation() {
  const { friendId, friendName } = useParams(); // Get both friendId and friendName
  const [messages, setMessages] = useState([]); // State for messages
  const [newMessage, setNewMessage] = useState(""); // Initialize the message input

  // Poll for new messages at regular intervals (e.g., every 5 seconds)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/conversation/get-messages', {
          friendId: friendId
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });

        setMessages(response.data); // Set the messages in the state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Call fetchMessages once when the component mounts
    fetchMessages();

    // Set up polling (fetch every 5 seconds)
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000); // Poll every 5 seconds

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [friendId]);

  // Function to handle sending the new message
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    if (newMessage.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    try {
      // Send the message to the backend
      const response = await axios.post('http://localhost:8000/api/conversation/send-message', {
        content: newMessage,
        friendId: friendId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Attach the auth token
        }
      });

      // Add the new message to the messages state immediately
      const sentMessage = {
        content: newMessage,
        sender_id: localStorage.getItem('auth_user_id'),  // Assuming the auth user ID is stored here
        is_auth_user: true, // Mark this as sent by the current user
        created_at: new Date(),  // Add timestamp
        reactions: []  // Reactions are initially empty
      };

      setMessages([...messages, sentMessage]);

      // Clear the message input after successful submission
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle reacting to a message
  function handleReactToMessage(messageId, emoji) {
    axios.post('http://localhost:8000/api/message/react', {
      message_id: messageId,
      emoji: emoji
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    .then(response => {
      console.log("Reaction added:", response.data);
    })
    .catch(error => {
      console.error("Error adding reaction:", error);
    });
  }

  return (
    <>
     
      <div style={{ display: 'flex' }}>
    

        {/* Main Content */}
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div className='card shadow-lg border-0 mb-2' style={{ backgroundColor: '#36393F' }}>
            <div className='card-body'>
              <span className='fs-5 fw-semibold text-white'>{friendName}</span>
            </div>
          </div>

          {/* Messages section */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px', marginBottom: '20px' }}>
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`d-flex ${message.is_auth_user ? 'justify-content-end' : 'justify-content-start'}`}>
                  {!message.is_auth_user && (
                    <img
                      src={message.sender?.avatar}
                      alt="Friend's avatar"
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px' }}
                    />
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '60%', marginBottom: '10px' }}>
                    {/* Message content */}
                    <div className={`p-2 rounded-4 ${message.is_auth_user ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                      {message.content}
                    </div>

                    {/* Reactions Display (Only on friend's messages) */}
                    {!message.is_auth_user && message.reactions && message.reactions.length > 0 && (
                      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                        {message.reactions.map((reaction, i) => (
                          <span key={i} style={{ fontSize: '18px' }}>{reaction.emoji}</span>
                        ))}
                      </div>
                    )}

                    {/* Reaction buttons underneath message */}
                    {!message.is_auth_user && (
                      <div className="d-flex justify-content-start mt-2">
                        <button className="btn border-0 shadow-sm rounded-5" onClick={() => handleReactToMessage(message.id, 'Laugh')}>
                          <FaLaugh size={15} className="text-white" />
                        </button>
                        <button className="btn border-0 shadow-sm rounded-5" onClick={() => handleReactToMessage(message.id, 'Sad')}>
                          <FaFrown size={15} className="text-white" />
                        </button>
                        <button className="btn border-0 shadow-sm rounded-5" onClick={() => handleReactToMessage(message.id, 'Like')}>
                          <FaSmile size={15} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

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

export default Conversation;
