import { React, PropTypes } from 'libraries';
import { View } from 'components/atoms';
import { elementId } from 'utils';

class AddThis extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string
  };

  static defaultProps = {
    id: ''
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { id } = this.props;
    if (!id) return null;
    const el = document.createElement('script');
    el.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-${id}`;
    el.type = 'text/javascript';
    el.async = true;
    (
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(el);
    console.log('loaded');
  };

  render() {
    return <View id="addThis"></View>;
  }
}

export default AddThis;
