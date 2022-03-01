import "./VideoContainer.css";

const VideoContainer = () => {
  
  return (    
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/9VNTvwaJ6oM"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
  );
};

export default VideoContainer;
