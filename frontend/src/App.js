
import './CSS/App.css';
import 'semantic-ui-css/semantic.min.css'
import Categories from './components/Categories';
import AnimalList from './components/AnimalList';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import { Route, Routes } from 'react-router-dom';
import Navi from './components/Navi';
import AnimalDetail from './components/AnimalDetail';
import Posts from './pages/Posts';
import AnimalForm from './pages/AnimalForm';
import UserPostDetail from './pages/UserPostDetail';
import PostEdit from './pages/PostEdit';
import { Container } from 'react-bootstrap';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

useEffect(() => {
  const authStatus = sessionStorage.getItem('isAuthenticated');
  /*const storedUserName = sessionStorage.getItem('userName');
  const storedUserId = sessionStorage.getItem('userId');*/
  if (authStatus === 'true') {
    setIsAuthenticated(true);
   // setUserName(storedUserName);
    //setUserId(storedUserId);
  }
}, []);

  return (
    <div className="App h-screen  ">   
      <Navi isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userId={userId} userName={userName} setUserName={setUserName}/>
     <div className=' bg-slate-200 h-full' style={{marginTop: "2.50rem", paddingTop:"30px", height:"100%"}}>
        <Routes>

              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}  />} />
                
              <Route path="/animals/add/:userId" element={<AnimalForm userId={userId} />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/home/:userId" element={<Dashboard />} />
              <Route path="/posts/:userId" element={<Posts/>} />

              <Route path="/animals" element={<AnimalList />} />
              <Route path="/animal/post/detail/:animalId" element={<AnimalDetail isAuthenticated={isAuthenticated} />} />
              <Route path="/post-detail/:animalId" element={<UserPostDetail/>} />
              <Route path="/post-edit/:animalId" element={<PostEdit/>} />
              <Route path="/profile/:userId" element={<UserProfile setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>      
     
    </div>
  );
}

export default App;
