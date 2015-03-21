/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router'; 
import marked from 'marked';
import moment from 'moment';
import Spinner from './../components/Spinner.jsx';
import { PromiseUtils } from './../utils/Promise.js';


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
    this.initFBComments();   
  },

  initFBComments() {
    if (typeof(FB) !== 'undefined' && this.refs && this.refs.fb) {
        var el = React.findDOMNode(this.refs.fb);
        React.unmountComponentAtNode(el);
        FB.XFBML.parse(el);
    } else {
      setTimeout(this.initFBComments, 300);
    }
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
    // 
    let txt = this.state.text ? marked(this.state.text): 'loading';
    let date = this.state.date ? moment(this.state.date).fromNow() : '';
    var jsx;
    if (this.state.store_miss) {
      jsx = <Spinner/>
    } else {
      let url = 'http://oleg.smetan.in/#'+this.props.link;
      // 
      jsx = <div className="post markdown">
        <div className="date">{date}</div>
        <div className="markdown" dangerouslySetInnerHTML={{__html: txt}}/>
        <div ref="fb">
          <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5" data-colorscheme="light"></div>
        </div>
      </div>

    }
    return jsx;
  }

});

export default Item;