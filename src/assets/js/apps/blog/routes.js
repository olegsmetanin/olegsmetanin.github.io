import React from 'react';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import AppHandler from './handlers/AppHandler.jsx';

import ExperimentsHandler from './handlers/ExperimentsHandler.jsx';
import ExperimentHandler from './handlers/ExperimentHandler.jsx';
import ExperimentListHandler from './handlers/ExperimentListHandler.jsx';
import ExperimentArchiveHandler from './handlers/ExperimentArchiveHandler.jsx';
import ExperimentTagsHandler from './handlers/ExperimentTagsHandler.jsx';
import ExperimentSearchHandler from './handlers/ExperimentSearchHandler.jsx';
import CVHandler from './handlers/CVHandler.jsx';
import InstagramHandler from './handlers/InstagramHandler.jsx';

let routes = (
  <Route handler={AppHandler}>
	<Redirect from="/" to="/experiments"/>
    <Route name="experiments" handler={ExperimentsHandler}>
    	<DefaultRoute name="experimentlist" handler={ExperimentListHandler}/>
    	<Route name="experimentarchive" path="/experiments/archive" handler={ExperimentArchiveHandler}/>
		  <Route name="experimenttags" path="/experiments/tags" handler={ExperimentTagsHandler}/>
    	<Route name="experiment" path="/experiment/:link" handler={ExperimentHandler}/>
    	<Route name="search" path="/search/?:query?" handler={ExperimentSearchHandler}/>
    </Route>
    <Route name="cv" path="/cv" handler={CVHandler}/>
    <Route name="instagram" path="/instagram" handler={InstagramHandler}/>
  </Route>
);

export default routes;