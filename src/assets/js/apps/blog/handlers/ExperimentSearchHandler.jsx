import React from 'react';
import ItemList from './../components/ItemList.jsx';
import Spinner from './../components/Spinner.jsx';

export default class ExperimentSearchHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      setSearchQuery: this.props.setSearchQuery,
    };

    this.getFromStore = this.getFromStore.bind(this);

  }

  static willTransitionFrom(transition, component) {
      if (transition.path.indexOf('/search/') !== 0) {
        component.state.setSearchQuery('');
      }
  }

  componentWillMount() {
    this.AppStore = this.context.flux.getStore('appStore');
    this.setState({
      query: this.context.router.getCurrentParams().query,
      items: this.AppStore.getSearchItems(this.context.router.getCurrentParams().query),
    });
  }

  componentWillReceiveProps() {
    if (this.context.router.getCurrentParams().query !== this.state.query) {
      this.setState({query: this.context.router.getCurrentParams().query, items: this.AppStore.getSearchItems(this.context.router.getCurrentParams().query)});
      this.state.setSearchQuery(this.context.router.getCurrentParams().query);
    }
  }

  componentDidMount() {
    this.AppStore.addListener('change', this.getFromStore);
    this.state.setSearchQuery(this.context.router.getCurrentParams().query);
  }

  componentWillUnmount() {
    this.AppStore.removeListener('change', this.getFromStore);
  }

  getFromStore () {
    this.setState({items: this.AppStore.getSearchItems(this.state.query)});
  }

  render() {
    let items = this.state.items;
    var jsx;

    if (items.STORE_MISS) {
        jsx = <Spinner/>;
    } else {
        jsx = <ItemList src={items}/>;
    }

    return jsx;
  }
}

ExperimentSearchHandler.contextTypes = {
  router: React.PropTypes.func.isRequired,
  flux: React.PropTypes.object.isRequired,
};
