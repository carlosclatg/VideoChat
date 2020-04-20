import React, { Fragment, useState } from 'react';
import Conversation from '../Conversation'
import './index.sass';

import people from '../../staticsources/people.png'

export default function ChatForm({handleHideVideo, handleShowVideo, shareImage, stopImage, hearVoice, sendText, messages}){

    const [isShowingVideo, setIsShowingVideo] = useState(false)
    const [isSharingVideo, setIsSharingVideo] = useState(false)
    const [text, setText] = useState('')

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

    const sendViaText = (event) => {
        event.preventDefault()
        sendText(text)
        setText('')
        document.getElementById("inputText").value =''
    }


    const handleTextValue = (event) => setText(event.target.value)

    return(
        <Fragment>
            <div className="buttonAndImagesContainer">
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
                    <div className="oneImage">
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
            </div>
            <button className="button is-info" id="voice" onClick={hearVoice}>Send Autovoice recognition!</button>
            

            <form className="formText" onSubmit={sendViaText}>
                <input id="inputText" type="text" onChange={handleTextValue} required></input>
                <button className="button is-info" type="submit">Or Type...</button>
            </form>
            {
                messages && messages.length ?
                <div className="chatContainer">
                    <Conversation messages={messages}/>
                </div>
                : 
                null
            }
            
        </Fragment>
    )
}