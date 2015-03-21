import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router'; 
import Audio from './../components/Audio.jsx';

let AppHandler = React.createClass({
  
  statics: {
    async routerWillRunOnClient(state, flux) {
      ga('send', 'pageview', '#'+state.path);
      let sitemap = flux.getStore('appStore').getSiteMap();
      if (Object.getOwnPropertyNames(sitemap).length === 0) {
        let appActions = flux.getActions('appActions');
        await appActions.getSiteMap();
        await appActions.getSearchIndex();
      }
    }
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <div>
        <div className="top-header">
          <div className="top-header-wrap-1">
            <div className="top-header-wrap-2">
              <div className="top-header-h1 z-depth-1">
                Scala
              </div>
              <div className="top-header-and">
                &
              </div>
              <div className="top-header-h1 z-depth-1">
                JS
              </div>
              <a className="face" href="/">
                <img className="avatar" src="assets/img/avatar.jpg"/>
                <div className="name">
                  Oleg Smetanin
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="top-menu">
          <div className="top-menu-wrap-1">
            <div className="top-menu-wrap-2">
              <div className="top-menu-wrap-3">
                <ul className="menu pull-left">
                  <li className="item">
                   <Link to="experiments" activeClassName="active">
                    <i className="fap fap-experiments"></i>
                    <div className="text">Experiments</div>
                   </Link>
                  </li>
                  <li className="item">
                    <Link to="cv" activeClassName="active">
                    <i className="fap fap-cv"></i>
                    <div className="text">CV</div>
                   </Link>
                  </li>
                  <li className="item">
                    <Link to="instagram" activeClassName="active">
                    <i className="fap fap-instagram"></i>
                    <div className="text">Instagram</div>
                   </Link>
                  </li>
                  <li className="item">
                    <Audio src="http://playmusics.net/get-audio/aHR0cDovL2NzMTI0OXY0LnZrLm1lL3U1OTc3ODE3L2F1ZGlvcy9hN2E2YWRmYmZmNDMubXAzP2V4dHJhPXFsd3JfUnpsaU5nX0NieEZSZlM4NklVS1dWQXRkaTlzRXNNSEltUWc3U2FiTHU4M0JOQVRhYW1hLTRJbXlCSGtkaHpJNGpLR0RaTlJBOW1SdmpDVWZWTW5yODNEWTlDa3h3?filename=Secret+Garden-Lotus+%28%D0%A6%D0%B2%D0%B5%D1%82%D0%B5%D0%BD%D0%B8%D0%B5+%D1%81%D0%B0%D0%BA%D1%83%D1%80%D1%8B%29.mp3"/>
                  </li>
                </ul>
                <ul className="menu pull-right">
                  <li className="item">
                   <a href="mailto:oleg@smetan.in">
                    <i className="fap fap-mail"></i>
                    <div className="text">Mail</div>
                   </a>
                  </li> 
                  <li className="item">
                   <a href="https://github.com/olegsmetanin" target="_blank">
                    <i className="fap fap-github"></i>
                    <div className="text">Github</div>
                   </a>
                  </li>                  
                  <li className="item">
                   <a href="https://www.linkedin.com/pub/oleg-smetanin/81/82/618" target="_blank">
                    <i className="fap fap-linkedin"></i>
                    <div className="text">LinkedIn</div>
                   </a>
                  </li>
                  <li className="item">
                   <a href="https://twitter.com/oleg_smetanin" target="_blank">
                    <i className="fap fap-twitter"></i>
                    <div className="text">Twitter</div>
                   </a>
                  </li>

                </ul>

              </div>
            </div>
          </div>
        </div>
        <RouteHandler />
      </div>
      );
  },
});

export default AppHandler;