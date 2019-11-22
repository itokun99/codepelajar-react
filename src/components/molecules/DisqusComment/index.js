import { React, PropTypes } from 'libraries';
import { View, Button } from 'components/atoms';
import { config } from 'config/api/url';

class DisqusComment extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false
    };
  }

  init = async () => {
    try {
      const { currentUrl } = this.props;
      await this.setState({ isLoading: true });
      setTimeout(() => {
        const {
          url: { origin },
          disqus
        } = config;
        window.disqus_shortname = disqus.shortName;
        window.disqus_blogger_current_url = currentUrl || origin;
        window.disqus_blogger_homepage_url = origin;
        window.disqus_blogger_canonical_homepage_url = origin;

        const bloggerjs = document.createElement('script');
        bloggerjs.type = 'text/javascript';
        bloggerjs.async = true;
        bloggerjs.src = `//${disqus.shortName}.disqus.com/blogger_item.js`;
        (
          document.getElementsByTagName('head')[0] ||
          document.getElementsByTagName('body')[0]
        ).appendChild(bloggerjs);
        this.setState({
          isLoaded: true,
          isLoading: false
        });
      }, 2000);
    } catch (err) {
      this.setState({
        isLoading: false,
        isLoaded: true
      });
    }
  };

  render() {
    const { isLoading, isLoaded } = this.state;
    return (
      <View className="m-disqus__wrapper">
        <View className="m-disqus__action">
          {!isLoaded && (
            <Button
              onPress={!isLoading ? this.init : null}
              variant="primary"
              block
              large
            >
              {isLoading ? 'Memuat Komentar....' : 'Buka Komentar'}
            </Button>
          )}
        </View>
        <View className="m-disqus__body">
          <View id="comments"></View>
        </View>
      </View>
    );
  }
}

export default DisqusComment;
