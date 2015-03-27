import React from 'react';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import should from 'should';

describe('Router', function () {

  it('router context is available in componentWillMount', (done) => {

    class Widget extends React.Component {
      constructor (props, context) {
        super(props);
        should.not.exist(this.context);
        should.exist(context);
      }

      componentWillMount() {
        this.context.should.have.property('router');
        this.context.router.getCurrentPath().should.equal('/page/1');
        this.context.router.getCurrentParams().should.have.property('id', '1');
      }

      render() {
        this.context.should.have.property('router');
        this.context.router.getCurrentPath().should.equal('/page/1');
        this.context.router.getCurrentParams().should.have.property('id', '1');
        return <div></div>;
      }
    }

    Widget.contextTypes = {
      router: React.PropTypes.func.isRequired,
    };

    class Page extends React.Component {
      constructor (props, context) {
        super(props);
        should.not.exist(this.context);
        should.exist(context);
      }

      componentWillMount() {
        this.context.should.have.property('router');
        this.context.router.getCurrentPath().should.equal('/page/1');
        this.context.router.getCurrentParams().should.have.property('id', '1');
      }

      render() {
        this.context.should.have.property('router');
        this.context.router.getCurrentPath().should.equal('/page/1');
        this.context.router.getCurrentParams().should.have.property('id', '1');
        return <div><Widget/></div>;
      }
    }

    Page.contextTypes = {
      router: React.PropTypes.func.isRequired,
    };

    class Layout extends React.Component {
      constructor (props, context) {
        super(props);
        should.not.exist(this.context);
        should.exist(context);
      }

      componentWillMount() {
        this.context.should.have.property('router');
        this.context.router.getCurrentPath().should.equal('/page/1');
        this.context.router.getCurrentParams().should.have.property('id', '1');
      }

      render() {
        this.context.should.have.property('router');
        this.context.router.getCurrentPath().should.equal('/page/1');
        this.context.router.getCurrentParams().should.have.property('id', '1');
        return <div><RouteHandler/></div>;
      }
    }

    Layout.contextTypes = {
      router: React.PropTypes.func.isRequired,
    };

    let routes = <Route handler={Layout}>
      <Route path="/page/?:id?" handler={Page}/>
    </Route>;

    Router.run(routes, '/page/1', function (Handler) {
      React.renderToString(<Handler />);
      done();
    });

  });

});