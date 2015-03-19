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
            return <div key={i} className="post">
              <img src={item.images.standard_resolution.url}/>
            </div>         
          })}
      </div>
    }
    return jsx;
  }
});

export default Instagram;