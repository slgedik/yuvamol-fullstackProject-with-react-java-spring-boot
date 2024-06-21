import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, DropdownMenu, DropdownItem} from 'semantic-ui-react';
export default function MessagesButton() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/messages/unread', {
          withCredentials: true,
        });

        

        const fetchedMessages = await Promise.all(
          response.data.map(async (message) => {
            const userResponse = await axios.get(`http://localhost:8080/api/users/${message.senderId}`, {
              withCredentials: true,
            });
            return {
              ...message,
              senderUsername: userResponse.data.username,
              senderProfilePhoto: userResponse.data.profilePhoto,
            };
          })
        );
        setMessages(fetchedMessages);
        setUnreadCount(response.data.length);
      } catch (error) {
        console.error('Mesajları çekme hatası:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleReadMessage = async (messageId) => {
    try {
      await axios.post(`http://localhost:8080/api/messages/read/${messageId}`, {}, {
        withCredentials: true,
      });
      setMessages(messages.filter(message => message.id !== messageId));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Mesaj okundu olarak işaretlenemedi:', error);
    }
  };

  return (
    <div className='mx-2 my-2'>
     
        <Dropdown pointing="top right rounded-md px-2 py-2 w-32 text-bold bg-primary text-white mr-2 " text= {`Mesajlar (${unreadCount}) `}>
          <DropdownMenu style={{ marginTop: '16px' }}>
          {messages.map((message, index) => (
            <DropdownItem key={index} as={NavLink} to={`/messages`} onClick={() => handleReadMessage(message.id)}>
              <div className="card">
                <div className="card-body">
                  <div className="feed">
                    <div className="feed-event">
                      <div className="feed-label flex items-center">
                        <img src={`data:image/jpeg;base64,${message.senderProfilePhoto}`} alt="Sender" className="rounded-circle" width="40" height="40" />
                        <strong className='ml-4'>{message.senderUsername}:</strong> 
                      </div>
                      <div className="feed-content">
                        <div className="feed-summary">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownItem>
          ))}
          
            <Dropdown.Divider />
            
              <DropdownItem  as={NavLink} to="/messages">Tüm mesajlar</DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
    

    </div>
  );
}
