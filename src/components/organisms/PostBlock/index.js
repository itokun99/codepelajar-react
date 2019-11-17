import { React } from 'libraries';
import _ from 'lodash';
import { View, Skeleton, Button } from 'components/atoms';
import { PostCard } from 'components/molecules';
import { callPosts } from 'services';
import { createAuthor } from 'utils';

const dummy = {
  title: 'Dokumentasi Simpel Template Black Clover',
  description:
    'Selamat datang di postingan dokumentasi template yang saya buat dan bernama BLACK CLOVER. Berikut dokumentasinya:Cara Setting TemplatePemasangan- Buka Blogger.com- Pergi ke menu Tema- Lihat kiri atas ada tombol backup/pulihkan dan klik- Akan ada Modal popup, tekan tombol "choose file"- Pilih template ini- DoneKonfigurasi kelengkapan templateKonfigurasi sosial dan verifikasiCari SOSIAL AND ',
  image:
    'https://1.bp.blogspot.com/-fSy9M-70Ozg/XMmtX14DsNI/AAAAAAAACio/EPS2DNWQ23weG7L_0diYUvpwgbhufmSogCLcBGAs/w315-h196-p-k-no-nu/grid%2Bposter%2B-1.png',
  url:
    'https://nextcodepelajar.blogspot.com/2018/08/dokumentasi-simpel-template-black-clover.html',
  label: ['Tutorial', 'Website']
};

const dummyAuthor = {
  id: '08567324068406956261',
  image:
    'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35',
  name: 'Indrawan Lisanto',
  url: 'https://www.blogger.com/profile/08567324068406956261'
};

class FeatureBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoaded: false,
      nextToken: null,
      posts: []
    };
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    const { nextToken } = this.state;
    if (prevState.nextToken && !nextToken) {
      console.log('this ended');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isLoaded: true
      });
      return false;
    }
    return true;
  }

  init = async () => {
    try {
      const { nextToken, posts } = this.state;
      const payload = {
        params: {
          pageToken: nextToken
        }
      };
      await this.setState({ isLoading: true });
      const response = nextToken ? await callPosts(payload) : await callPosts();
      setTimeout(() => {
        if (nextToken) {
          return this.setState({
            isLoading: false,
            posts: [...posts, ..._.get(response, 'items', [])],
            nextToken: _.get(response, 'nextPageToken', null)
          });
        }
        return this.setState({
          isLoading: false,
          posts: _.get(response, 'items', []),
          nextToken: _.get(response, 'nextPageToken', null)
        });
      }, 2000);
    } catch (err) {
      this.setState({
        isLoading: false,
        isLoaded: true
      });
    }
  };

  renderSkeleton = () =>
    [1, 2, 3].map(value => (
      <View key={value} className="o-post-block__column">
        <Skeleton
          style={{
            paddingBottom: '64%',
            width: '100%',
            marginBottom: 24
          }}
        />
        <View
          style={{
            padding: 20
          }}
        >
          <Skeleton
            style={{
              paddingBottom: 30,
              width: '100%',
              marginBottom: 15
            }}
          />
          <Skeleton
            style={{
              paddingBottom: 20,
              width: '80%',
              marginBottom: 10
            }}
          />
          <Skeleton
            style={{
              paddingBottom: 20,
              width: '50%',
              marginBottom: 0
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 14,
            paddingRight: 14
          }}
        >
          <Skeleton
            style={{
              borderRadius: 30,
              height: 30,
              width: 30,
              marginRight: 14
            }}
          />
          <Skeleton
            style={{
              height: 15,
              width: 100
            }}
          />
        </View>
      </View>
    ));

  render() {
    const { posts, isLoading, isLoaded } = this.state;
    return (
      <View className="o-post-block__wrapper">
        <View className="o-post-block__row">
          {posts &&
            posts.map((post, index) => (
              <View key={index} className="o-post-block__column">
                <PostCard
                  url={post.url}
                  title={post.title}
                  image={_.get(post, 'images[0].url', '')}
                  author={createAuthor(post.author)}
                  label={post.labels}
                />
              </View>
            ))}
          {isLoading && this.renderSkeleton()}
        </View>
        {!isLoaded && !isLoading && (
          <View className="text-align-center">
            <Button onPress={this.init} variant="primary">
              Load More
            </Button>
          </View>
        )}
      </View>
    );
  }
}

export default FeatureBlock;
