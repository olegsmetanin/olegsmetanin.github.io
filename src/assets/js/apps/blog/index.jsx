'use strict';
/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';
import Router from 'react-router';
import Flux from './Flux.js';
import FluxComponent from 'flummox/component'
import routes from './routes.js';
import { performRouteHandlerStaticMethod } from './utils/Promise.js';
import 'babel/polyfill';
import FastClick from 'fastclick';

FastClick.attach(document.body);

export default function(divid) {

  let flux = new Flux(); 

  Router.run(routes, (Handler, state) => {

    async function run() {

      await performRouteHandlerStaticMethod(state.routes, 'routerWillRunOnClient', state, flux);

      React.render(<FluxComponent
        flux={flux}
        render={() => <Handler />} />, document.getElementById(divid));

    }
 
    run().catch(error => {
      throw error;
    });

  })


}