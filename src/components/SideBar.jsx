import React from "react";
import { BsPersonCircle, BsGear } from "react-icons/bs"; // Example icons for settings, etc.
import { FaPlus, FaDownload, FaDiscord } from "react-icons/fa"; // Example icons
import { MdMicOff } from "react-icons/md"; // Example mic icon


function SideBar() {
  return (
    <div style={{
      width: '250px', 
      height: '100vh', 
      backgroundColor: '#36393F', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      {/* User Avatar/Info */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <FaDiscord size={70} style={{ color: '#7289da' }} />
      </div>


      {/* Direct Messages Section */}
      <div style={{ width: '100%', marginTop: '20px' }}>
        <span style={{ color: '#72767d', paddingLeft: '15px', display: 'block', fontSize: '12px', marginBottom: '10px' }}>DIRECT MESSAGES</span>

        {/* Example List of Direct Messages */}
        <a href="/dm/melissa" style={linkStyle}>Friend </a>
        <a href="/dm/projekti" style={linkStyle}>Friend</a>
        <a href="/dm/inva" style={linkStyle}>Friend</a>
        <a href="/dm/lab2" style={linkStyle}>Friend</a>
        <a href="/dm/web" style={linkStyle}>Friend</a>
        <a href="/dm/athua" style={linkStyle}>Friend</a>
      </div>

      {/* Bottom User/Controls */}
      <div style={{ marginTop: 'auto', width: '100%', padding: '10px', textAlign: 'center', borderTop: '1px solid #444' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <FaDiscord size={20} style={{ color: '#7289da' }} />
          <span style={{ color: '#b9bbbe' }}>teabinaku</span>
          <MdMicOff size={20} style={{ color: '#f04747' }} />
          <BsGear size={20} style={{ color: '#b9bbbe' }} />
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  display: 'block',
  color: 'white',
  padding: '10px 15px',
  textDecoration: 'none',
  textAlign: 'left',
  fontSize: '14px',
  borderRadius: '5px',
  margin: '5px 0',
  width: '100%',
};

export default SideBar;
