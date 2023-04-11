import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from '../lib/searchYouTube.js';
const { useState, useEffect } = React;

const App = () => {
  const [videoListArray, setVideoListArray] = useState([]); // this will eventually be equal to the get request from youtube api
  const [videoPlayerItem, setVideoPlayerItem] = useState({}); // currently playing in videoplayer, either clicked on value from video list or the first object in videolist array
  //create a function to update state of video player
  const handleEntryClick = (event) => {
    setVideoPlayerItem(videoListArray[event.target.id]);
  };

  const UpdateVideoListArray = (query) => {
    query = query || 'react';
    searchYouTube(query, (data) => setVideoListArray(data));
  };

  useEffect(() => {
    if (!videoListArray.length) {
      UpdateVideoListArray();
    } else if (!videoListArray['snippet']) {
      setVideoPlayerItem(videoListArray[0]);
    }
  }, [videoListArray]);
  return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search />
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          {videoPlayerItem['snippet'] && <VideoPlayer video={videoPlayerItem}/>}
        </div>
        <div className="col-md-5">
          {videoListArray.length && <VideoList videos={videoListArray} clickFunction={handleEntryClick}/>}
        </div>
      </div>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
