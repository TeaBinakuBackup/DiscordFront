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
function App() {


  return (
    <Router>
   
      <Routes>
        {/* <Route path="/" element={<Main/>} /> */}
        <Route path="/sidebar" element={<SideBar/>} />
        <Route path="/topbar" element={<TopBar/>} />
        <Route path="/conversation" element={<Conversation/>} />
        <Route path="/add/friend" element={<AddFriend/>} />
        <Route path="/blocked" element={<Blocked/>} />
        <Route path="/pending" element={<Pending/>} />
        <Route path="/all/friends" element={<AllFriends/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

      </Routes>
    </Router>
  );
}


export default App;
