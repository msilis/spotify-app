import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
//Keep track of all the different states
    this.state = {
      searchResults: [],
      updatedResults: [], 
      playlistName: "New Playlist",
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    
    
  }
  //Add track from Playlist

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
    
  }

  //Remove track from playlist

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((savedTrack) => savedTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  //Change name of playlist

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  //Track URI

  savePlaylist() {
    const trackUri = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUri);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  //Search Bar

  search(term) {
    Spotify.search(term).then(searchResults => (
      this.setState({ searchResults: searchResults})
    ));
  }

  render() {
    return (
      
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults.filter((result) => !this.state.playlistTracks.includes(result))}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
