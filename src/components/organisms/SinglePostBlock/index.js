import { React, moment } from 'libraries';
import { View, Text, Anchor, Skeleton } from 'components/atoms';
import { PostAuthorMeta } from 'components/molecules';
import { parseJSON, createAuthor } from 'utils';
import { callPostById } from 'services';

class SinglePostBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      times: 0
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    try {
      await this.setState({ isLoading: true });
      const postJSON = parseJSON(window.__POSTS__);
      const { id } = postJSON;
      const data = await callPostById(id);
      setTimeout(() => {
        this.setState({ data, isLoading: false });
      }, 2000);
    } catch (err) {
      const { times } = this.state;
      if (times < 2) {
        return this.setState(
          {
            times: times + 1
          },
          () => this.init()
        );
      }
      return this.setState(
        {
          isLoading: false
        },
        () => {
          if (window.confirm('Koneksi bermasalah! Silahkan refresh ulang.'))
            return window.location.reload();
        }
      );
    }
  };

  renderSkeleton = () => (
    <React.Fragment>
      <Skeleton style={{ width: '80%', height: 40, marginBottom: 24 }} />
      <View className="d-flex">
        <Skeleton
          style={{
            width: '20%',
            height: 20,
            marginBottom: 24,
            marginRight: 24
          }}
        />
        <Skeleton style={{ width: '30%', height: 20, marginBottom: 40 }} />
      </View>
      <Skeleton style={{ width: '100%', height: 1, marginBottom: 40 }} />
      <View
        className="d-flex"
        style={{ alignItems: 'center', marginBottom: 50 }}
      >
        <Skeleton
          style={{
            width: 50,
            height: 50,
            marginRight: 24,
            borderRadius: 50
          }}
        />
        <Skeleton style={{ width: 200, height: 20 }} />
      </View>
      <Skeleton
        style={{
          width: '100%',
          paddingBottom: '40%',
          marginBottom: 40
        }}
      />
      {[1, 2].map(val => (
        <React.Fragment key={val}>
          <View style={{ marginBottom: 54 }}>
            <Skeleton style={{ width: '80%', height: 20, marginBottom: 14 }} />
            <Skeleton style={{ width: '100%', height: 20, marginBottom: 14 }} />
            <Skeleton style={{ width: '90%', height: 20, marginBottom: 14 }} />
            <Skeleton style={{ width: '60%', height: 20, marginBottom: 14 }} />
          </View>
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  render() {
    const { isLoading, data } = this.state;
    return (
      <View className="o-single-post-block__wrapper">
        <View className="o-single-post-block__header">
          {isLoading && this.renderSkeleton()}
          {data && data.title ? (
            <Text tag="h1" className="o-single-post-block__title">
              {data.title}
            </Text>
          ) : null}
          <View className="o-single-post-block__meta">
            {data && data.published ? (
              <Text>
                Diposting pada: {moment(data.published).format('LLLL')}
              </Text>
            ) : null}
            {data && data.author ? (
              <PostAuthorMeta imageSize={50} data={createAuthor(data.author)} />
            ) : null}
          </View>
        </View>
        <View className="o-single-post-block__body">
          {data && data.content ? (
            <View dangerouslySetInnerHTML={{ __html: data.content }} />
          ) : null}
        </View>
        <View className="o-single-post-block__footer"></View>
      </View>
    );
  }
}
export default SinglePostBlock;
