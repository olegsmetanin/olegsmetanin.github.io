/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';

let Spinner = React.createClass({

  render() {
    return <div className="spinner">
            <div className="rect1 blue"></div>
            <div className="rect2 blue"></div>
            <div className="rect3 blue"></div>
            <div className="rect4 blue"></div>
            <div className="rect5 blue"></div>
          </div>;
  }

});

export default Spinner;