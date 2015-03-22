import React from 'react';
import ItemList from './../components/ItemList.jsx';
import Spinner from './../components/Spinner.jsx';

export default class ExperimentArchiveHandler extends React.Component {

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
    this.setState({items: this.AppStore.getExperiments()});
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

ExperimentArchiveHandler.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};
