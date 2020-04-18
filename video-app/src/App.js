import React from 'react';
import openSocket from 'socket.io-client'
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  FPS = 15;

  socket;
  timeOut;
  recognition;


  constructor(props){
    super(props)
    this.imageInput = document.getElementById("video1")
    this.state = {messages: [], roomValue: '', nameValue: '', currentRoom: null}
  }


  enterRoom = (event) => {
    event.preventDefault()
    console.log('Entering room...')
    this.socket = openSocket('http://192.168.0.168:9080');

    this.socket.on('receiveImage', data => {
      document.getElementById('cameraFromOther').src = data;
    })

    this.socket.on('receiveText', data => {
      const currentList = this.state.messages
      currentList.push(data)
      this.setState({messages: currentList}, () => {})
    })

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    console.log(SpeechRecognition)
    if(SpeechRecognition){
      this.initializeSpeaker(SpeechRecognition);
    }
    const {nameValue, roomValue} = this.state
    console.log(nameValue)
    this.setState({currentRoom: roomValue}, ()=> {})
    this.socket.emit('join', {nameValue, roomValue})
  }

  initializeSpeaker(SpeechRecognition) {
    this.recognition = new SpeechRecognition();
    this.recognition.onstart = () => {
      console.log('voice activated');
    };
    this.recognition.onresult = (event) => {
      console.log(event.results[0][0].transcript);
      if (event.results[0][0].transcript) {
        this.sendMessage(event.results[0][0].transcript);
      }
    };
  }

  componentDidMount(){
    
  }

  sendMessage = (text) => {
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
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          document.getElementById("video1").srcObject = stream
          document.getElementById("video1").play()
        })
  }

  shareImage = event => {
    event.preventDefault()
    console.log(this.socket)
    this.timeOut = setInterval(()=>{
      this.socket.emit('sendImage', this.getFrame())
    }, 1000/this.FPS)
  }

  stopImage = (event) => {
    event.preventDefault()
    clearInterval(this.timeOut)
  }

  hearVoice = (event) => {
    if(this.recognition){
      event.preventDefault()
      this.recognition.start()
    }
  }

  handleChangeValue = (event) => this.setState({roomValue: event.target.value});
  handleChangeName = (event) => this.setState({nameValue: event.target.value});


  render () {
    return (
    <div className="App">
      <header className="App-header">
        <img id="cameraFromOther"></img>
        <button id="button1" onClick={this.handleShowVideo}>Show Video</button>
        <button id="test" onClick={this.shareImage}>Share</button>
        <button id="stop" onClick={this.stopImage}>Stop</button>
        <video id="video1" width="640px" height="480px"></video>
        <button id="voice" onClick={this.hearVoice}>Activate Voice Recognition</button>
        <form onSubmit={this.enterRoom}>
          <input type="text" value={this.state.roomValue} onChange={this.handleChangeValue} required></input>
          <input type="text" value = {this.state.nameValue} onChange={this.handleChangeName} required></input>
          <button type="submit" id="room">Room</button>
        </form>
      </header>

      <div>
        {this.state.messages.map(text => {
          return <p>{text}</p>
        })}
      </div>
    </div>
    )}
}

export default App;
