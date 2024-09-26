import React from "react";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
function Conversation(){
    return(
        <>
        <TopBar/>
           <div style={{ display: 'flex' }}>
      <SideBar />

      {/* Main Content */}
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <h1 style={{ color: 'black' }}>Main Content</h1>
        <p style={{ color: 'black' }}>
          This is the content of the page. It now starts after the sidebar.
        </p>
      </div>
    </div>
       </>
    );
}
export default Conversation;