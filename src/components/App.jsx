import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from '../lib/searchYouTube.js';
const { useState, useEffect } = React;

const App = () => {
  const [videoListArray, setVideoListArray] = useState([]); // this will eventually be equal to the get request from youtube api
  const [videoPlayerItem, setVideoPlayerItem] = useState(exampleVideoData[0]); // currently playing in videoplayer, either clicked on value from video list or the first object in videolist array
  //create a function to update state of video player
  const handleEntryClick = (event) => {
    setVideoPlayerItem(videoListArray[event.target.id]);
  };

  const updateVideoListArray = (query) => {
    searchYouTube(query, (data) =>
      setVideoListArray(data)
    );
  };

  let debounceTimeout = null;
  //event handler for typing in search bar
  const handleSearch = (event) => {
    let query = event.target.value;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => updateVideoListArray(query), 500);
  };


  //will render when page first loads, and monitors videoListArray
  useEffect(() => {
    if (!videoListArray.length) {
      updateVideoListArray('react js');
    } else {
      setVideoPlayerItem(videoListArray[0]);
    }

  }, [videoListArray]);

  return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search handleSearch={handleSearch}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={Object.keys(videoPlayerItem).length ? videoPlayerItem : null}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={videoListArray} clickFunction={handleEntryClick}/>
        </div>
      </div>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
