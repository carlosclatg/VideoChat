import React, { Fragment, useState } from 'react';
import Conversation from '../Conversation'
import './index.sass';

import people from '../../staticsources/people.png'

export default function ChatForm({handleHideVideo, handleShowVideo, shareImage, stopImage, hearVoice, messages}){

    const [isShowingVideo, setIsShowingVideo] = useState(false)
    const [isSharingVideo, setIsSharingVideo] = useState(false)

    const key = `${isShowingVideo}-${isSharingVideo}`;

    const activeVideo = (event) => {
        setIsShowingVideo(!isShowingVideo)
        handleShowVideo(event)
    }

    const hideVideo = (event) => {
        setIsShowingVideo(!isShowingVideo)
        setIsSharingVideo(false)
        handleHideVideo(event)
        stopImage(event)
    }

    const stopSharing = (event) => {
        setIsSharingVideo(!isSharingVideo)
        stopImage(event)
    }

    const startSharing = (event) => {
        setIsSharingVideo(!isSharingVideo)
        shareImage(event)
    }



    return(
        <Fragment>
            
            <div className="buttonContainter">
                {!isShowingVideo ?
                <div>
                    <button className="button is-info" id="buttonShow" onClick={activeVideo}>See myVideo</button>
                </div>
                :
                <div>
                    <button className="button is-danger is-light" id="buttonHide" onClick={hideVideo}>Hide Video</button>
                </div>
                }
                {
                    {
                    'true-true': <div>
                                    <button className="button is-danger is-light" id="stop" onClick={stopSharing}>StopSharing</button>
                                </div>,
                    'true-false': <div>
                                    <button className="button is-info" id="share" onClick={startSharing}>BeginSharing</button>
                                </div>,
                    'false-true': null,
                    'false-false': null,
                    }[key]
                }
            </div>
            <div className="twoImagesContainer">
                <div>
                    <img id="cameraFromOther" src={people} width="200px" height="200px"></img>
                </div>
                <div className="oneImage">
                    {isSharingVideo ?
                        <video id="video1" width="200px" height="200px"></video> 
                        :
                        <Fragment>
                        <video id="video1" width="200px" height="200px" display="none"></video> 
                        <p>Not Sharing any video</p>
                        </Fragment>
                    }
                </div>
            </div>

            
            <button id="voice" onClick={hearVoice}>Activate Voice Recognition</button>
            <div className="chatContainer">
                <Conversation messages={messages}/>
            </div>
        </Fragment>
    )
}