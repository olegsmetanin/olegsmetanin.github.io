import React from 'react';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import should from 'should';

describe('Router', function () {

    it('router context is available in componentWillMount', (done) => {

        class Page extends React.Component {
            constructor (props) {
                super(props);
                should.not.exist(this.context);
            }

            componentWillMount() {
                this.context.should.have.property('router');
                this.context.router.getCurrentPath().should.equal('/home');
            }

            render() {
                this.context.should.have.property('router');
                this.context.router.getCurrentPath().should.equal('/home');
                return <div></div>;
            }
        }

        Page.contextTypes = {
          router: React.PropTypes.func.isRequired,
        };

        let routes = <Route path="/home" handler={Page}/>;

        Router.run(routes, '/home', function (Handler) {
            React.renderToString(<Handler />);
            done();
        });

    });
});
