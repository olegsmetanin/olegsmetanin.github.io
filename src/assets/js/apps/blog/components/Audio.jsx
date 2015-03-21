/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';

export default class Audio extends React.Component {

  constructor(props) {
    super(props);
    this.state = { playing: false };
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount () {    
    this._player = React.findDOMNode(this.refs.favmelody);
  }

  handleClick() {  
    let playing = !this.state.playing;
    this.setState({playing:playing});
    if (playing) {
      this._player.play();  
    } else {
      this._player.pause();
    }
  }

  render() {
    return <div className="audio">
      <audio ref="favmelody" loop>
        <source src={this.props.src} type="audio/mpeg"/>
      </audio>
      <div onClick={this.handleClick}>
        <i className={'fap fap-' + (this.state.playing ? 'pause': 'play')}></i>
        <div className="text">Music</div>
      </div>
    </div>;
  }

}