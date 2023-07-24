import React, { useEffect,useState } from "react";
import "./Player.css";
import Sidebar from "./../SideBar/Sidebar";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import QueueBar from "./../QueueBar/QueueBar";


function Player({ aruha }) {
  const [selectedPlaylistId] = useState(null);
    useEffect(() => {
      
      const playTrack = async () => {
        try {
          const trackId = '1'; // Replace '1' with the actual track ID
          await aruha.play({ uris: [`spotify:track:${trackId}`] });
          console.log('Track played successfully.');
        } catch (error) {
          console.log('Error occurred while playing the track:', error);
          // Handle the error and provide a fallback or display an error message
        }
      };
  
      playTrack();
    }, [aruha]);
    return(
        <div className="player">
          
            <div className="player_body">
            {/* Sidebar */}
            <Sidebar />
            {/* Body */}
           
            <Body aruha={aruha} selectedPlaylistId={selectedPlaylistId} />
            {/* QueueBar */}
            
            <QueueBar />
           
        
            </div>
           
            {/* Footer */}
            <Footer aruha={aruha} />
        </div>
       
        
    );
}

export default Player;