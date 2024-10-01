import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';  // Import the MainLayout component
import 'bootstrap/dist/css/bootstrap.min.css';

import Conversation from './pages/Conversation';
import AddFriend from './pages/AddFriend';
import Blocked from './pages/Blocked';
import Pending from './pages/Pending';
import AllFriends from './pages/AllFriends';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import Groupchats from './pages/Groupchats';
import GroupChatConversation from './pages/GroupChatConversation';

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
        {/* Define the layout route */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          {/* Nested routes will use the MainLayout with Sidebar and Topbar */}
          <Route path="conversation/:friendId/:friendName" element={<Conversation />} />
          <Route path="/group/conversation/:groupChatId/:groupChatName" element={<GroupChatConversation />} />

          <Route path="add/friend" element={<AddFriend />} />
          <Route path="blocked" element={<Blocked />} />
          <Route path="pending" element={<Pending />} />
          <Route path="all/friends" element={<AllFriends />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/group/chat" element={<Groupchats />} />
          
        </Route>

        {/* Routes without the layout (e.g., login and signup) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
