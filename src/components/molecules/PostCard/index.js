import { React, PropTypes } from 'libraries';
import { Text, View, Image, Anchor } from 'components/atoms';
import PostAuthorMeta from '../PostAuthorMeta';
import PostLabel from '../PostLabel';

const PostCard = ({ title, author, image, url, label }) => (
  <View className="m-post-card__wrapper">
    <View className="m-post-card__header">
      <Anchor href={url} title={title}>
        <Image
          className="m-post-card__image"
          source={image}
          backgroundImage
          resizeMode="cover"
        />
      </Anchor>
      <View className="m-post-card__label-holder">
        <PostLabel data={label} />
      </View>
    </View>
    <View className="m-post-card__body">
      <Anchor href={url} title={title}>
        <Text className="m-post-card__title" tag="h2">
          {title}
        </Text>
      </Anchor>
    </View>
    <View className="m-post-card__footer">
      <View className="m-post-card__meta">
        <PostAuthorMeta showImage={image !== ''} data={author} />
      </View>
    </View>
  </View>
);

PostCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.object,
  label: PropTypes.array
};

export default PostCard;
