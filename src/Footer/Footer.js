import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import "./Footer.css";

function Footer({ aruha }) {
  const [{ playing, shuffle, item }, dispatch] = useDataLayerValue();
  const albumImage = item?.album?.images[0]?.url;
  const songName = item?.name;
  const artistNames = item?.artists?.map((artist) => artist.name).join(", ");
  const [volume, setVolume] = useState(100); // Initialize volume to maximum (100)
  
  useEffect(() => {
    const fetchPlaybackState = async () => {
      try {
        const playbackState = await aruha.getMyCurrentPlaybackState();
  
        dispatch({
          type: "SET_PLAYING",
          playing: playbackState?.is_playing,
        });
  
        dispatch({
          type: "SET_ITEM",
          item: playbackState?.item,
        });
  
        setVolume(playbackState?.device?.volume_percent || 100); // Set the initial volume based on the playback state
  
        // Update the album cover and song name
        const albumImage = playbackState?.item?.album?.images[0]?.url;
        const songName = playbackState?.item?.name;
        const artistNames = playbackState?.item?.artists
          .map((artist) => artist.name)
          .join(", ");
  
        albumImage(albumImage);
        songName(songName);
        artistNames(artistNames);
      } catch (error) {
        console.log("Error fetching playback state:", error);
        // Handle the error and provide a fallback or display an error message
      }
    };
  
    fetchPlaybackState();
  }, [aruha, dispatch]);
  

  const handlePlayPause = async () => {
    try {
      if (playing) {
        await aruha.pause();
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        });
      } else {
        await aruha.play();
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      }
    } catch (error) {
      console.log("Error playing/pausing:", error);
      // Handle the error and provide a fallback or display an error message
    }
  };
  const skipToPrevious = async () => {
    try {
      await aruha.skipToPrevious();
      const playbackState = await aruha.getMyCurrentPlaybackState();
      dispatch({
        type: "SET_ITEM",
        item: playbackState?.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: playbackState?.is_playing,
      });
    } catch (error) {
      console.log("Error skipping to previous track:", error);
      // Handle the error and provide a fallback or display an error message
    }
  };
  

  const skipToNext = async () => {
    try {
      await aruha.skipToNext();
      const playbackState = await aruha.getMyCurrentPlaybackState();
      dispatch({
        type: "SET_ITEM",
        item: playbackState?.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: playbackState?.is_playing,
      });
    } catch (error) {
      console.log("Error skipping to next track:", error);
      // Handle the error and provide a fallback or display an error message
    }
  };

  const shufflePlay = async () => {
    try {
      await aruha.setShuffle(!shuffle);
    } catch (error) {
      console.log("Error toggling shuffle:", error);
      // Handle the error and provide a fallback or display an error message
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue); // Update the volume state
    aruha.setVolume(newValue); // Update the volume on the Spotify player
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img className="footer__albumLogo" src={albumImage} alt={songName} />
        {item ? (
          <div className="footer__songInfo">
            <h5>{songName}</h5>
            <p>{artistNames}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className="footer__center">
        <ShuffleIcon
          className={shuffle ? "footer__green" : ""}
          onClick={shufflePlay}
        />
        <SkipPreviousIcon className="footer__icon" onClick={skipToPrevious} />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon className="footer__icon" onClick={skipToNext} />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
          <Slider
              aria-labelledby="continuous-slider"
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
