import React from 'react';
import moment from 'moment';
import Spinner from './../components/Spinner.jsx';

export default class Instagram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getFromStore = this.getFromStore.bind(this);
  }

  componentWillMount() {
    this.AppStore = this.context.flux.getStore('appStore');
    this.getFromStore();
  }

  componentDidMount () {
    this.AppStore.addListener('change', this.getFromStore);
    let appActions = this.context.flux.getActions('appActions');
    appActions.getInstagrams({userid: this.props.userid, clientid: this.props.clientid});
  }

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.getFromStore);
  }

  getFromStore () {
    this.setState(this.AppStore.getInstagrams(this.props.userid));
  }

  render () {
    var jsx;

    if (this.state.STORE_MISS) {
      jsx = <Spinner/>;
    } else {
      let data = this.state.data;
      jsx = <div>
          {data.map((item, i) => {
            let date = moment.unix(item.caption.created_time).fromNow();
            return <div key={i} className="post instagram">
              <div className="date-wrap">
                <span className="date">{date}</span>
              </div>
              <div className="notes">
              <span className="caption">
                {item.caption.text}
              </span>
              </div>

              <a href={item.link} className="imgwrap" target="_blank">
                <img src={item.images.standard_resolution.url}/>
              </a>

              <div className="notes">
                <span className="likes">
                  <i className="fap fap-heart"></i>
                  {item.likes.count}
                </span>
                <span className="comments">
                  <i className="fap fap-comment"></i>
                  {item.comments.count}
                </span>
              </div>

              <div>


              </div>
            </div>;
          })}
      </div>;
    }
    return jsx;
  }
}

Instagram.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};
