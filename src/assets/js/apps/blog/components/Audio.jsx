/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';

// function togglePause(myAudio) {
//      if (myAudio.paused && myAudio.currentTime > 0 && !myAudio.ended) {
//          myAudio.play();
//      } else {
//          myAudio.pause();
//      }
// }

let Audio = React.createClass({

  getInitialState() {   
    return {
        playing:true
    }
  },
  
  componentDidMount () {
    this._player = this.getDOMNode().firstChild;
  },

  handleClick() { 
    let playing = !this.state.playing;
    this.setState({playing:playing});
    if (playing) {
      this._player.play();  
    } else {
      this._player.pause();
    }
  },  

  render() {
    return <div>
      <audio autoPlay loop>
        <source src={this.props.src} type="audio/mpeg"/>
      </audio>
      <div onClick={this.handleClick}>
        <i className={'fap fap-'+ (this.state.playing ? 'play': 'pause')}></i>
        <div className="text">Now playing</div>
      </div>
    </div>;
  }

});

export default Audio;