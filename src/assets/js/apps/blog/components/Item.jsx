/*global FB:true */

import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import marked from 'marked';
import moment from 'moment';
import Spinner from './../components/Spinner.jsx';
import { PromiseUtils } from './../utils/Promise.js';


export default class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getFromStore = this.getFromStore.bind(this);
    this.initFBComments = this.initFBComments.bind(this);
  }

  componentWillMount() {
    this.AppStore = this.context.flux.getStore('appStore');
    this.getFromStore();
  }

  componentDidMount () {
    this.AppStore.addListener('change', this.getFromStore);
    this.getResource(this.props.link);
    this.initFBComments();
  }

  componentWillUnmount () {
    this.AppStore.removeListener('change', this.getFromStore);
  }

  getFromStore () {
    this.setState(this.AppStore.getResource(this.props.link));
  }

  getResource (link) {
    let appActions = this.context.flux.getActions('appActions');
    let siteMap = this.AppStore.getSiteMap();
    let resourceDef = siteMap[link];
    resourceDef.link = link;
    appActions.getResource(resourceDef);
  }

  initFBComments() {
    if ( typeof (FB) !== 'undefined' && this.refs && this.refs.fb) {
        var el = React.findDOMNode(this.refs.fb);
        React.unmountComponentAtNode(el);
        FB.XFBML.parse(el);
    } else {
      setTimeout(this.initFBComments, 300);
    }
  }

  render () {

    let txt = this.state.text ? marked(this.state.text): 'loading';
    let date = this.state.date ? moment(this.state.date).fromNow() : '';
    var jsx;
    if (this.state.store_miss) {
      jsx = <Spinner/>;
    } else {
      let url = 'http://oleg.smetan.in/#'+this.props.link;
      jsx = <div className="post markdown">
        <div className="date">{date}</div>
        <div className="markdown" dangerouslySetInnerHTML={{__html: txt}}/>
        <div ref="fb">
          <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5" data-colorscheme="light"></div>
        </div>
      </div>;

    }
    return jsx;
  }
}

Item.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};
