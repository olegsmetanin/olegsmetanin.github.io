import React from 'react';
import { Link } from 'react-router';
import Spinner from './../components/Spinner.jsx';
import './../utils/Array.js';

export default class ExperimentTagsHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.AppStore = this.context.flux.getStore('appStore');
    this.getFromStore();
  }

  componentDidMount () {
    this.AppStore.addListener('change', this.getFromStore);
  }

  componentWillUnmount () {
    this.AppStore.removeListener('change', this.getFromStore);
  }

  getFromStore () {
    this.setState({items: this.AppStore.getExperimentTags()});
  }

  render() {
    let items = this.state.items;
    var jsx;
    if (items.STORE_MISS) {
        jsx = <Spinner/>;
    } else {
       jsx = <div key="0" className="post">
              <div className="tags">
              {items.map((tag, i) => {
                return <Link key={tag+i} className="tag" to="search" params={{query: tag}}>
                  {tag}
                </Link>;
              })}
              </div>
       </div>;
    }
    return jsx;
  }
}

ExperimentTagsHandler.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};
