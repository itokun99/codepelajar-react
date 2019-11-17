import { React } from 'libraries';
import { getPopularPostData } from 'services';
import { View, Text, Anchor, Image, Skeleton } from 'components/atoms';
import { PostList } from 'components/molecules';

class PopularPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      popularPost: {
        title: '',
        data: []
      }
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    try {
      await this.setState({ isLoading: true });
      const data = await getPopularPostData();

      setTimeout(() => {
        this.setState({
          isLoading: false,
          popularPost: {
            ...data
          }
        });
      }, 3000);
    } catch (err) {
      console.log('TCL: PopularPost -> init -> err', err);
      this.setState({
        isLoading: false
      });
    }
  };

  render() {
    const { popularPost, isLoading } = this.state;
    console.log('popularPost ==>', popularPost);
    return (
      <View className="o-popular-post__wrapper">
        <View className="o-popular-post__header">
          <Text className="o-popular-post__title">{popularPost.title}</Text>
        </View>
        <View className="o-popular-post__body">
          <View className="o-popular-post__order">
            {isLoading &&
              [1, 2, 3, 4, 5].map(val => (
                <View
                  key={val}
                  style={{
                    marginBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    borderBottomStyle: 'solid',
                    paddingBottom: 16,
                    alignItems: 'center'
                  }}
                  className="d-flex w-full"
                >
                  <Skeleton
                    style={{ width: 50, height: 50, marginRight: 14 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Skeleton
                      style={{ width: '100%', height: 15, marginBottom: 5 }}
                    />
                    <Skeleton
                      style={{ width: '80%', height: 15, marginBottom: 5 }}
                    />
                  </View>
                </View>
              ))}
            {popularPost.data &&
              popularPost.data.map((post, index) => (
                <PostList
                  key={index}
                  title={post.title}
                  url={post.link ? post.link : post.url}
                  image={
                    post.thumbnailUrl ? post.thumbnailUrl : post.featuredImage
                  }
                />
              ))}
          </View>
        </View>
        <View className="o-popular-post__footer"></View>
      </View>
    );
  }
}

export default PopularPost;
