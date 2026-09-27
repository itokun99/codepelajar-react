import { useState, useEffect } from 'react';
import { View, Text, Skeleton } from 'components/atoms';
import { PostList } from 'components/molecules';
import { getPopularPostData } from 'services';
import { getImage } from 'utils';

const PopularPost = () => {
  const [popularPost, setPopularPost] = useState({ title: '', data: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const data = await getPopularPostData();
      setTimeout(() => {
        setPopularPost(data);
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleImage = (thumbnail, featuredImage) => {
    if (thumbnail) return thumbnail;
    if (featuredImage) return featuredImage;
    return getImage();
  };

  const handleUrl = (link, url) => link || url;

  return (
    <View className="o-popular-post__wrapper">
      <View className="o-popular-post__header">
        <Text className="o-popular-post__title">{popularPost.title}</Text>
      </View>
      <View className="o-popular-post__body">
        <View className="o-popular-post__order">
          {isLoading &&
            [1, 2, 3, 4, 5].map(val => (
              <View key={val} style={{ marginBottom: 20 }} className="d-flex w-full">
                <Skeleton style={{ width: 50, height: 50, marginRight: 14 }} />
                <View style={{ flex: 1 }}>
                  <Skeleton style={{ width: '100%', height: 15, marginBottom: 5 }} />
                  <Skeleton style={{ width: '80%', height: 15, marginBottom: 5 }} />
                </View>
              </View>
            ))}
          {popularPost.data &&
            popularPost.data.map((post, index) => (
              <PostList
                key={index}
                title={post.title}
                url={handleUrl(post.link, post.url)}
                image={handleImage(post.thumbnailUrl, post.featuredImage)}
              />
            ))}
        </View>
      </View>
      <View className="o-popular-post__footer"></View>
    </View>
  );
};

export default PopularPost;
