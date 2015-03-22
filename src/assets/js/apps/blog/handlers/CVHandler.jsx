import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect, Navigation } from 'react-router';
import { Flummox, Actions, Store } from 'flummox';
import ItemList from './../components/ItemList.jsx';
import DocumentTitle from 'react-document-title';
import './../utils/Array.js';
import marked from 'marked';
import { debounce } from './../utils/Timer.js';
import Item from './../components/Item.jsx';

export default class CVHandler extends React.Component {

  render() {
    return <div className="content">
      <section>
        <ul className="menu without-search">
          <li className="item">
           <Link to="cv" activeClassName="active">
            <i className="fap fap-cv"></i>
            <div className="text">Text</div>
           </Link>
          </li>
        </ul>

        <Item link="/cv"/>

      </section>
    </div>;

  }

}
