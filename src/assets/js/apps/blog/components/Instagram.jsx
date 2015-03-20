/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router'; 
import marked from 'marked';
import moment from 'moment';
import Spinner from './../components/Spinner.jsx';

let Instagram = React.createClass({
  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {   
    this.AppStore = this.context.flux.getStore('appStore');
    return this.AppStore.getInstagrams(this.props.userid);
  },

  componentDidMount () {
    this.AppStore.addListener('change', this.onAppStoreChange);
    let appActions = this.context.flux.getActions('appActions');
    appActions.getInstagrams({userid:this.props.userid, clientid: this.props.clientid})
  },

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.onAppStoreChange);
  },

  onAppStoreChange () {
    this.setState(this.AppStore.getInstagrams(this.props.userid));
  },

  render () {
    var jsx;

    if (this.state.store_miss) {
      jsx = <Spinner/>
    } else {
      let data = this.state.data;
      jsx = <div>
          {data.map((item,i) => {
            let date = moment.unix(item.caption.created_time).fromNow();//moment(item.caption.created_time*1000);
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
            </div>         
          })}
      </div>
    }
    return jsx;
  }
});

export default Instagram;