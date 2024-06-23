import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownItem, Menu, Image } from 'semantic-ui-react';
import profilImg from "../images/profil.png";
export default function SignedIn({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/user-details', {
          withCredentials: true,
        });
        
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUnreadMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/messages/unread', {
          withCredentials: true,
        });
        setUnreadMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchUnreadMessages();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleInfoClick = () => {
    navigate(`/profile/${userInfo.id}`);
  };

  return (
    <div className='border rounded-md px-2 py-2 w-36 bg-slate-200 flex justify-center items-center'>
      <Menu.Item>
        {userInfo.profilePhoto ?  <Image avatar spaced="right" src={`data:image/jpeg;base64,${userInfo.profilePhoto}`} /> : <Image avatar spaced="right"  src= {profilImg} /> }
        
        <Dropdown pointing="top right text-bold" text={userInfo.username}>
          <DropdownMenu style={{ marginTop: '16px' }}>
            <DropdownItem onClick={handleInfoClick} text="Bilgilerim" icon="info" />
            <DropdownItem onClick={handleLogout} text="Çıkış Yap" icon="sign-out" />
            
          </DropdownMenu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
