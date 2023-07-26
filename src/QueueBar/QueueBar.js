import React from "react";
import "./QueueBar.css"; // Add CSS styles for QueueBar

function QueueBar({ queue, playNextTrack }) {
  console.log(queue); // Check the data received in the queue prop
  return (
    <div className="queueBar">
      <h2>Queue</h2>
      <ul>
        {queue && queue.map((song) => {
          console.log(song.name, song.artists); // Check the title and artist for each song
          return (
            <li key={song.id}>
              <div className="songInfo">
                <img src={song.album.images[0].url} alt={song.name} />
                <div>
                  <span>{song.name}</span>
                  {/* <span>{song.artists.map((artist) => artist.name).join(", ")}</span> */}
                </div>
              </div>
              <button onClick={() => playNextTrack(song.id)}>Next</button>
              {/* Add buttons to remove from queue, move up, move down, etc. */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QueueBar;
