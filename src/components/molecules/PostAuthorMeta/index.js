import { React, PropTypes } from 'libraries';
import { View, Text, Image } from 'components/atoms';

const PostAuthorMeta = ({ data, imageSize, showImage }) => (
  <View className="m-author-meta__wrapper">
    {showImage && (
      <Image
        className="m-author-meta__image"
        source={data.image}
        title={data.name}
        alt={data.name}
        style={{
          height: imageSize,
          width: imageSize
        }}
      />
    )}
    <Text tag="span" className="m-author-meta__title">
      {data.name}
    </Text>
  </View>
);

PostAuthorMeta.propTypes = {
  data: PropTypes.object,
  imageSize: PropTypes.number,
  showImage: PropTypes.bool
};

PostAuthorMeta.defaultProps = {
  showImage: true
};

export default PostAuthorMeta;
