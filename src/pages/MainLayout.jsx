// MainLayout.js
import React from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <TopBar />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{  padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
          {/* Render the child components based on the route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
