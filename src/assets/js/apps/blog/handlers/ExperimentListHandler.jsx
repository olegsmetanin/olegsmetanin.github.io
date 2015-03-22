import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import { Flummox, Actions, Store } from 'flummox';
import ItemList from './../components/ItemList.jsx';
import DocumentTitle from 'react-document-title';
import Item from './../components/Item.jsx';
import InfiniteTracker from './../components/InfiniteTracker.jsx';
import Spinner from './../components/Spinner.jsx';

import './../utils/Array.js';
import marked from 'marked';

let ExperimentListHandler = React.createClass({
  mixins: [State],

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    this.AppStore = this.context.flux.getStore('appStore');
    return {
        index: 0,
        count: 1,
        posts: this.AppStore.getLastExperiments(0, 1),
        noMore: false,
    };
  },

  componentDidMount () {
    this.AppStore.addListener('change', this.onAppStoreChange);
  },

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.onAppStoreChange);
  },

  onAppStoreChange () {
    this.setState({posts: this.AppStore.getLastExperiments(this.state.index, this.state.count)});
  },

  loadMore() {
    var newCount = this.state.count + 3;
    var posts = this.AppStore.getLastExperiments(this.state.index, newCount);
    var noMore = posts.length < newCount;
    var newState = {count: posts.length, posts: posts, noMore: noMore};
    this.setState(newState);

  },

  render() {
    let posts = this.state.posts;
    if (posts.store_miss) {
        return <Spinner/>;
    } else {
        return <div>
          <div>{this.props.query}</div>
          {posts.map((p, i) => {
            let key = 'post'+i;
            return <Item key={key} link={p.link}/>;
          })}
          <InfiniteTracker key="inf0" loadMore={this.loadMore}>
          </InfiniteTracker>

         </div>;
    }
  },
});

export default ExperimentListHandler;
