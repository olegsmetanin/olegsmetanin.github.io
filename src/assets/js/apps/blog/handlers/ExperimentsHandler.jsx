import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect, Navigation } from 'react-router';
import { Flummox, Actions, Store } from 'flummox';
import ItemList from './../components/ItemList.jsx';
import DocumentTitle from 'react-document-title';
import './../utils/Array.js'; 
import marked from 'marked';
import { debounce } from './../utils/Timer.js';  

let ExperimentsHandler = React.createClass({
  
  mixins: [State, Navigation],

  statics: {
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {  
    return {
        query:''
    }
  },

  componentWillMount () {
   let that = this;
   this.handleSearchDebounced = debounce(function () {
     this.handleSearch.apply(that, [this.state.query]);
   }, 500);
  },

  handleChange (event) {
    let query = event.target.value;
    this.setState({query: query});
    this.handleSearchDebounced();
  },

  handleSearch (query) {
    this.transitionTo('/search/'+query);
  },

  setSearchQuery(query) {  
    this.setState({query: query});
  },

  render() { 
    return <div className="content">
      <div className="search">
        <div className="search-wrap-1">
          <input type="text" value={this.state.query} onChange={this.handleChange} placeholder="Search in experiments"/>        
        </div>
      </div>
      <section>
            <ul className="menu with-search">
              <li className="item">
               <Link to="experimentlist" activeClassName="active">
                <i className="fap fap-posts2"></i>
                <div className="text">List</div>
               </Link>
              </li>
              <li className="item">
               <Link to="experimentarchive" activeClassName="active">
                <i className="fap fap-archive"></i>
                <div className="text">Archive</div>
               </Link>
              </li>
              <li className="item">
               <Link to="experimenttags" activeClassName="active">
                <i className="fap fap-tags"></i>
                <div className="text">Tags</div>
               </Link>
              </li>
            </ul>
        
           <RouteHandler setSearchQuery={this.setSearchQuery}/>

      </section>
    </div>
  }
});

export default ExperimentsHandler;