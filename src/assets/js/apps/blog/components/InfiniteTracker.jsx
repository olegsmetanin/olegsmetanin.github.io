import React from 'react';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

export default class InfiniteTracker extends React.Component {

  constructor(props) {
    super(props);
    this.onPageScroll = this.onPageScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    if (window) {
        window.addEventListener('scroll', this.onPageScroll);
        window.addEventListener('resize', this.onResize);
    }
    this.onPageScroll();
  }

  componentWillUnmount() {
    if (window) {
        window.removeEventListener('scroll', this.onPageScroll);
        window.removeEventListener('resize', this.onResize);
    }
  }

  onResize() {
    this.onPageScroll();
  }

  onPageScroll() {
    var el = React.findDOMNode(this.refs.itrac);
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 0) {
      this.props.loadMore();
    }
  }

  render() {
    return <div ref="itrac">{this.props.children}</div>;
  }

}
