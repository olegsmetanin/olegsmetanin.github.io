import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import { Flummox, Actions, Store } from 'flummox';
import ItemList from './../components/ItemList.jsx';
import DocumentTitle from 'react-document-title';
import Spinner from './../components/Spinner.jsx';

import { debounce } from './../utils/Timer.js';
import moment from 'moment';

let ExperimentSearchHandler = React.createClass({
  mixins: [State],

  statics: {
    willTransitionFrom(transition, component) {
      if (transition.path.indexOf('/search/') !== 0) {
        component.state.setSearchQuery('');
      }
    },
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    this.AppStore = this.context.flux.getStore('appStore');
    return {
      query: this.getParams().query,
      setSearchQuery: this.props.setSearchQuery,
      items: this.AppStore.getSearchItems(this.getParams().query),
    };
  },

  componentWillReceiveProps() {
    if (this.getParams().query !== this.state.query) {
      this.setState({query: this.getParams().query, items: this.AppStore.getSearchItems(this.getParams().query)});
      this.state.setSearchQuery(this.getParams().query);
    }
  },

  componentDidMount() {
    this.AppStore.addListener('change', this.onAppStoreChange);
    this.state.setSearchQuery(this.getParams().query);
  },

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.onAppStoreChange);
  },

  onAppStoreChange () {
    this.setState({items: this.AppStore.getSearchItems(this.state.query)});
  },

  render() {
    let items = this.state.items;
    var jsx;

    if (items.store_miss) {
        jsx = <Spinner/>;
    } else {
        jsx = <ItemList src={items}/>;
    }

    return jsx;
  },
});

export default ExperimentSearchHandler;
