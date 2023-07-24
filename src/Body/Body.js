import React, { useEffect } from "react";
import "./Body.css";
import Header from "../Header/Header.js";
import { useDataLayerValue } from "../DataLayer";
import SongRow from "../SongRow/SongRow";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Body({ aruha }) {
  const [{ discover_weekly, selectedPlaylistId, playlistId }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        if (selectedPlaylistId) {
          const fetchedPlaylistTracks = await aruha.getPlaylistTracks(selectedPlaylistId, {
            limit: 1000, // You can increase the limit here to get more tracks
            offset: 0,
          });

          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: fetchedPlaylistTracks,
          });
        }
      } catch (error) {
        console.log("Error fetching playlist tracks:", error);
      }
    };
    fetchPlaylistTracks();
  }, [aruha, dispatch, selectedPlaylistId]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        if (playlistId) {
          let fetchedPlaylistTracks = [];
          let offset = 0;
          const limit = 400; // Maximum allowed limit per request
          let totalTracks = 0;

          do {
            const response = await aruha.getPlaylistTracks(playlistId, {
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
      }
    };
    fetchPlaylistTracks();
  }, [aruha, dispatch, playlistId]);

  const playPlaylist = async (id) => {
    try {
      await aruha.play({
        context_uri: `spotify:playlist:${id}`,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    } catch (error) {
      console.log("Error playing playlist:", error);
    }
  };

  const playSong = async (id) => {
    try {
      await aruha.play({
        uris: [`spotify:track:${id}`],
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
      dispatch({
        type: "SET_ITEM",
        item: {
          id: id,
        },
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
      const track = discover_weekly.tracks.items.find((item) => item.track.id === id);
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
      dispatch({
        type: "SET_ITEM",
        item: track.track,
      });
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
        {discover_weekly.images && (
          <img src={discover_weekly.images[0].url} alt="" />
        )}
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly.name}</h2>
          <p>{discover_weekly.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={() => playPlaylist(discover_weekly.id)}
          />

          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly.tracks.items.map((item) => (
          <SongRow key={item.track.id} playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
