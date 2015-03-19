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
import moment from 'moment';

function entries(obj) {
   return (for (key of Object.keys(obj)) [key, obj[key]]);
}

let ExperimentArchiveHandler = React.createClass({
  mixins: [State],

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {   
    this.AppStore = this.context.flux.getStore('appStore');
    let items = this.AppStore.getExperiments(); 
    return {
        items: items
    }
  },

  componentDidMount () {
    this.AppStore.addListener('change', this.onAppStoreChange);
  },

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.onAppStoreChange);
  },

  onAppStoreChange () {
    this.setState({items: this.AppStore.getExperiments()});
  },

  render() {
    let items = this.state.items;
    var jsx;

    if (items.store_miss) {
        jsx = <Spinner/>
    } else {
        jsx = <ItemList src={items}/>
    }

    return jsx;
  }
});

export default ExperimentArchiveHandler;