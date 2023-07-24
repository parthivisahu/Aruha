// Sidebar.js
import React, { useEffect } from "react";
import { useDataLayerValue } from "../DataLayer";
import SidebarOption from "../SideBar/SideBarOptions/SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";
import PodcastsRoundedIcon from "@mui/icons-material/PodcastsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AudiotrackRoundedIcon from "@mui/icons-material/AudiotrackRounded";
import SpotifyWebApi from "spotify-web-api-js";
import "./Sidebar.css";

const aruha = new SpotifyWebApi();

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const userPlaylists = await aruha.getUserPlaylists();
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: userPlaylists.items,
        });
      } catch (error) {
        console.log("Error fetching user playlists:", error);
        // Handle the error and provide a fallback or display an error message
      }
    };

    fetchUserPlaylists();
  }, [dispatch]);

  const handlePlaylistClick = async (playlistId) => {
    try {
      const playlist = await aruha.getPlaylist(playlistId);
      dispatch({
        type: "SET_SELECTED_PLAYLIST",
        selectedPlaylist: playlist,
      });
      dispatch({
        type: "SET_PLAYLIST_ID",
        playlistId: playlistId,
      });
    } catch (error) {
      console.log("Error fetching playlist:", error);
      // Handle the error and provide a fallback or display an error message
    }
  };

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://drive.google.com/uc?export=view&id=1AaHh71SPGR4FOtvyIlifbg_ZRmrR3rct"
        alt="Aruha"
      />
      <SidebarOption Icon={HomeIcon} title="Home" />
      <SidebarOption
        Icon={PlaylistPlayRoundedIcon}
        title="Playlists"
        playlists={playlists}
        onClick={handlePlaylistClick}
      />
      <SidebarOption Icon={PodcastsRoundedIcon} title="Podcasts" />
      <SidebarOption Icon={PersonRoundedIcon} title="Artists" />
      <SidebarOption Icon={AudiotrackRoundedIcon} title="Genres" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {Array.isArray(playlists) &&
        playlists.map((playlist) => (
          <SidebarOption
            key={playlist.id}
            title={playlist.name}
            onClick={() => handlePlaylistClick(playlist.id)}
          />
        ))}
    </div>
  );
}

export default Sidebar;
