import React from 'react';
import moment from 'moment';
import Spinner from './../components/Spinner.jsx';
import Masonry from 'masonry-layout';


export default class Pinterest extends React.Component {

  constructor(props, context) {
    super(props);
    this.AppStore = context.flux.getStore('appStore');
    this.state={};
    this.getFromStore = this.getFromStore.bind(this);
  }

  componentWillMount() {
    this.getFromStore();
  }

  componentDidMount () {
    this.AppStore.addListener('change', this.getFromStore);
    let appActions = this.context.flux.getActions('appActions');
    appActions.getPins(this.props.username);
  }

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.getFromStore);
  }

  getFromStore () {
    this.setState(this.AppStore.getPins(this.props.username));
  }


////            board:{item.board.name}
    componentDidUpdate() {
      let mC = React.findDOMNode(this.refs.masonry);
      if (mC && !this._masonry) {
        this._masonry = new Masonry( mC, {
          // options
          // columnWidth: 237,
          itemSelector: '.pinterest_pin'
        });
      }


    }


  render () {
    var jsx;



    if (this.state.STORE_MISS) {
      jsx = <Spinner/>;
    } else {
      let pins = this.state.data.pins;

      jsx = <div ref="masonry" className="post pinterest">
        {pins.map((item, i) => {
          let link = 'https://www.pinterest.com/pin/'+item.id;
          return <div key={'pin+'+i} className="pinterest_pin">
            <a href={link} className="pinterest_pin_pinimg" target="_blank">
              <div className="pinterest_pin_description">
                {item.description}
              </div>
              <img src={item.images['237x'].url} width={item.images['237x'].width} height={item.images['237x'].height}/>
            </a>

          </div>
        })}
      </div>;
    }
    return jsx;
  }
}

Pinterest.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};
