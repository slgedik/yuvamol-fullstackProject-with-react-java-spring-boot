import React from 'react';
import { Button, MenuItem } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function SignedOut() {
  const navigate = useNavigate();

  function handleSignUpButton() {
    navigate("/register");
  }

  function handleLoginButton() {
    navigate("/login");
  }

  return (
    <div className='mr-8'>
      <MenuItem>
        <Button primary onClick={handleLoginButton}>Giriş Yap</Button>
        <Button primary style={{ marginLeft: "0.5em" }} onClick={handleSignUpButton}>Kayıt Ol</Button>
      </MenuItem>
    </div>
  );
}
