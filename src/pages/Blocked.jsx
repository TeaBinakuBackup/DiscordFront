import React from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";


function Blocked(){
    return(
        <>
        <TopBar/>
           <div style={{ display: 'flex' }}>
      <SideBar />

        {/* Main Content */}
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%', backgroundColor: '#36393F', color: 'white', height: '100vh' }}>
         

      
     
         </div>
    </div>
       </>
    );
}
export default Blocked;