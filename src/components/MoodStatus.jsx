import React,{useEffect,useState} from "react";
import { FaDiscord } from "react-icons/fa"; // Example icons
import { MdMicOff } from "react-icons/md"; // Example mic icon
import { BsPersonCircle, BsGear } from "react-icons/bs"; // Example icons for settings, etc.
import axios from "axios";
import { Dropdown } from 'react-bootstrap';  // Import Dropdown from react-bootstrap
import { FaCircle } from "react-icons/fa";
import { MdDoNotDisturbOn } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";






function MoodStatus(){
    const [userData, setUserData] = useState({});
    const [moodStauses,setMoodStatuses]=useState([]);


    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`  // Attach token from localStorage
                }
            });
            console.log(response.data)
            setUserData(response.data);  // Set the user data in the state
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    
    const moodSatuses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/mood/statuses', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`  // Attach token from localStorage
                }
            });
            setMoodStatuses(response.data);  // Set the user data in the state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch user profile when component mounts
    useEffect(() => {
        fetchProfileData();
        moodSatuses();
    }, []);
    return(
        <>
          <div style={{ marginTop: 'auto', width: '100%', padding: '10px', textAlign: 'center', borderTop: '1px solid #444' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <FaDiscord size={20} style={{ color: '#7289da' }} />
          <span style={{ color: '#b9bbbe' }}>{userData.name}</span>
          <div className="d-inline">
            <Dropdown drop="up">  {/* This makes the dropdown open upwards */}
                <Dropdown.Toggle 
                  variant="gray"
                    id="gear-dropdown-toggle" 
                    className="btn btn-link p-0 border-0"  // Custom styling to match the icon style
                    style={{ backgroundColor: 'transparent' }}  // Ensure background is transparent
                >
                    <BsGear size={20} style={{ color: '#b9bbbe' }} />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{background:'#2f3136'}}>
                 
                    <Dropdown.Item value="1" className="text-white"><FaCircle className="text-info me-1" size={10}/>
                            Active</Dropdown.Item>
                    <Dropdown.Item value="2" className="text-white"><MdDoNotDisturbOn size={10} className="text-danger me-1"/>
                    Do not Disturb</Dropdown.Item>
                    <Dropdown.Item value="3" className="text-white"><AiFillEyeInvisible size={10} className="text-secondary me-1"/>
                    Invisible</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
      </div>
        </>
    );

}   
export default MoodStatus;