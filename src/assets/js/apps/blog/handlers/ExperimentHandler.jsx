import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import { Flummox, Actions, Store } from 'flummox';
import ItemList from './../components/ItemList.jsx';
import DocumentTitle from 'react-document-title';
import './../utils/Array.js'; 
import marked from 'marked';
import Item from './../components/Item.jsx';


let ExperimentHandler = React.createClass({
  mixins: [State],

  render() {
    return <Item key="0" link={this.getPath()}/>
  }
});

export default ExperimentHandler;