import React, { useEffect } from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useDataLayerValue } from "../DataLayer";
import SongRow from "../SongRow/SongRow";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Body({ aruha, selectedPlaylistId, setQueue,handleSongSelect  }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        if (selectedPlaylistId) {
          let fetchedPlaylistTracks = [];
          let offset = 0;
          const limit = 400; // Maximum allowed limit per request
          let totalTracks = 0;

          do {
            const response = await aruha.getPlaylistTracks(selectedPlaylistId, {
              limit: limit,
              offset: offset,
            });

            fetchedPlaylistTracks = fetchedPlaylistTracks.concat(response.items);
            totalTracks = response.total;
            offset += limit;
          } while (offset < totalTracks);

          dispatch({
            type: "SET_PLAYLIST_TRACKS",
            playlistTracks: fetchedPlaylistTracks,
          });
        }
      } catch (error) {
        console.log("Error fetching playlist tracks:", error);
        // Handle the error and provide a fallback or display an error message
      }
    };
    fetchPlaylistTracks();
  }, [aruha, dispatch, selectedPlaylistId]);

  const playSong = async (id) => {
    try {
      await aruha.play({
        uris: [`spotify:track:${id}`],
      });
  
      const track = discover_weekly.tracks.items.find((item) => item.track.id === id);
  
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
      const currentIndex = discover_weekly.tracks.items.findIndex((item) => item.track.id === id);
      const nextSongs = discover_weekly.tracks.items.slice(currentIndex + 1, currentIndex + 11); // Get the next 10 songs
      const queueSongs = nextSongs.map((item) => item.track);
      setQueue(queueSongs);
      dispatch({
        type: "SET_ITEM",
        item: {
          album: track.track.album,
          artists: track.track.artists,
          images: track.track.album.images,
          name: track.track.name,
        },
        songName: track.track.name,
        albumCover: track.track.album.images[0].url,
      });
  
      // Add the selected song to the queue
      setQueue((prevQueue) => [...prevQueue, track.track]);
    } catch (error) {
      console.log("Error playing song:", error);
    }
  };
  

  if (!discover_weekly) {
    return null; // or render a loading state if necessary
  }

  return (
    <div className="body">
      <Header aruha={aruha} />

      <div className="body__info">
        {/* Rest of the code... */}
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={() => playSong(discover_weekly.tracks.items[0].track.id)}
          />

          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly.tracks.items.map((item) => (
          <SongRow
          key={item.track.id}
          playSong={playSong}
          track={item.track}
          handleSongSelect={handleSongSelect} // Pass the handleSongSelect function as handleSongSelect
        />
        ))}
      </div>
    </div>
  );
}

export default Body;