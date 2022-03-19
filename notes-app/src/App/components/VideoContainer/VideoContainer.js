import "./VideoContainer.css";
import ReactPlayer from 'react-player/youtube'

const VideoContainer = (props) => {
  var player;
  var YT;

  var link = props.link;

  const onYouTubeIframeAPIReady = () => {
    console.log("Youtube player ready....");
    player = new YT.Player('video-placeholder', {
      width: 600,
      height: 400,
      videoId: 'Xa0Q0J5tOP0',
      playerVars: {
        color: 'white',
        playlist: 'taJ60kskkns,FG0fTKAqZ5g'
      },
      events: {
        onReady: initialize
      }
    });
  }

  const youtubeiframe = () => {
    <div className="video-container" id="video-placeholder" >
      <iframe
        src="https://www.youtube.com/embed/9VNTvwaJ6oM"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>

  }

  const initialize = () => {

  }

  
const isImgUrl = (url) => {
  var val = url.match(/\.(jpeg|jpg|gif|png|bmp|svg|tiff)(\?(.*))?$/gmi);
  console.log(val);
  return val;
}

  return (
    isImgUrl(link) ? <img width='100%' height="100%" src={link}></img> :<ReactPlayer url={link} width='100%' height='100%' /> 
  );
}

export default VideoContainer;
