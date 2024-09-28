import React from "react";
import { FaDiscord } from "react-icons/fa";
import MoodStatus from "./MoodStatus";
import DirectMessages from "./DirectMessages";

function SideBar() {
  return (
    <div style={{
      width: '250px', 
      height: '100vh', 
      backgroundColor: '#2c2f33', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
      position: 'fixed',
      left: 0,
      top: 0,
      overflow: 'hidden'  // Ensure no scrollbar for sidebar container
    }}>
      {/* User Avatar/Info */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <FaDiscord size={70} style={{ color: '#7289da' }} />
      </div>

      {/* Direct Messages Section (Scrollable) */}
      <div style={{ width: '100%', flexGrow: 1, overflowY: 'auto', marginTop: '10px' }}>
        <span style={{ color: '#72767d', paddingLeft: '15px', display: 'block', fontSize: '12px', marginBottom: '10px' }}>DIRECT MESSAGES</span>
        {/* Scrollable Direct Messages */}
        <DirectMessages />
      </div>

      {/* Bottom User/Controls (Fixed) */}
      <div style={{ paddingTop: '20px', paddingBottom: '20px', width: '100%' }}>
        <MoodStatus />
      </div>
    </div>
  );
}

export default SideBar;
