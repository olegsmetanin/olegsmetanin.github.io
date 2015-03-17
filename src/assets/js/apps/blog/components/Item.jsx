/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router'; 
import marked from 'marked';
import moment from 'moment';

let Item = React.createClass({
  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {   
    this.AppStore = this.context.flux.getStore('appStore');
    return this.AppStore.getResource(this.props.link);
  },

  componentDidMount () {
    this.AppStore.addListener('change', this.onAppStoreChange);
    this.getResource(this.props.link);
  },

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.onAppStoreChange);
  },

  onAppStoreChange () {
    this.setState(this.AppStore.getResource(this.props.link));
  },

  getResource (link) {
    let appActions = this.context.flux.getActions('appActions');
    let siteMap = this.AppStore.getSiteMap();  
    let resourceDef = siteMap[link];
    resourceDef.link = link;
    appActions.getResource(resourceDef);
  },


    render () {
      let txt = this.state.text ? marked(this.state.text): 'loading';
      let date = this.state.date ? moment(this.state.date).fromNow() : '';
      var jsx;
      if (this.state.store_miss) {
        jsx = <div className="spinner">
            <div className="rect1 blue"></div>
            <div className="rect2 blue"></div>
            <div className="rect3 blue"></div>
            <div className="rect4 blue"></div>
            <div className="rect5 blue"></div>
          </div>
      } else {
        jsx = <div className="post">
          <div className="date">{date}</div>
          <div className="markdown" dangerouslySetInnerHTML={{__html: txt}}/>
        </div>

      }
      return jsx;
    }

});

export default Item;