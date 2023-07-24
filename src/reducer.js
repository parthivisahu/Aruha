// import { findAllByDisplayValue } from "@testing-library/react";
// token: 'BQC7Vb15tKBblBfb8UfVMdPhKwOl_dNfNnzS0wHZO_KGPHJAgZ8T-rgPRVznJ8cO8_oHG0sZjutJpuyx42lsvvmBU5v4C2eVa1xur0euBwp7IWppUzcQX1ikUYdb2gdpNqa9Pq5qH59Hu830oiq2Mw-oZDOtRnhb9MDng5ujdqbQ1tFA_f55LhfwlP2spe-ZSes1f4RT9hOybXvoipJMow',
export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

      case "SET_ITEM":
        const albumCover = action.item?.album?.images[0]?.url || null;
        return {
          ...state,
          item: action.item,
          songName: action.item?.name || null,
          albumCover: albumCover,
        };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
      // reducer.js
    case "SET_PLAYLIST_ID":
      return {
        ...state,
        selectedPlaylistId: action.playlistId,
      };
    default:
      return state;
  }
};

export default reducer;