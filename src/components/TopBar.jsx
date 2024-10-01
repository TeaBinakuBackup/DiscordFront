import React,{useState,useEffect} from "react";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";  // To make API requests
import { useNavigate } from "react-router-dom";  // For redirection
import { IoNotifications } from "react-icons/io5";
import { Dropdown, Badge } from "react-bootstrap";



function TopBar() {
    const navigate = useNavigate();  // Use the navigate function for redirection

    const logoutMethod = async () => {
        try {
            // Make the API request to log out (adjust the URL according to your backend)
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            // Clear the token from localStorage
            localStorage.removeItem('auth_token');

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
  
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/notifications", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          });
          setNotifications(response.data);
          setUnreadCount(response.data.length);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
    
      // Fetch notifications immediately on component mount
      fetchNotifications();
    
      // Set up polling to check for notifications every 10 seconds
      const intervalId = setInterval(fetchNotifications, 10000); // 10000ms = 10 seconds
    
      // Cleanup the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, []);
    
    return (
        <>
            <div style={{ backgroundColor: '#2f3136', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #0000' }}>
                <BsPersonRaisedHand size={30} className="text-secondary" style={{ marginRight: '10px' }} />
                <small className="text-secondary fw-semibold me-3">Friends</small>

                <a href="/all/friends" style={{ color: 'white', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">All</a>
                <a href="/pending" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Pending</a>
                <a href="/blocked" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Blocked</a>
                <a href="/group/chat" style={{ color: '#A9A9A9', marginRight: '30px', textDecoration: 'none' }} className="fw-semibold">Group Chats</a>


                <a href="/add/friend">
                    <button className="btn border-0 text-white me-3" style={{ backgroundColor: '#3ba55c', padding: '6px 12px', borderRadius: '4px' }}>
                        Add Friend
                    </button>
                </a>

                <Dropdown>
      <Dropdown.Toggle variant="gray" id="dropdown-basic" className="position-relative text-secondary border-0">
        <IoNotifications size={24} />
        {unreadCount > 0 && (
          <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
            {unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "350px",backgroundColor:'#2f3136'}}>
        <Dropdown.Header className="text-white">Notifications</Dropdown.Header>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Dropdown.Item key={index} className="d-flex justify-content-between text-secondary">
              <div style={{ maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {notification.data.message}
              </div>
              <Badge bg="info">New</Badge>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>No notifications</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>

                <a href="/profile">
                    <button className="btn border-0 text-secondary">
                        <FaUserAlt size={25} />
                    </button>
                </a>

                {/* Logout Button */}
                <button className="btn border-0 text-secondary" onClick={logoutMethod}>
                    <IoLogOutOutline size={25} />
                </button>
                

            </div>
        </>
    );
}

export default TopBar;
