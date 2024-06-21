import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, InputGroup, FormControl, Spinner} from 'react-bootstrap';
import '../CSS/Messages.css'; 
import profilImg from "../images/profil.png";
export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/api/users/user-details', {
          withCredentials: true,
        });
        const userInfo = userResponse.data;
        setUserInfo(userInfo);

        const response = await axios.get('http://localhost:8080/api/messages/conversations', {
          withCredentials: true,
        });
        const fetchedConversations = await Promise.all(
          response.data.map(async (conversation) => {
            const otherUserId = conversation.senderId === userInfo.id ? conversation.receiverId : conversation.senderId;
            const otherUserResponse = await axios.get(`http://localhost:8080/api/users/${otherUserId}`, {
              withCredentials: true,
            });

            // Fetch the last message for each conversation
            const lastMessageResponse = await axios.get(`http://localhost:8080/api/messages/last/${conversation.senderId}/${conversation.receiverId}`, {
              withCredentials: true,
            });

            return {
              ...conversation,
              otherUsername: otherUserResponse.data.username,
              otherUserProfilePhoto: otherUserResponse.data.profilePhoto,
              otherUserId: otherUserId,
              lastMessage: lastMessageResponse.data.content,
              lastMessageDate: lastMessageResponse.data.sentAt,
            };
          })
        );

        // Remove duplicate conversations with the same user
        const uniqueConversations = fetchedConversations.filter((conversation, index, self) => 
          index === self.findIndex((c) => (
            c.otherUserId === conversation.otherUserId
          ))
        );

        setConversations(uniqueConversations);
      } catch (error) {
        console.error('Konuşmalar alınırken hata oluştu:', error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        setLoadingMessages(true);
        try {
          await axios.post(`http://localhost:8080/api/messages/read/conversation/${selectedConversation.senderId}/${selectedConversation.receiverId}`, {}, {
            withCredentials: true,
          });
          const response = await axios.get(`http://localhost:8080/api/messages/conversation/${selectedConversation.senderId}/${selectedConversation.receiverId}`, {
            withCredentials: true,
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Mesajlar alınırken hata oluştu:', error);
        } finally {
          setLoadingMessages(false);
        }
      };

      fetchMessages();
    }
  }, [selectedConversation]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    try {
      const messageDto = {
        senderId: userInfo.id,
        receiverId: selectedConversation.otherUserId,
        content: newMessage,
        sentAt: new Date(),
        readAt: null,
      };

      const response = await axios.post('http://localhost:8080/api/messages/send', messageDto, {
        withCredentials: true,
      });

      setMessages([...messages, response.data]);
      setNewMessage('');

      // Update the last message in the conversations list
      setConversations(conversations.map(convo => {
        if (convo.otherUserId === selectedConversation.otherUserId) {
          return { ...convo, lastMessage: response.data.content, lastMessageDate: response.data.sentAt };
        }
        return convo;
      }));

    } catch (error) {
      console.error('Mesaj gönderilirken hata oluştu:', error);
    }
  };

  const handleDeleteConversation = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/messages/conversation/${selectedConversation.senderId}/${selectedConversation.receiverId}`, {
        withCredentials: true,
      });
      setConversations(conversations.filter(convo => convo.otherUserId !== selectedConversation.otherUserId));
      setSelectedConversation(null);
      setMessages([]);
    } catch (error) {
      console.error('Konuşma silinirken hata oluştu:', error);
    }
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.otherUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wrapper">
      <div className="message-container">
        <div className="left">
          <div className="top">
            <input
              type="text"
              placeholder="Ara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search" onClick={() => { /* Arama işlevi buraya eklenebilir */ }}></button>
          </div>
          <ul className="people">
            {filteredConversations.map((conversation, index) => (
              <li
                key={index}
                className={`person ${selectedConversation?.otherUserId === conversation.otherUserId ? 'active' : ''}`}
                data-chat={`person${index}`}
                onClick={() => handleConversationClick(conversation)}
              >
                {conversation.otherUserProfilePhoto ? <img alt="profil photo"  src={`data:image/jpeg;base64,${conversation.otherUserProfilePhoto}` } /> : <img src={profilImg} alt="profil photo" /> }
                
                <span className="name mr-2"><strong>{conversation.otherUsername}:</strong></span>
                <span className="preview">{conversation.lastMessage.length > 30 ? `${conversation.lastMessage.substring(0, 30)}...` : conversation.lastMessage}</span>
                <span className="time">{new Date(conversation.lastMessageDate).toLocaleString()}</span>
                
              </li>
            ))}
          </ul>
        </div>
        <div className="right">
          {selectedConversation && (
            <>
              <div className="top">
                <span>To: <span className="name">{selectedConversation.otherUsername}</span></span>
                <Button className='ml-4' variant="danger" onClick={handleDeleteConversation}>Sohbeti Sil</Button>
              </div>
              <div className="chat active-chat">
                {loadingMessages ? (
                  <Spinner animation="border" />
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={`bubble ${message.senderId === userInfo.id ? 'me' : 'you'}`}>
                      {message.content}
                    </div>
                  ))
                )}
              </div>
              <div className="write">
                <InputGroup>
                  <FormControl
                    placeholder="Yeni mesaj..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" onClick={handleSendMessage} className="write-link send"></Button>
                </InputGroup>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
