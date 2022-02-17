import React from 'react'
import YouTube from "react-youtube";
import Modal from "react-modal";
import './avatar.style.css';
import Icon from '../Icon.component';
const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      ariaHideApp:false
    }
  };

const Avatar = (props) => {
        
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [playerPlayVideo,setPlayerPlayVideo] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [showProfileVideo,setShowProfileVideo] = React.useState("none");
  const [showProfilePic,setShowProfilePic] = React.useState("block");
  let videoCode;
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.95) {
       handleExerciseComplete();
    }
   
  };
      
  //modestbranding=1&autohide=1&showinfo=0&controls=0
  // https://developers.google.com/youtube/player_parameters
  const opts = {
    playerVars: {
        id:"myProfileVideo",
        modestbranding:0,
        disablekb:0,
        egm:1,
        autohide:0,
        showinfo:0,
        controls:0,
        cc_load_policy:0,      
        autoplay: 0
    }
  };



   const videoOnReady = (event) => {
       console.log("VideoOnReady Player handle",event.target);
        setPlayerPlayVideo(event.target);
   }
    const handleExerciseComplete = () => {
        console.log("Video finished");      
        setShowProfileVideo("none",
        setShowProfilePic("block"));        
    } 
    const playVideo = () => {    
        console.log("Playing video now..") ;   
        setShowProfilePic("none",
        setShowProfileVideo("block"),
        playerPlayVideo.playVideo());
    }
     
    function showVideo(){
        const iFrame = document.getElementById('knowMe');
        iFrame.parentNode.replaceChild(iFrame.cloneNode(), iFrame); 

       
    }
    return (
        <div className="avatar-wrapper">
        
        <div style={{position:"relative"}}  onClick={() => {playVideo();}}>
            <img style={{display:showProfilePic}}
            className="avatar-img" id="showPic"  
            alt="Profile pic"
            src={props.profilePic}>
             
            </img>
            <Icon position="absolute" top="50px" left="60" iconName="FaYoutube"
              color="white"
              backgroundColor="red"
              showCircle={true}
            ></Icon>
        </div>

            <div class="profileVideo" 
            style={{display:showProfileVideo}}
           >
            <YouTube 
            videoId={props.profileVideo}
            containerClassName=" div-round embed embed-youtube"
            onStateChange={(e) => checkElapsedTime(e)}
            opts={opts}
            onReady={videoOnReady} 
          />
            
            </div> 
           
            {/*** This is through direct iframe..
                <div class="div-round" id="showVideo" 
                  style={{width: "80px", height: "80px"}}>
                  <iframe id="knowMe" className="iframe-round" allow="autoplay; encrypted-media; fullscreen" 
                    src="https://www.youtube.com/embed/4iJ05qeIoQo?autoplay=1&controls=0&loop=1">
                  </iframe>
                </div>
                 */ }
            
           
           <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Exercise Completed"
        style={modalStyles}
      >
        <div>
          <h3>Completed the exercise?</h3>
          <button >Complete exercise</button>
        </div>
      </Modal>
        </div>

        
    )
}

export default Avatar;
