import { React } from 'libraries';
import { View, Text, Anchor, Image, Skeleton, Button } from 'components/atoms';
import { callFeaturedPost } from 'services';
import { isLocalhost, getImage } from 'utils';

const dummy = {
  title: 'Dokumentasi Simpel Template Black Clover',
  description:
    'Selamat datang di postingan dokumentasi template yang saya buat dan bernama BLACK CLOVER. Berikut dokumentasinya:Cara Setting TemplatePemasangan- Buka Blogger.com- Pergi ke menu Tema- Lihat kiri atas ada tombol backup/pulihkan dan klik- Akan ada Modal popup, tekan tombol "choose file"- Pilih template ini- DoneKonfigurasi kelengkapan templateKonfigurasi sosial dan verifikasiCari SOSIAL AND ',
  image:
    'https://2.bp.blogspot.com/-_EVYfMGHtDU/W2Vd0vSfVRI/AAAAAAAABOk/NuOGcRH2eI4o5R9fNUN8dmXjrmcYwjSWQCPcBGAYYCw/w400-h400-c/2b31cd88f286a2c063c58aa2176fdc30.png',
  url:
    'https://nextcodepelajar.blogspot.com/2018/08/dokumentasi-simpel-template-black-clover.html'
};

class FeatureBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoaded: false,
      title: '',
      image: '',
      description: '',
      url: '',
      showImage: false
    };
  }

  componentDidMount() {
    window.addEventListener('mousewheel', this.imageLoading);
    window.addEventListener('touchmove', this.imageLoading);
    if (isLocalhost) return this.initDummy();
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.imageLoading);
    window.removeEventListener('touchmove', this.imageLoading);
  }

  imageLoading = () => {
    const { showImage } = this.state;
    if (!showImage) {
      this.setState({
        showImage: true
      });
    }
  };

  initDummy = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...dummy,
            isLoading: false,
            isLoaded: true
          });
        }, 3000);
      }
    );
  };

  init = async () => {
    try {
      await this.setState({ isLoading: true });
      const data = await callFeaturedPost();
      await this.setState({
        ...data,
        isLoading: false,
        isLoaded: true
      });
    } catch (err) {
      this.setState({
        isLoading: false
      });
    }
  };

  renderSkeleton = type => {
    if (type === 'text') {
      return (
        <React.Fragment>
          <Skeleton
            style={{ width: '100%', paddingBottom: 40, marginBottom: 32 }}
          />
          <Skeleton
            style={{ width: '60%', paddingBottom: 25, marginBottom: 14 }}
          />
          <Skeleton
            style={{ width: '100%', paddingBottom: 25, marginBottom: 14 }}
          />
          <Skeleton
            style={{ width: '80%', paddingBottom: 25, marginBottom: 14 }}
          />
          <Skeleton
            style={{ width: '40%', paddingBottom: 25, marginBottom: 60 }}
          />
          <Skeleton
            style={{ width: '40%', paddingBottom: 60, marginBottom: 14 }}
          />
        </React.Fragment>
      );
    }
    if (type === 'image') {
      return (
        <Skeleton
          style={{
            width: '100%',
            paddingBottom: '80%'
          }}
        />
      );
    }
  };

  render() {
    const {
      title,
      description,
      image,
      url,
      isLoading,
      isLoaded,
      showImage
    } = this.state;
    return (
      <View className="o-feature-block__wrapper">
        <View className="o-feature-block__column">
          <View className="o-feature-block__inner">
            {isLoading && this.renderSkeleton('image')}
            {isLoaded && (
              <Image
                className="o-feature-block__image"
                source={showImage ? getImage(image) : ''}
                backgroundImage
                resizeMode="cover"
                title={title}
                alt={title}
              />
            )}
          </View>
        </View>
        <View className="o-feature-block__column">
          <View className="o-feature-block__inner o-feature-block__inner--text">
            {isLoading && this.renderSkeleton('text')}
            {isLoaded && (
              <React.Fragment>
                <Anchor href={url} title={title}>
                  <Text tag="h2" className="o-feature-block__title">
                    {title}
                  </Text>
                </Anchor>
                <Text
                  className="o-feature-block__description"
                  style={{ marginBottom: 40 }}
                >
                  {description}
                </Text>
                <Button variant="primary" anchor href={url} title={title}>
                  Read More
                </Button>
              </React.Fragment>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default FeatureBlock;
