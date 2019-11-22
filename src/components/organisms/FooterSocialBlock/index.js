import { React } from 'libraries';
import { View, Anchor, Icon } from 'components/atoms';
import { getSocial } from 'utils';

class FooterSocialBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const data = getSocial('footer');
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <View className="o-brand-logo__social">
        <View tag="ul" className="m-social-links">
          {data &&
            data.map((val, index) => (
              <View key={index} tag="li">
                <Anchor href={val.url} title={val.title}>
                  {val.title}
                  <Icon name={val.type} />
                </Anchor>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

export default FooterSocialBlock;
