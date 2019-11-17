import { React, PropTypes } from 'libraries';
import { View, Text, Image, Anchor } from 'components/atoms';

const PostList = ({ title, image, url, showImage }) => (
  <View className="m-post-list__wrapper">
    {showImage && (
      <Anchor href={url} title={title}>
        <Image
          className="m-post-list__image"
          backgroundImage
          resizeMode="cover"
          source={image}
          title={title}
          alt={title}
        />
      </Anchor>
    )}
    <View className="m-post-list__content">
      <Anchor href={url} title={title}>
        <Text tag="h2" className="m-post-list__title">
          {title}
        </Text>
      </Anchor>
    </View>
  </View>
);

PostList.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  showImage: PropTypes.bool
};
PostList.defaultProps = {
  showImage: true
};

export default PostList;
