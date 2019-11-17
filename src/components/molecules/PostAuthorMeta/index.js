import { React, PropTypes } from 'libraries';
import { View, Text, Image } from 'components/atoms';

const PostAuthorMeta = ({ data }) => (
  <View className="m-author-meta__wrapper">
    <Image
      className="m-author-meta__image"
      source={data.image}
      title={data.name}
      alt={data.name}
    />
    <Text tag="span" className="m-author-meta__title">
      {data.name}
    </Text>
  </View>
);

PostAuthorMeta.propTypes = {
  data: PropTypes.object
};

export default PostAuthorMeta;
