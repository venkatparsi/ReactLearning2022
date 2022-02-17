import React, { Component } from 'react'
import { useEffect } from 'react';
//import JitsiMeetExternalAPI from 'https://8x8.vc/external_api.js'
import VideoConference from '../../components/video-conference/VideoConference.component'
import JitsiMeetComponent from '../../components/jitsi-meet/JitsiMeet.component';
import { AuthErrorCodes } from '@firebase/auth';
function Muchhata(){

   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
    // Runs after EVERY rendering
    if (window.JitsiMeetExternalAPI) {
        console.log("JitsiExternalApi exists..:", window.JitsiMeetExternalAPI);
        var elem = document.querySelector('#jaas-container');
        console.log(elem);
        const api = new window.JitsiMeetExternalAPI("8x8.vc", {
            //roomName: "vpaas-magic-cookie-d63f64a215ac4c5c9e2b5ca7d0946512/SampleAppJointBehalvesWantInstead",
            roomName: "vpaas-magic-cookie-d63f64a215ac4c5c9e2b5ca7d0946512/VenkatParsi",
            parentNode: document.querySelector('#jaas-container')

        });
        
    }
  
},[]); 


        return (
            <div style={{margin:'auto',width:'100%'}}>
                  JITSI
                  {/*<JitsiMeetComponent/>*/}
                <div id="jaas-container"  style={{margin:'auto',width:'100%',height:'600px'}} />
             

            </div>
        )
    
}

export default Muchhata
