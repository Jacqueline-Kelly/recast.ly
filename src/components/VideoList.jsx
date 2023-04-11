import VideoListEntry from './VideoListEntry.js';

const VideoList = ({videos, clickFunction}) => {

  return (
    <div className="video-list">
      {videos.map((item, index) => (
        <VideoListEntry video={item} key={index} clickFunction={clickFunction} titleIndex={index}/>
      ))}
    </div>
  );
};


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: PropTypes.array.isRequired,
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default VideoList;
