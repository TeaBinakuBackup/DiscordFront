import React from "react";
import SideBar from "../components/SideBar";
import Conversation from './Conversation';
import TopBar from "../components/TopBar";

function Main(){
    return(
        <>
        <TopBar/>
        <SideBar />
        <Conversation/>
        
        </>

    );
}

export default Main;