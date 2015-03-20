/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';

let Audio = React.createClass({

  getInitialState() {   
    return {
        playing: false
    }
  },
  
  componentDidMount () {
    this._player = this.getDOMNode().firstChild;
    this._player.load();
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
    return <div className="audio">
      <audio loop>
        <source src={this.props.src} type="audio/mpeg"/>
      </audio>
      <div onClick={this.handleClick}>
        <i className={'fap fap-' + (this.state.playing ? 'pause': 'play')}></i>
        <div className="text">Music</div>
      </div>
    </div>;
  }

});

export default Audio;