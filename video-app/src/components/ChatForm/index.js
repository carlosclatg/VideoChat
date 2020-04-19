import React, { Fragment, useState } from 'react';
import Conversation from '../Conversation'

export default function ChatForm({handleHideVideo, handleShowVideo, shareImage, stopImage, hearVoice, messages}){

    const [isShowingVideo, setIsShowingVideo] = useState(false)



    return(
        <Fragment>
            <img id="cameraFromOther"></img>
            <div>
                <button id="buttonShow" onClick={handleShowVideo}>Show Video</button>
            </div>
            <div>
                <button id="buttonHide" onClick={handleHideVideo}>Hide Video</button>
            </div>
            <div>
                <button id="test" onClick={shareImage}>Share</button>
            </div>
            <div>
                <button id="stop" onClick={stopImage}>Stop</button>
            </div>
            <video id="video1" width="300px" height="300px"></video>
            <button id="voice" onClick={hearVoice}>Activate Voice Recognition</button>
            <div className="chatContainer">
                <Conversation messages={messages}/>
            </div>
        </Fragment>
    )
}