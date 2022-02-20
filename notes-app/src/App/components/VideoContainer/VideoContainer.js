import "./VideoContainer.css";

const VideoContainer = () => {
  
  return (
      <div class="outer-container">
        <div class="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/9VNTvwaJ6oM"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
  );
};

export default VideoContainer;
