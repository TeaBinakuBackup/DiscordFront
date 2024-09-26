import React from "react";
import { BsPersonRaisedHand } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';



function TopBar(){
    return(
        <>
  <div style={{ backgroundColor: '#2f3136', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' ,borderBottom: '1px solid #0000' }}>
      <BsPersonRaisedHand size={30} style={{ color: '#A9A9A9', marginRight: '10px' }} />
      <span className="text-white fw-semibold me-3">Friends</span>
      
      <a href="/all/friends" style={{ color: 'white', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">All</a>
      <a href="/pending" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Pending</a>
      <a href="/blocked" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Blocked</a>

      <a href="/add/friend">
        <button className="btn border-0 text-white" style={{ backgroundColor: '#3ba55c', padding: '6px 12px', borderRadius: '4px' }}>
          Add Friend
        </button>
      </a>
    </div>
        </>
    );
}
export default TopBar;