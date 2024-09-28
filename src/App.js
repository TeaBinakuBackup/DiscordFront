import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'
import 'bootstrap/dist/css/bootstrap.min.css';

import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import Conversation from './pages/Conversation'
import AddFriend from './pages/AddFriend'
import Blocked from './pages/Blocked'
import Pending from './pages/Pending'
import AllFriends from './pages/AllFriends'
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import Profile from './pages/Profile'
import MoodStatus from './components/MoodStatus'


function App() {

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token'); // Get the token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );  
  return (
    
    <Router>
   
      <Routes>
        {/* <Route path="/" element={<Main/>} /> */}
        <Route path="/sidebar" element={<SideBar/>} />
        <Route path="/topbar" element={<TopBar/>} />
        <Route path="/conversation" element={<Conversation/>} />
        {/* <Route path="/add/friend" element={<AddFriend/>} /> */}
        {/* <Route path="/blocked" element={<Blocked/>} /> */}
        <Route path="/blocked" element={ <ProtectedRoute><Blocked />  </ProtectedRoute>} />
        <Route path="/add/friend" element={ <ProtectedRoute><AddFriend />  </ProtectedRoute>} />
        <Route path="pending" element={ <ProtectedRoute><Pending />  </ProtectedRoute>} />
        <Route path="/conversation" element={ <ProtectedRoute><Conversation />  </ProtectedRoute>} />
        <Route path="/all/friends" element={ <ProtectedRoute><AllFriends />  </ProtectedRoute>} />
        <Route path="/profile"  element={ <ProtectedRoute><Profile />  </ProtectedRoute>} />

        {/* <Route path="/pending" element={<Pending/>} /> */}
        {/* <Route path="/all/friends" element={<AllFriends/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

      </Routes>
    </Router>
  );
}


export default App;
