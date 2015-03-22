import React from 'react';

export default class Spinner extends React.Component {

  render() {
    return <div className="spinner">
            <div className="rect1 blue"></div>
            <div className="rect2 blue"></div>
            <div className="rect3 blue"></div>
            <div className="rect4 blue"></div>
            <div className="rect5 blue"></div>
          </div>;
  }

}
