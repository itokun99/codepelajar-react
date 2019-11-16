import { React, PropTypes } from 'libraries';
import { View, Text, Anchor, Image, Skeleton } from 'components/atoms';
import { callFeaturedPost } from 'services';

const dummy = {
  title: 'Dokumentasi Simpel Template Black Clover',
  description:
    'Selamat datang di postingan dokumentasi template yang saya buat dan bernama BLACK CLOVER. Berikut dokumentasinya:Cara Setting TemplatePemasangan- Buka Blogger.com- Pergi ke menu Tema- Lihat kiri atas ada tombol backup/pulihkan dan klik- Akan ada Modal popup, tekan tombol "choose file"- Pilih template ini- DoneKonfigurasi kelengkapan templateKonfigurasi sosial dan verifikasiCari SOSIAL AND ',
  image:
    'https://2.bp.blogspot.com/-_EVYfMGHtDU/W2Vd0vSfVRI/AAAAAAAABOk/NuOGcRH2eI4o5R9fNUN8dmXjrmcYwjSWQCPcBGAYYCw/w400-h400-c/2b31cd88f286a2c063c58aa2176fdc30.png'
};

class FeatureBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      title: '',
      image: '',
      description: ''
    };
  }

  componentDidMount() {
    this.initDummy();
  }

  initDummy = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...dummy,
            isLoading: false
          });
        }, 3000);
      }
    );
  };

  init = async () => {
    try {
      const res = await callFeaturedPost();
      console.log('TCL: FeatureBlock -> init -> res', res);
    } catch (err) {
      throw err;
    }
  };

  renderSkeleton = () => {
    const boxStyle = {
      width: 400,
      height: 100,
      marginBottom: 14
    };
    return (
      <React.Fragment>
        <Skeleton style={boxStyle} />
        <Skeleton style={boxStyle} />
        <Skeleton style={boxStyle} />
      </React.Fragment>
    );
  };

  render() {
    const { title, description, image, isLoading } = this.state;

    if (isLoading) return this.renderSkeleton();
    return (
      <View className="o-feature-block__wrapper">
        <View className="o-feature-block__column">
          <View className="o-feature-block__inner">
            <Image
              className="o-feature-block__image"
              source={image}
              backgroundImage
              resizeMode="cover"
              title={title}
              alt={title}
            />
          </View>
        </View>
        <View className="o-feature-block__column">
          <View className="o-feature-block__inner o-feature-block__inner--text">
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
