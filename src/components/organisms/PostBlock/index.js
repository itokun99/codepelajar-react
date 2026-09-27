import { useState, useEffect } from 'react';
import _ from 'lodash';
import { View, Skeleton, Button } from 'components/atoms';
import { PostCard } from 'components/molecules';
import { callPosts } from 'services';
import { createAuthor, getImage } from 'utils';

const PostBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handleWheel = () => setShowImage(true);
    window.addEventListener('mousewheel', handleWheel);
    window.addEventListener('touchmove', handleWheel);
    return () => {
      window.removeEventListener('mousewheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
    };
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = async (token = null) => {
    try {
      setIsLoading(true);
      const payload = token ? { params: { pageToken: token } } : {};
      const response = token ? await callPosts(payload) : await callPosts();
      setTimeout(() => {
        const items = _.get(response, 'items', []);
        const newToken = _.get(response, 'nextPageToken', null);
        setPosts(prev => token ? [...prev, ...items] : items);
        setNextToken(newToken);
        setIsLoading(false);
        if (!token) setIsLoaded(true);
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const renderSkeleton = () =>
    [1, 2, 3].map(value => (
      <View key={value} className="o-post-block__column">
        <Skeleton style={{ paddingBottom: '64%', width: '100%', marginBottom: 24 }} />
        <View style={{ padding: 20 }}>
          <Skeleton style={{ paddingBottom: 30, width: '100%', marginBottom: 15 }} />
          <Skeleton style={{ paddingBottom: 20, width: '80%', marginBottom: 10 }} />
          <Skeleton style={{ paddingBottom: 20, width: '50%', marginBottom: 0 }} />
        </View>
        <View style={{ display: 'flex', alignItems: 'center', paddingLeft: 14, paddingRight: 14 }}>
          <Skeleton style={{ borderRadius: 30, height: 30, width: 30, marginRight: 14 }} />
          <Skeleton style={{ height: 15, width: 100 }} />
        </View>
      </View>
    ));

  return (
    <View className="o-post-block__wrapper">
      <View className="o-post-block__row">
        {posts && posts.map((post, index) => (
          <View key={index} className="o-post-block__column">
            <PostCard
              url={post.url}
              title={post.title}
              image={showImage ? getImage(_.get(post, 'images[0].url', '')) : ''}
              author={createAuthor(post.author)}
              label={post.labels}
            />
          </View>
        ))}
        {isLoading && renderSkeleton()}
      </View>
      {!isLoaded && !isLoading && (
        <View className="text-align-center">
          <Button onPress={() => init(nextToken)} variant="primary">
            Load More
          </Button>
        </View>
      )}
    </View>
  );
};

export default PostBlock;
