import React, { Fragment } from 'react';
import io from 'socket.io-client'
import './App.sass';
import EntryForm from './components/EntryForm';
import ChatForm from './components/ChatForm';


class App extends React.Component {

  FPS = 15;

  socket;
  timeOut;
  recognition;
  isListenning;


  constructor(props){
    super(props)
    this.imageInput = document.getElementById("video1")
    this.state = {messages: [], roomValue: undefined, nameValue: undefined, currentRoom: null, isLogged: false, error: undefined}
    this.isListenning = false;
  }


  enterRoom = (event) => {
    event.preventDefault()
    this.socket = io('http://192.168.0.168:9080', {reconnection: false});


    this.socket.on('receiveImage', data => {
      document.getElementById('cameraFromOther').src = data;
    })

    this.socket.on('connect_error', (error) => {
      alert('Server Error')
      this.socket = null
    })

    this.socket.on('receiveText', data => {
      const currentList = this.state.messages
      currentList.push(data)
      this.setState({messages: currentList}, () => {})
    })

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if(SpeechRecognition){
      this.initializeSpeaker(SpeechRecognition);
    }
    const {nameValue, roomValue} = this.state
    this.setState({currentRoom: roomValue}, ()=> {})
    this.socket.emit('join', {nameValue, roomValue}, (error) => {
      if(error){ alert('Problem entering the room, may another user with the same name in the room....' + error)}
      else this.setState({isLogged: true}, ()=>{})
    })
  }

  initializeSpeaker(SpeechRecognition) {
    this.recognition = new SpeechRecognition();
    this.recognition.onstart = () => {
    };
    this.recognition.onresult = (event) => {
      if (event.results[0][0].transcript) {
        this.sendMessage(event.results[0][0].transcript);
        this.isListenning = false;
      }
    }
  }

  sendMessage = (text) => {
    const mess = this.state.messages
    mess.push({text, user: 'you'})
    this.setState({messages: mess}, ()=>{})
    this.socket.emit('sendText', text)
  }



  getFrame = () => {
    const canvas = document.createElement('canvas');
    canvas.width=400
    canvas.height=400
    canvas.getContext('2d').drawImage(document.getElementById("video1"), 0, 0, document.getElementById("video1").videoWidth, document.getElementById("video1").videoHeight);
    const data = canvas.toDataURL('image/png');
    return data;
  }


  handleShowVideo = event =>{
    event.preventDefault()
    navigator.mediaDevices.getUserMedia({ video: { width: { min: 400, max: 400 }, height: { min: 400, max: 400 }}, audio: true })
        .then(stream => {
          document.getElementById("video1").srcObject = stream
          document.getElementById("video1").play()
        })
  }

  handleHideVideo = event => {
    event.preventDefault()
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(stream=> {
        document.getElementById("video1").srcObject = null
        document.getElementById("video1").play()
      })
      clearInterval(this.timeOut)

  }

  shareImage = event => {
    event.preventDefault()
    this.timeOut = setInterval(()=>{
      this.socket.emit('sendImage', this.getFrame())
    }, 1000/this.FPS)
  }

  stopImage = (event) => {
    event.preventDefault()
    clearInterval(this.timeOut)
  }

  hearVoice = (event) => {
    //disable button hear
    if(this.recognition && !this.isListenning){
      event.preventDefault()
      this.isListenning = true;
      this.recognition.start()
    }
  }

  handleChangeValue = (event) => this.setState({roomValue: event.target.value});
  handleChangeName = (event) => this.setState({nameValue: event.target.value});


  render () {
    const {isLogged, roomValue, nameValue, messages, error} = this.state
    return (
      <Fragment>
        <header className="header">
          {roomValue && nameValue && isLogged ?
            <nav className="navbar is-fixed-top is-primary">
              <p className="infoText__black">You're connected as {nameValue} in room {roomValue}</p>
            </nav>
            :
            <nav className="navbar is-fixed-top is-primary">
              <p className="infoText__black">WELCOME TO CHAT-VIDEO-APP</p>
            </nav>
          }
        </header>
        <div className="App columns">
          {isLogged ?
            <Fragment>
              <ChatForm 
                handleHideVideo = {this.handleHideVideo}
                handleShowVideo={this.handleShowVideo} 
                shareImage={this.shareImage} 
                stopImage={this.stopImage} 
                hearVoice={this.hearVoice} 
                messages={messages}
                sendText={this.sendMessage}
                >
              </ChatForm>
            </Fragment>
            :
            <Fragment>
              <EntryForm nameValue={nameValue} roomValue= {roomValue} enterRoom={this.enterRoom} handleChangeName={this.handleChangeName} handleChangeValue={this.handleChangeValue}/>
            </Fragment>
          }
        </div>
      </Fragment>
    )}

  
}

export default App;
