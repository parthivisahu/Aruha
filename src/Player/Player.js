import React, { useState } from "react";
import "./Player.css";
import Sidebar from "./../SideBar/Sidebar";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import QueueBar from "./../QueueBar/QueueBar";

function Player({ aruha }) {
  const [selectedPlaylistId] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // State for the current playing track
  const [selectedSong, setSelectedSong] = useState(null); // State for the selected song

  // Function to play a track
  const playTrack = async (track) => {
    try {
      await aruha.play({ uris: [`spotify:track:${track.id}`] });
      console.log('Track played successfully.');
      setCurrentTrack(track); // Set the current playing track
    } catch (error) {
      console.log('Error occurred while playing the track:', error);
    }
  };

  // Callback function to handle song selection from the queue
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };
  const playNextTrack = async (trackId) => {
    try {
      const response = await aruha.play({
        uris: [`spotify:track:${trackId}`],
      });
      console.log('Track played successfully.');
      setCurrentTrack(trackId); // Update the current playing track
  
      // Remove the played track from the queue
      setQueue((prevQueue) => prevQueue.filter((track) => track.id !== trackId));
    } catch (error) {
      console.log('Error playing the next track:', error);
    }
  };
  
  return (
    <div className="player">
      <div className="player_body">
        {/* Sidebar */}
        <Sidebar />

        {/* Body */}
        <Body
          aruha={aruha}
          selectedPlaylistId={selectedPlaylistId}
          setQueue={setQueue} // Pass the setQueue function to Body component
          handleSongSelect={handleSongSelect} // Pass the callback function to Body component
        />

        {/* QueueBar */}
<QueueBar queue={queue} playNextTrack={playNextTrack} currentTrack={currentTrack} selectedSong={selectedSong} />

       

      </div>

      {/* Footer */}
      <Footer aruha={aruha} />
    </div>
  );
}

export default Player;
