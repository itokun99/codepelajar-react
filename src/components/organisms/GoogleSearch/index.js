import { React, PropTypes } from 'libraries';
import { View } from 'components/atoms';

class GoogleSearch extends React.Component {
  componentDidMount() {
    this.init();
  }

  init = () => {
    const el = document.createElement('script');
    el.src =
      'https://cse.google.com/cse.js?cx=005178091281942032751:rimwwhz9ofx';
    el.type = 'text/javascript';
    el.async = true;

    (
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(el);
  };

  render() {
    return (
      <React.Fragment>
        <View className="gcse-searchresults-only"></View>
      </React.Fragment>
    );
  }
}

export default GoogleSearch;
