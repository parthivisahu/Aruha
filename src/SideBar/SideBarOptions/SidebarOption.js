// SidebarOption.js
import React from "react";
import "./SidebarOption.css";
import { useDataLayerValue } from "../../DataLayer";

function SidebarOption({ title, Icon, playlistId }) {
  const [{ selectedPlaylistId }, dispatch] = useDataLayerValue();

  const selectPlaylist = () => {
    dispatch({
      type: "SET_PLAYLIST_ID",
      playlistId: playlistId,
    });
  };

  return (
    <div
      className={`sidebarOption ${
        selectedPlaylistId === playlistId ? "sidebarOption--active" : ""
      }`}
      onClick={selectPlaylist}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
