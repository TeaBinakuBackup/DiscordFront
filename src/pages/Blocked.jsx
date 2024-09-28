import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { IoIosRemoveCircleOutline } from "react-icons/io";



function Blocked(){
  const [blockedusers, setBlockerUsers] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8000/api/blocked/users')
          .then(response => {
            setBlockerUsers(response.data);
        
          })
          .catch(error => {
              console.error('Error fetching blocked users:', error.response);
          });
  }, []);

  const unblockUser = async (userId) => {
    try {
        const response = await axios.post('http://localhost:8000/api/unblock/user', { id: userId }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        
        // Success handling: remove the blocked friend from the list
        setBlockerUsers(blockedusers.filter(blockedusers => blockedusers.id !== userId));

    } catch (error) {
        console.error('Error blocking user:', error);
    }
};

    return(
        <>
        <TopBar/>
           <div style={{ display: 'flex' }}>
      <SideBar />

        {/* Main Content */}
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
         
        {blockedusers.length > 0 ? (
                        <ul className="list-group">
                            {blockedusers.map((blocked, index) => (
                                <li 
                                    key={index} 
                                    className="list-group-item d-flex justify-content-between align-items-center p-3 mb-3 shadow-lg text-white rounded-3 border-0 shadow-sm"
                                    style={{ backgroundColor: '#36393F' }}
                                >
                                    <div className="d-flex align-items-center">
                                        {/* Avatar */}
                                        <img 
                                            src="../discord.webp"
                                            alt="Avatar" 
                                            className="rounded-circle me-3" 
                                            style={{ width: '40px', height: '40px' }} 
                                        />

                                        {/* Friend Name and Status */}
                                        <div>
                                            <strong>{blocked.blocked.name}</strong>
                                        
                                        </div>
                                    </div>

                                    {/* Actions (Message and Options) */}
                                    <div>
                                        <button className="btn border-0 text-danger" title="Remove block">
                                        <IoIosRemoveCircleOutline size={25} onClick={() => unblockUser(blocked.id)}/>
                                        </button>
                              
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center">
                            <img src="/icon3.svg" alt="No friends" className="img-fluid mb-3" />
                            <p className="text-secondary">No blocked users.</p>
                        </div>
                    )}
      
     
         </div>
    </div>
       </>
    );
}
export default Blocked;