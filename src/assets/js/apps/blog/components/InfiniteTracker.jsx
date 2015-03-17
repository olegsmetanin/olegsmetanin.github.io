/*jshint -W018, -W040, -W064, -W083, -W086 */

import React from 'react';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

let InfiniteTracker = React.createClass({

  componentDidMount() {
    if (window) {
        window.addEventListener('scroll', this.onPageScroll);
        window.addEventListener('resize', this.onResize);
    }
    this.onPageScroll();
  },

  componentWillUnmount() {
    if (window) {
        window.removeEventListener('scroll', this.onPageScroll);
        window.removeEventListener('resize', this.onResize);
    }
  },

  onResize(e) {
    this.onPageScroll();
  },

  onPageScroll() {
    var el = this.getDOMNode();
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 0) {
      this.props.loadMore();
    }
  },

  render() {
    return <div>{this.props.children}</div>;
  }

});

export default InfiniteTracker;