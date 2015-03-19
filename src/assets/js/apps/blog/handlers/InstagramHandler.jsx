import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect, Navigation } from 'react-router';
import { Flummox, Actions, Store } from 'flummox';
import ItemList from './../components/ItemList.jsx';
import DocumentTitle from 'react-document-title';
import './../utils/Array.js'; 
import marked from 'marked';
import { debounce } from './../utils/Timer.js';  
import Instagram from './../components/Instagram.jsx';

let InstagramHandler = React.createClass({
  
  mixins: [State, Navigation],

  statics: {
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  render() { 
    return <div className="content">
      <section>
        <ul className="menu without-search">
          <li className="item">
           <Link to="instagram" activeClassName="active">
            <i className="fap fap-instagram"></i>
            <div className="text">Photos</div>
           </Link>
          </li>
        </ul>

        <Instagram userid="54715992" clientid="4c91ac279d3f4625a07fe93ae8236742"/>

      </section>
    </div>
  }

});

export default InstagramHandler;