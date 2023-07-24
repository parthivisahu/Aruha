import React, { useEffect} from "react";
import "./App.css";
import Player from "./Player/Player";
import { getTokenFromResponse } from "./aruha";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./Login/Login";
import { useDataLayerValue } from "./DataLayer";
// import Body from "./Body/Body";

const aruha = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  // const [selectedPlaylistId] = useState(null);

  useEffect(() => {
    const hash = getTokenFromResponse();

    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      aruha.setAccessToken(_token);

      aruha.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });

        aruha.getUserPlaylists(user.id).then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: playlists,
          });

          if (playlists?.items?.length > 0) {
            const playlistId = playlists.items[0].id;

            aruha.getPlaylist(playlistId).then((response) =>
              dispatch({
                type: "SET_DISCOVER_WEEKLY",
                discover_weekly: response,
              })
            );
          }
        });
      });

      aruha.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: aruha,
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      {token ? (
        <>
          <Player aruha={aruha} />
          {/* <Body aruha={aruha} selectedPlaylistId={selectedPlaylistId} /> */}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
