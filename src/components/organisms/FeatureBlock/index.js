import { React, PropTypes } from 'libraries';
import { View, Text, Anchor, Image } from 'components/atoms';
import { callFeaturedPost } from 'services';

const dummy = {
  title: 'Dokumentasi Simpel Template Black Clover',
  image:
    'https://2.bp.blogspot.com/-_EVYfMGHtDU/W2Vd0vSfVRI/AAAAAAAABOk/NuOGcRH2eI4o5R9fNUN8dmXjrmcYwjSWQCPcBGAYYCw/s1600/2b31cd88f286a2c063c58aa2176fdc30.png'
};

class FeatureBlock extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: '',
      description: ''
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    try {
      const res = await callFeaturedPost();
      console.log('TCL: FeatureBlock -> init -> res', res);
    } catch (err) {
      throw err;
    }
  };

  render() {
    const { title, description, image } = this.props;
    return (
      <View className="o-feature-block__wrapper">
        <View className="o-feature-block__column">
          <View className="o-feature-block__inner">
            <Image source={image} backgroundImage title={title} alt={title} />
          </View>
        </View>
        <View className="o-feature-block__column">
          <View className="o-feature-block__inner">
            <Anchor>
              <Text tag="h2" className="o-feature-block__title">
                {title}
              </Text>
            </Anchor>
            <Text className="o-feature-block__description">{description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default FeatureBlock;
