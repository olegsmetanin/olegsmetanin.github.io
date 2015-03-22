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

export default class ExperimentArchiveHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.AppStore = this.context.flux.getStore('appStore');
    this.getFromStore();
  }

  componentDidMount () {
    this.AppStore.addListener('change', this.getFromStore);
  }

  componentWillUnmount () {
    this.AppStore.removeListener('change', this.getFromStore);
  }

  getFromStore () {
    this.setState({items: this.AppStore.getExperiments()});
  }

  render() {
    let items = this.state.items;
    var jsx;

    if (items.store_miss) {
        jsx = <Spinner/>;
    } else {
        jsx = <ItemList src={items}/>;
    }

    return jsx;
  }
}

ExperimentArchiveHandler.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};